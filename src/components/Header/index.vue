<template>
<nav class="bg-gray-800">
  <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div class="relative flex h-16 items-center justify-between">
      <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
        <div class="flex flex-shrink-0 items-center">
          <img class="w-[8.33vw] max-lg:w-[98px] max-w-[160px] 2lx:mt-[40px;] max-sm:my-[20px]" :src="logo" alt="">
        </div>
        <div class="flex space-x-4 ml-8">
          <!-- <a href="#" class="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" aria-current="page">BTC Bridge</a> -->
          <a href="#" class="text-[#D6B635] hover:bg-gray-700 hover:text-[#D6B635] rounded-md px-3 py-2 text-sm font-medium">ONEVM Bridge</a>
        </div>
        
      </div>
      <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        <Btn v-connect-wallet class="animated-pop-in min-w-[calc(207/1920*100vw)] max-sm:min-w-[calc(199/750*100vw)] 3xl:min-w-[207px]">
          <span v-if="!web3Store.currentAccountFake">Connect Wallet</span>
          <span v-else>{{ web3Store.currentAccountFake }}</span>
        </Btn>
      </div>
    </div>
  </div>
</nav>
</template>
<script setup>
// import {ElButton} from "element-plus";
// web3Store.currentAccount
import pinia, {useWeb3Store} from "@/stores/index.js";
import Btn from "@/components/btn/index.vue"
const logo = new URL("@/assets/img/logo.png", import.meta.url).href;
const web3Store = useWeb3Store(pinia);
</script>