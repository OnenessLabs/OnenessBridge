<script setup>
import {defineEmits, defineExpose} from "vue";
import {useConnect} from "@/components/ConnectPopup/useConnect.js";

import walletBtc from "./component/walletBtc.vue"
import walletEvm from "./component/walletEvm.vue"
import iconClose from "@/packages/ons-ui/ons-popup/icon-close.vue";


const emit = defineEmits(["loginSuccess"]);

const {
  ElDialog,
  web3Store,
  methods,
} = useConnect();

defineExpose({
  handleOpen: methods.handleOpen,
  handleClose: methods.handleClose
});
</script>

<template>
  <el-dialog
      class="connect-popup"
      :model-value="web3Store.isShowConnectWallet"
      :show-close="false"
      align-center
      @close="methods.handleClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
  >
    <template #header>
      <div class="w-[100%] relative flex items-center justify-between">
        <div class="flex items-center">
          <span class="text-[20px] 3xl:text-[28px] max-sm:text-[3.73vw]">Connect your wallet</span>
          <span v-if="web3Store.connectLoadingIcon" class="loader"></span>
        </div>
        <div class="cursor-pointer w-[26px] h-[26px] 3xl:w-[36px] 3xl:h-[36px] max-sm:w-[18px] max-sm:h-[18px]" @click="methods.handleClose()">
          <icon-close></icon-close>
        </div>
      </div>
    </template>

    <!-- <wallet-btc @login-success="emit('loginSuccess')" /> -->

    <wallet-evm @btc-first-connect="() => { web3Store.connectPop.btcFirstError = 'Please connect to Bitcoin Wallet first' }" />

  </el-dialog>
</template>

<style lang="less">
@import "index.less";
</style>
