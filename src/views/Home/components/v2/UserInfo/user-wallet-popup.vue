<script setup>
import { reactive, defineExpose, inject } from "vue";
import { useAccountInfo } from "@/views/Home/components/v2/UserInfo/useAccountInfo.js";

const { web3Store, inviteCodePopupStore } = useAccountInfo()
const $tokenManage = inject('$tokenManage');
const data = reactive({
  visible: false,
  list: [],
})

const methods = {
  handleInvite() {
    inviteCodePopupStore.visible = true;
    methods.handleClose();
  },
  handleClose() {
    data.visible = false;
  },
  handleOpen() {
    data.visible = true;
  },
  handleDisconnectWallet() {
    $tokenManage.removeToken();
    $tokenManage.removeTokenTs();
    web3Store.disconnect();
    methods.handleClose();
    window.location.reload();
  },
};

defineExpose({
  handleOpen: methods.handleOpen,
  handleClose: methods.handleClose
});
</script>

<template>
  <ons-popup :visible="data.visible" @on-close="methods.handleClose" ref="leaderboardRef" title="Connected you wallet">
    <div class="w-[100%] 3xl:text-[24px] md:text-[1.25vw] text-[3.2vw]">
      <div class="flex items-center justify-between bg-[#222222] rounded-[2.13vw] md:rounded-[0.83vw] 3xl:rounded-[16px]
 py-[3.73vw] px-[3.2vw] md:py-[1.45vw] md:px-[1.25vw] 3xl:py-[28px] 3xl:px-[24px]
">
        <div class="flex items-center justify-between gap-[2.13vw] md:gap-[0.83vw] 3xl:gap-[16px]">
          <img class="3xl:w-[48px] md:w-[2.5vw] w-[6.4vw]" :src="web3Store.currentAvatar" alt="">
          <span class="text-[#FFFFFF]">{{ web3Store.currentAccountFake }}</span>
        </div>
        <span class="cursor-pointer text-[#D6B635]" @click="methods.handleDisconnectWallet">Disconnect</span>
      </div>

      <div class="flex items-center justify-center 3xl:mt-[24px] md:mt-[1.25vw] mt-[3.2vw] text-[#ffffff]">
        <div class="cursor-pointer" @click="methods.handleInvite">
          Fill in the inviter
        </div>
        <div class="3xl:w-[20px] 3xl:h-[20px] md:w-[1.25vw] md:h-[1.25vw] w-[2.66vw] h-[2.66vw]">
          <svg width="100%" height="100%" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.6">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.91083 2.32757C9.58539 2.65301 9.58539 3.18065 9.91083 3.50609L16.4049 10.0002L9.91083 16.4942C9.58539 16.8197 9.58539 17.3473 9.91083 17.6728C10.2363 17.9982 10.7639 17.9982 11.0893 17.6728L18.1727 10.5894C18.4981 10.264 18.4981 9.73634 18.1727 9.41091L11.0893 2.32757C10.7639 2.00214 10.2363 2.00214 9.91083 2.32757Z" fill="white"/>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </ons-popup>
</template>

<style lang="less">
</style>
