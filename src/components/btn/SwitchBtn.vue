<template>
  <Btn :disabled="pending" @click="onSwitch"><i class="mdi mdi-spin mdi-loading" v-if="pending" ></i><span class="ml-2">Switch Network</span></Btn>
  <!-- <button :disabled="pending" @click="onSwitch"
      class="btn bg-red-300 text-gray-800 hover:bg-red-400 text-sm hover:text-white
          rounded-[calc(50/1920*100vw)] max-sm:rounded-[calc(50/750*100vw)] 3xl:rounded-[50px]
          px-4 py-2
  "><i class="mdi mdi-spin mdi-loading" v-if="pending"></i><span class="ml-2">Switch Network</span></button> -->
</template>
<script setup>
import { ethers, Contract, Wallet } from "ethers";
import {chains} from '@/packages/chainList/config/chainId.js'
import Btn from './index.vue'
import {ref} from 'vue'
const props = defineProps({
  chainId: {
    type: String,
    default: '1'
  }
});
const pending = ref(false)
const onSwitch = async ()=>{
  
  pending.value = true
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const chain = chains.find(item => item.chainId == props.chainId)
  try {
  await provider.provider // Or window.ethereum if you don't support EIP-6963.
    .request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: chain.hexChainId }],
    });
  } catch (switchError) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (switchError.code === 4902) {
      try {
        await provider.provider // Or window.ethereum if you don't support EIP-6963.
          .request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: chain.hexChainId,
                chainName: chain.name,
                rpcUrls: chain.rpcUrl /* ... */,
              },
            ],
          });
      } catch (addError) {
        // Handle "add" error.
      }
    }
    // Handle other "switch" errors.
  } 
  finally {
    pending.value = false
  }
}
</script>
<style scoped>
.btn:disabled{
  color: #999999;
  cursor: not-allowed;
  background-color: #666666;
}
</style>