<template>
  <div class="connect-button" @click="btnClick">
    <slot></slot>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { okxAppUniversalLink } from "@/packages/utils/index.js";
import pinia, { useWeb3Store } from "@/stores/index.js";

const emit = defineEmits(["onConnectWallet"]);
const web3Store = useWeb3Store(pinia);
const props = defineProps({
  type: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const btnClick = () => {
  // if (props.disabled) return;
  useProvider();
  connect();
  window?.gtag('event', 'connect_wallet', {
    type: props.type
  });
}

const useProvider = () => {
  web3Store.clearProviderKey();
  web3Store.setActiveProvider(props.type);
}

const connect = async () => {
  web3Store.connectLoadingIcon = true;

  let accounts;
  try {

    if (props.type === 'uniSat') {
      if (!web3Store.installedList.uniSat) {
        web3Store.connectLoadingIcon = false;
        return window.open('https://unisat.io');
      }
      accounts = await web3Store.activeProvider.requestAccounts();
    } else if (props.type === 'okx') {
      if (!web3Store.installedList.okx) {
        web3Store.connectLoadingIcon = false;
        if (okxAppUniversalLink()) {
          window.location.href = okxAppUniversalLink();
        } else {
          window.open('https://www.okx.com/download');
        }
        return;
      }
      accounts = await web3Store.activeProvider.bitcoin.requestAccounts();
    }

    emit("onConnectWallet", { accounts });
  } catch (e) {
    handleConnectionError(e);
  }
}

function handleConnectionError(e) {
  web3Store.connectLoadingIcon = false;
  web3Store.clearProviderKey();
}

</script>
