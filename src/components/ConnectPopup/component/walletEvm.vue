<script setup>
import { defineEmits, ref } from "vue";
import pinia, {useWeb3Store} from "@/stores/index.js";

import btnWrap from "./btnWrap.vue";
import iconUniSat from "./iconUnisat.vue";
import iconOkx from "./iconOkx.vue";

const emits = defineEmits(['btcFirstConnect'])
const web3Store = useWeb3Store(pinia);
let loading = ref(false)
const handleConnectWallet = async (type) => {
  // if (web3Store.currentAccount) {
  //   return emits('btcFirstConnect');
  // }
  
  loading.value = true
  try {
    if (type === 'metamask') {
      if (!web3Store.installedList.metaMask) {
        web3Store.connectLoadingIcon = false;
        return window.open('https://metamask.io/');
      }
      await window.ethereum.request({method: 'eth_requestAccounts'})
    } else if (type === 'okx') {
      if (!web3Store.installedList.okx&&!window.okxwallet) {
        window.open('https://www.okx.com/download');
        return;
      }
      // accounts = await web3Store.activeProvider.bitcoin.requestAccounts();
    }
    
    await web3Store.getAccounts()
    web3Store.isShowConnectWallet = false;
  } catch (error) {
    
  } finally{
    loading.value = false
  }
  
  console.log("Connect wallet", type);
};
</script>

<template>
  <!-- <div class="mx-auto my-5 w-[20px] lg:w-[24px] xl:w-[32px] h-[20px] lg:h-[24px] 3xl:h-[32px]">
    <svg width="100%" height="100%" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.3918 24.5807L10.4178 27.4677C9.63793 28.2467 8.58021 28.6844 7.47733 28.6844C6.37444 28.6844 5.31673 28.2467 4.53687 27.4677C3.75701 26.6887 3.31889 25.6321 3.31889 24.5304C3.31889 23.4286 3.75701 22.372 4.53687 21.593L11.3251 14.7951C12.0739 14.0447 13.0827 13.6105 14.143 13.5824C15.2032 13.5543 16.2337 13.9344 17.0212 14.644L17.2228 14.8119C17.5415 15.1235 17.971 15.2959 18.4169 15.2912C18.8627 15.2865 19.2885 15.105 19.6004 14.7867C19.9124 14.4684 20.085 14.0394 20.0802 13.594C20.0755 13.1485 19.8938 12.7233 19.5752 12.4116C19.4804 12.2892 19.3794 12.1715 19.2728 12.0592C17.8384 10.8126 15.9834 10.1572 14.0834 10.2257C12.1834 10.2943 10.3805 11.0817 9.03997 12.4284L2.1509 19.2263C0.837532 20.6544 0.127225 22.5341 0.168314 24.4729C0.209403 26.4117 0.998711 28.2597 2.3714 29.6309C3.74409 31.0021 5.59403 31.7906 7.53487 31.8317C9.47572 31.8727 11.3574 31.1632 12.787 29.8512L15.6938 27.0145C15.9808 26.7017 16.1386 26.292 16.1354 25.8677C16.1322 25.4434 15.9682 25.036 15.6765 24.7276C15.3848 24.4192 14.987 24.2326 14.5631 24.2053C14.1392 24.1781 13.7207 24.3122 13.3918 24.5807ZM29.6736 2.35747C28.2601 0.954267 26.3483 0.166687 24.3556 0.166687C22.3628 0.166687 20.451 0.954267 19.0375 2.35747L16.1307 5.19413C15.8437 5.50691 15.6859 5.91668 15.6891 6.34098C15.6923 6.76528 15.8563 7.17262 16.148 7.48105C16.4397 7.78947 16.8375 7.97608 17.2614 8.00333C17.6853 8.03059 18.1038 7.89646 18.4326 7.62794L21.3395 4.74093C22.1193 3.9619 23.1771 3.52424 24.2799 3.52424C25.3828 3.52424 26.4405 3.9619 27.2204 4.74093C28.0003 5.51997 28.4384 6.57657 28.4384 7.67829C28.4384 8.78002 28.0003 9.83662 27.2204 10.6157L20.4321 17.4135C19.6834 18.1639 18.6746 18.5981 17.6143 18.6262C16.5541 18.6543 15.5236 18.2743 14.7361 17.5646L14.5344 17.3968C14.2158 17.0851 13.7863 16.9127 13.3404 16.9175C12.8945 16.9222 12.4688 17.1036 12.1569 17.4219C11.8449 17.7402 11.6723 18.1693 11.677 18.6147C11.6818 19.0601 11.8634 19.4854 12.1821 19.797C12.3041 19.9217 12.4331 20.0394 12.5685 20.1495C14.0046 21.3923 15.8589 22.0453 17.7577 21.9767C19.6565 21.9082 21.4588 21.1233 22.8013 19.7802L29.6064 12.9823C31.02 11.5792 31.8205 9.67441 31.8331 7.68375C31.8457 5.69309 31.0694 3.7783 29.6736 2.35747Z" fill="white" fill-opacity="0.6"/>
    </svg>
  </div> -->

  <p class="text-left text-[#9c9c9c] text-base lg:text-[calc(24/1920*100vw)] 3xl:text-[24px]
     mb-[calc(24/750*100vw)] lg:mb-[calc(24/1920*100vw)] 3xl:mb-[24px]">
    EVM Wallet
  </p>

  <div class="connect-btn">
    <btn-wrap
      class="w-full"
      :class="{ 'button-disabled' : loading }"
      name="MetaMask wallet"
      @click="handleConnectWallet('metamask')"
    >
      <template #icon>
        <!-- <icon-uni-sat /> -->
        <div class="h-[36px] w-[36px] rounded-lg"><img src="./metamask.svg" /></div>
        
      </template>
    </btn-wrap>
    <!-- :class="{ 'button-disabled' : !web3Store.currentAccount }" -->
    <btn-wrap
      class="w-full"
      name="Okx wallet"
      @click="handleConnectWallet('okx')"
    >
      <template #icon>
        <icon-okx />
      </template>
    </btn-wrap>
  </div>

  <p v-if="web3Store.connectPop.evmVerifyError" class="fade-in text-[#a10808] mt-1 lg:mt-4 text-sm md:text-base lg:text-lg">
    {{ web3Store.connectPop.evmVerifyError }}
  </p>
</template>

<style lang="less" scoped>
.button-disabled{
  opacity: 0.5;
}
</style>
