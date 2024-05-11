<template>
  <div class="flex justify-between py-[5px] px-[20px] bg-amber-50">
    <div class="flex items-center justify-start">
      <span>Logo</span>
      <div class="flex ml-[100px] gap-6">
        <RouterLink to="/leaderboard">Leaderboard</RouterLink>
        <RouterLink to="/">Points</RouterLink>
      </div>
    </div>

    <div>
      <div v-if="!web3Store.currentAccount">
        <button class="connect__btn" @click="methods.handleOpenPopup">Connect Wallet</button>
      </div>


      <div v-else class="relative ml-[5.5vh] max-sm:ml-[5px]" @mouseleave="methods.onMouseLeaveOption()"
           @mouseenter="methods.onMouseEnterOption()">
        <button
            class="rounded-[10px] max-lg:px-[10px] max-lg:h-[35px] flex justify-center items-center h-[4.814vh] max-h-[52px] px-[20px] bg-[#0CB7CE] uppercase"
            @click="() => {
              methods.handleWalletClick();
            }"
        >
            <span class="max-sm:mx-[5px] max-lg:text-[12px] text-[1.041vw] text-[#FFFFFF] 2xl:text-[20px] mx-[10px]">{{
                web3Store.currentAccountFake
              }}</span>

        </button>
        <div class="option" v-if="data.isShowOption">
          <button
              class="btn-copy max-lg:text-[12px] text-[1.041vw] text-[#FFFFFF] 2xl:text-[20px]  text-right py-[12px] mt-[12px] w-[100%] pr-[20px] hover:text-[#7EDFED]"
              @click="methods.handleCopyAddress()">
            Copy Address
          </button>
          <button
              class="btn-copy max-lg:text-[12px] text-[1.041vw] text-[#FFFFFF] 2xl:text-[20px]  text-right py-[12px] mt-[12px] w-[100%] pr-[20px] hover:text-[#7EDFED]"
              @click="methods.inputInviteCode()">
            填写邀请码
          </button>
          <button
              class="btn-copy max-lg:text-[12px] text-[1.041vw] text-[#FFFFFF] 2xl:text-[20px]  text-right py-[12px] mb-[12px] w-[100%] pr-[20px] hover:text-[#7EDFED]"
              @click="methods.handleDisconnectWallet()">
            Disconnect
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { reactive, inject } from "vue";
import { copyTextToClipboard } from "@/packages/utils/index.js";
import pinia, { useWeb3Store, useInviteCodePopup, useHomeStore } from "@/stores/index.js";

const web3Store = useWeb3Store(pinia);
const inviteCodePopupStore = useInviteCodePopup(pinia);
const $tokenManage = inject('$tokenManage');
const data = reactive({
  isShowOption: false,
  isOnMouseLeave: false,
})

const methods = {
  handleOpenPopup() {
    window?.gtag('event', 'connect_wallet', {
      type: "connect_button"
    });
    web3Store.isShowConnectWallet = true
  },
  handleDisconnectWallet() {
    $tokenManage.removeToken();
    $tokenManage.removeTokenTs();
    web3Store.disconnect();
    this.hideOption();
    window.location.reload();
  },
  inputInviteCode() {
    inviteCodePopupStore.openInviteCodePopup();
  },
  handleCopyAddress() {
    if (!web3Store.currentAccount) return;
    copyTextToClipboard(web3Store.currentAccount);
    this.hideOption();
  },
  handleWalletClick() {
    data.isShowOption = !data.isShowOption;
  },
  hideOption() {
    data.isShowOption = false;
  },
  onMouseLeaveOption() {
    data.isOnMouseLeave = true;
    setTimeout(() => {
      if (data.isShowOption && data.isOnMouseLeave) {
        this.hideOption();
      }
    }, 1000)
  },
  onMouseEnterOption() {
    data.isOnMouseLeave = false;
  }

}
</script>

<style lang="less" scoped>
.connect{
  &__btn{
    border-radius: 40px;
    padding: 10px 20px;
    color: #ffffff;
    background: #9a5f24;
  }
}

.router-link-exact-active {
  color: #42b983;
  font-weight: bold;
}

.option {
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  position: absolute;
  width: 100%;
  z-index: 3;
  margin-top: 10px;
}
</style>