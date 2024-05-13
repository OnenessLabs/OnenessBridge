<template>
    <ElDialog
      v-model="isShowSwitch"
      align-center
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="Switch Network"
      modal-class="switch-dialog"
    >
  <div class="bg-red-100 p-2 flex rounded-lg text-red-900 text-lg">
    <div><i class="mdi mdi-close-circle"></i></div>
    <div class="ml-2">
      <p>Current chain unsupported.</p>
      <p>Please allow network change in MetaMask.</p>
    </div>
  </div>
  <div class="mt-3"><SwitchBtn :chainId="chainId"/></div>
  
  </ElDialog>
  
  
</template>

<script setup>
import {ElDialog} from 'element-plus'
import {ref, computed} from 'vue'
import pinia, {useWeb3Store} from "@/stores/index.js";
import SwitchBtn from "../btn/SwitchBtn.vue"
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const web3Store = useWeb3Store(pinia);
let chainId = computed(() => route.params.type==='withdraw' ? '123666' : '11155111')
let isShowSwitch = computed(()=>{
  if (web3Store.currentAccount&&web3Store.evmCurrentNetwork&&web3Store.evmCurrentNetwork.chainId!=chainId.value) {
    return true
  }
  return false
})
// console.log(isShowSwitch.value,web3Store.evmCurrentNetwork.chainId,chainId.value,web3Store.evmCurrentNetwork.chainId!=chainId.value);

</script>
<style lang="less">
.switch-dialog{
  .el-dialog {
    width: 80%;
    max-width: 400px;
    border-radius: 16px;
  }
}
</style>
