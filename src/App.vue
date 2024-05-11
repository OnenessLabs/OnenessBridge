<template>
  <RouterView v-if="data.loaded" />

  <ConnectPopup v-if="data.loaded" ref="connectPopupRef" @loginSuccess="methods.loginSuccess"></ConnectPopup>

  <InviteCodePopup v-if="data.loaded"></InviteCodePopup>

  <div class="orientationMask" v-if="orientationMask">
    <div class="mx-10 text-center">
      Please rotate your device to portrait mode for optimal viewing experience.
    </div>
  </div>

  <!--  <SwitchChainDialog-->
  <!--      ref="switchChainDialogRef"-->
  <!--      :chain="data.chain"-->
  <!--      @onSwitchChain="methods.switchChain"-->
  <!--  />-->
</template>

<script setup>
import { useInitApp } from "@/useInitApp.js";
import {computed, onMounted, reactive, ref, watch, inject} from "vue";
import pinia, {useInviteCodePopup, useWeb3Store} from "@/stores/index.js";
import ConnectPopup from "@/components/ConnectPopup/index.vue";
import InviteCodePopup from "@/components/InviteCodePopup/index.vue"

// import ListenSwitchChain from "@/packages/ListenSwitchChain/index.js";
// import SwitchChainDialog from "@/components/SwitchChainDialog/index.vue";

const $tokenManage = inject("$tokenManage");
const web3Store = useWeb3Store(pinia);
const inviteCodePopupStore = useInviteCodePopup(pinia);
const connectPopupRef = ref(null);
const data = reactive({
  chain: {},
  loaded: false,
})
const orientationMask = ref(false);

onMounted(() => {
  window.onload = () => {
    const { providerKey, providerMap, installedList, activeProvider } = useInitApp();
    web3Store.init({ providerKey, providerMap, installedList, activeProvider });
    console.log(web3Store);
    web3Store.getAccounts().then(res => {
      web3Store.accounts = res;
    }).catch(err => {
      console.error("window onload err::", err);
    }).finally(() => {
      data.loaded = true;
    });
    if (window.ethereum) {
      
    }
  };

  // 横屏提示
  function landscapeAndPortrait() {
    if (window.orientation === 180 || window.orientation === 0) {
      orientationMask.value = false;
    }
    if (window.orientation === 90 || window.orientation === -90) {
      orientationMask.value = true;
    }
  }
  window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", landscapeAndPortrait, false);
})

// const switchChainDialogRef = ref(null);
// 监听切换链
// const listenSwitchChain = new ListenSwitchChain();
// listenSwitchChain._on("switch", (chain) => {
//   switchChainDialogRef?.value?.handleOpen();
//   data.chain = chain;
// });
// listenSwitchChain._on("chainChanged", (res) => {
//   switchChainDialogRef?.value?.handleClose();
//   // window.location.reload();
// });

const accountsChangedListener = (res) => {
  const account = res[0];
  console.error('account::', account);
  const token  = $tokenManage.getToken(account);
  console.error("token::", token);
  if(!token) {
    web3Store.disconnect();
    window.location.reload();
  } else {
    window.location.reload();
  }
}

// 监听钱包地址变化
watch(() => web3Store.currentAccount, (newVal) => {
  if (newVal) {
    let pr;
    if (web3Store.isOkxWallet()) {
      pr = web3Store.activeProvider.bitcoin;
    } else if (web3Store.isUniSatWallet()) {
      pr = web3Store.activeProvider;
    }
    pr?.off("accountsChanged", accountsChangedListener);
    pr?.removeListener("accountsChanged", accountsChangedListener);
    pr?.on("accountsChanged", accountsChangedListener)
  }
}, { immediate: true });

const isShowConnectWallet = computed(() => {
  return web3Store.isShowConnectWallet;
});

// 监听是否需要展示弹窗账户链接弹窗
watch(isShowConnectWallet, (val) => {
  if (val) {
    connectPopupRef.value.handleOpen();
  } else {
    connectPopupRef.value.handleClose();
  }
})

const methods = {
  loginSuccess() {
    inviteCodePopupStore.loginShowPopup();
    // listenSwitchChain.checkChain();
  },
  switchChain() {
    console.error("switchChain");
    // listenSwitchChain._switchChain();
  }
}

</script>

<style lang="less">
body{
  background-color: #000000;
}

.orientationMask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 200%;
  background-color: #000000;
  text-align: center;
  color: #fff;
  font-size: 1.5rem;
  line-height: 100vh;
  z-index: 1000;
  pointer-events: none;
  overflow: hidden;
}

// 动画
@keyframes pop-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
.animated-pop-in {
  animation: pop-in 0.5s ease;
}

@keyframes rotate-center {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.rotate-center {
  animation: rotate-center 0.6s ease-in-out both infinite;
}

// 淡入淡出动画
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.fade-in {
  animation: fade-in 0.5s ease;
}
</style>
