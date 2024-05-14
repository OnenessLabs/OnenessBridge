<template>
  <div class="mx-auto max-w-5xl mt-8">
    <div>
      <WalletError/>
    </div>
    <div class="bg-[#151515] text-[#ffffff] rounded-[calc(32/1920*100vw)] max-sm:rounded-[calc(32/750*100vw)] 3xl:rounded-[32px] py-[calc(32/1920*100vw)] max-sm:py-[calc(32/750*100vw)] 3xl:py-[32px] px-[calc(40/1920*100vw)] max-sm:px-[calc(24/750*100vw)] 3xl:px-[40px] pb-[calc(14/1920*100vw)] max-sm:pb-[calc(14/750*100vw)] 3xl:pb-[14px]">
      <div class="mb-[calc(24/1920*100vw)] max-sm:mb-[calc(24/750*100vw)] 3xl:mb-[24px]">
        <ElTabs v-model="activeName" @tab-click="handleClick">
          <ElTabPane label="Deposit" name="deposit"></ElTabPane>
          <ElTabPane label="Withdraw" name="withdraw"></ElTabPane>
        </ElTabs>
      </div>
      <div>
        
        <div class="task-item relative bg-[#222222] mt-4
rounded-[calc(24/1920*100vw)] max-sm:rounded-[calc(20/750*100vw)] 3xl:rounded-[24]
px-[calc(32/1920*100vw)] max-sm:px-[calc(24/750*100vw)] 3xl:px-[32px]
pt-[calc(48/750*100vw)] sm:pt-[calc(48/1920*100vw)] 3xl:pt-[48px]
pb-[calc(20/750*100vw)] sm:pb-[calc(24/1920*100vw)] 3xl:pb-[24px]">
          <div class="text-2xl">Network</div>
          <div class="mt-4"><fromTo :type="activeName"></fromTo></div>
          
          <div class="text-2xl mt-6">Amount</div>
          <div class="flex justify-between max-w-xl mt-4">
            <div>
              <div>
                <ElInput placeholder="0" v-model="amount"/>
              </div>
              <div>
                <span class="text-gray-500">Balance: {{ usdBalance }}</span>
                <span class="ml-2 text-[#D6B635] cursor-pointer" @click="maxBalance">Max</span>
              </div>
              <div v-if="checkAmount" class="text-red-900">Insufficient balance</div>
            </div>
            <div>
              <div class="text-2xl h-[50px] flex items-center">USDC</div>
              <div class="text-[#D6B635] cursor-pointer" @click="addTokenToWallet">Add One to wallet</div>
            </div>
          </div>
          <div class="mt-8">
            <Btn class="px-6" :disabled="!web3Store.currentAccountFake||amount==0||checkAmount" v-if="!isApprove" @click="onDialogShow()">{{ activeName==='deposit'?'Deposit':'withdraw' }}</Btn>
            <Btn @click="onApprove" v-else>Approve</Btn>
            <!-- <div @click="testPost()">testpost</div> -->
          </div>
          <div class="mt-8 bg-gray-700 p-4 rounded-xl">
            <div class="flex justify-between">
              <span class="text-gray-200">Destination wallet</span>
              <span class="text-gray-400">{{ web3Store.currentAccountFake||'--' }}</span>
            </div>
            
            <div class="flex justify-between">
              <span class="text-gray-200">Bridge time</span>
              <span class="text-gray-400">A few minutes</span>
            </div>
            <!-- <div class="flex justify-between">
              <span class="text-gray-200">Bridge fee</span>
              <span class="text-gray-400">0.000761535 ETH</span>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="deposit-dialog">
    <ElDialog
      v-model="dialogShow"
      :show-close="true"
      align-center
      @close="handleClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :title="activeName==='deposit'?'Deposit':'withdraw'"
    >
    <div class="">
      <div v-if="!btnPending">
        <div class="rounded-lg p-4 bg-neutral-900 text-white">
        <div class="flex justify-between">
          <div class="text-lg flex items-center">
            <span class="rounded-full w-6 h-6 overflow-hidden"><img :src="activeName==='deposit'?ethlogo:onelogo"/></span>
            <span class="ml-4">{{ inNetwork }}</span>
          </div>
          <div class="flex  items-center">
            <span class="text-lg">{{ amount }}</span>
            <span class="w-6 h-6 ml-4"><img src="@/assets/img/usdc.png"/></span>
          </div>
        </div>
        <div class="text-right text-gray-600 mt-3">{{ web3Store.currentAccount }}</div>
      </div>
      <div class="rounded-lg p-4 bg-neutral-900 text-white mt-4">
        <div class="flex justify-between">
          <div class="text-lg flex items-center">
            <span class="rounded-full w-6 h-6 overflow-hidden"><img :src="activeName==='deposit'?onelogo:ethlogo"/></span>
            <span class="ml-4">{{ outNetwork }}</span>
          </div>
          <div class="flex  items-center">
            <span class="text-lg">{{ amount }}</span>
            <span class="w-6 h-6 ml-4"><img src="@/assets/img/usdc.png"/></span>
          </div>
        </div>
        <div class="text-right text-gray-600 mt-3">{{ web3Store.currentAccount }}</div>
      </div>
      <div class="rounded-lg p-4 bg-neutral-900 text-white mt-4">
        <!-- <div class="flex justify-between">
          <div class="text-lg flex items-center">
            <span class="">Total Fee</span>
          </div>
          <div class="flex  items-center">
            <span class="text-lg">--</span>
            <span class="w-6 h-6 ml-4"><img src="@/assets/img/usdc.png"/></span>
          </div>
        </div> -->
        <div class="text-gray-600 mt-3">
          <!-- <div class="flex justify-between">
            <div>Service Fee</div>
            <div>0.5</div>
          </div> -->
          <div class="flex justify-between">
            <div>Gas & LP Fees</div>
            <div>----</div>
          </div>
        </div>
      </div>
      
      </div>
      <div v-else>
        <!-- <i class="mdi mdi-spin mdi-loading"></i> -->
        <div class="text-xl text-white text-center">Waiting for network confirmation</div>
        <div class="w-24 h-24 mx-auto mt-6"><loadingSvg/></div>
        
      </div>
      <Btn class="px-6 w-full mt-6 !h-10" size="large" :disabled="btnPending" @click="sendAmount()">
        <i class="mdi mdi-spin mdi-loading" v-if="btnPending"></i><span class="ml-3">Confirm</span>
      </Btn>
    </div>
  </ElDialog>
  </div>
  
</template>
<script setup>
import { ref, onMounted, computed,watch } from "vue";
import {ElTabs, ElTabPane, ElInput, ElDialog} from 'element-plus'
import Btn from "@/components/btn/index.vue"
import pinia, {useWeb3Store} from "@/stores/index.js";
import { ethers, Contract, Wallet } from "ethers";
import axios from "axios";
import { ElMessage } from 'element-plus'
import WalletError from '@/components/WalletError/index.vue'
import fromTo from "./fromTo.vue"
import ethlogo from '@/assets/img/eth.png'
import onelogo from '@/assets/img/one.png'
import loadingSvg from './loading.vue'
// import BigNumber from "bignumber.js";
import {
  MesonClient,
  EthersWalletSwapSigner,
  SwapWithSigner,
  SignedSwapRequest,
  SignedSwapRelease,
  RemoteSwapSigner,
  SwapSigner
} from 'mesonfi-sdk'
import abi from '@/abi/meson.json'
// import Erc20abi from '@/abi/ERC20.json'
import {getRemoteSigner, addTokenToWallet} from './action.js'
import {getSwapContract,getErc20Contract} from '@/packages/utils/evmProvider.js'
import {contractTokens,tokenList} from '@/packages/chainList/config/chainId.js'
import { useRouter, useRoute } from 'vue-router'
// import QS from 'qs'
const web3Store = useWeb3Store(pinia);
const router = useRouter()
const route = useRoute()
const activeName = ref('deposit')
let amount = ref(0)
let usdBalance = computed(()=>web3Store.balances.usdc)
let btnPending = ref(false)
let dialogShow = ref(false)
const outChain = computed(() => activeName.value==='deposit'?'0x003d':'0x36a8')
const inNetwork = computed(() => activeName.value==='deposit'?'Ethereum':'Oneness')
const outNetwork = computed(() => activeName.value==='deposit'?'Oneness':'Ethereum')
// const outChain = components(() => activeName.value==='deposit'?'0x003d':'0x36a8')
let checkAmount = computed(() => Number(amount.value) > Number(web3Store.balances.usdc))
const swapData = computed(() => {
  return {
    _encoded: '',
    amount: ethers.utils.parseUnits(amount.value.trim().toString(),6),
    fee: ethers.utils.parseUnits('1',6),
    version: 1,
    // expireTs: Math.floor(Date.now() / 1000) + 5400,
    // inChain: '0x36a8',
    inToken: activeName.value==='deposit'?1:5,
    // outChain: '0x003d',
    outToken: activeName.value==='deposit'?5:1,
    salt: '0x80000000000005bfec66'
  }
  
})
const handleClick = (tab, event) => {
  console.log(tab, event, activeName)
  setTimeout(()=>{
    router.replace({ name: 'home', params: { type: activeName.value} })
  })
  
}
const handleClose = ()=>{
  dialogShow.value = false
}
const onDialogShow = ()=>{
  console.log(swapData.value)
  dialogShow.value = true
}
// console.log(import.meta.env.VITE_APP_SWAP_ADDRESS)
const swapAddr = computed(() =>{
  const token = contractTokens.find((item)=>item.name==='swap'&&item.chainId==web3Store.evmCurrentNetwork.chainId)
  return token.address ||''
})
const usdc = computed(() =>{
  const token = tokenList.find((item)=>item.name==='usdc'&&item.chainId==web3Store.evmCurrentNetwork.chainId)
  return token.address ||''
})
// const tokenAddr = import.meta.env.VITE_APP_USDC_ADDRESS
let isApprove = ref(false)

const maxBalance = ()=>{
  amount.value = usdBalance.value
}
const getAllowance = async ()=>{
  try {
    const contract = getErc20Contract(web3Store.currentAccount,usdc.value)
    const allowance = await contract.allowance(web3Store.currentAccount,swapAddr.value);
    if (Number(allowance.toString())>0) {
      isApprove.value = false
    } else {
      isApprove.value = true
    }
  } catch (error) {
    console.log(error, typeof error);
  }
  
}
watch(()=>web3Store.currentAccount,()=>{
  console.log('account');
  getAllowance()
})
watch(()=>web3Store.evmCurrentNetwork.chainId,()=>{
  console.log('chainId');
  getAllowance()
})

const onApprove = async()=>{
  btnPending.value = true
  try {
    const contract = getErc20Contract(web3Store.currentAccount,usdc.value)
    await contract.approve(swapAddr.value, ethers.constants.MaxUint256)
    await getAllowance()
      ElMessage({
      message: 'Approved.',
        type: 'success',
      })
  } catch (error) {
    console.log(error);
    ElMessage.error(error||error.toString())
  } finally {
    btnPending.value = false
  }
  
}
const testPost = async ()=>{
  
  try {
    const postData = {
      "encodedSwap": 'signedReleaseData.encoded',
      "sign": 'signedReleaseData.signature',
      "recipient": 'signedReleaseData.recipient',
      "initiator": 'signedReleaseData.initiator',
      "targetChain":"eth"
    }
    await axios.post('https://meson-ethbridge.vercel.app/api', postData ,{
      headers: {
        'Content-Type': 'application/json'
      },
    })
  } catch (error) {
    console.log(error, '1111');
  }
}
const sendAmount = async()=>{
  btnPending.value = true
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = await provider.getSigner(web3Store.currentAccount)
    const remoteSigner = getRemoteSigner(web3Store.currentAccount)
    const swapSigner = new RemoteSwapSigner(remoteSigner)
    const contract = getSwapContract(web3Store.currentAccount,swapAddr.value)
    const mesonClientForInitiator = await MesonClient.Create(contract, swapSigner)
    const re_swap = mesonClientForInitiator.requestSwap(swapData.value, outChain.value)
    // const re_swap = new SwapWithSigner(swapData.value, swapSigner)
    const signedRequestData = await re_swap.signForRequest(true)
    const signedRequest = new SignedSwapRequest(signedRequestData)
    console.log(signedRequest);
    signedRequest.checkSignature()
    const postRes = await mesonClientForInitiator.postSwap(signedRequest,1)
    console.log(postRes, '----');
    await postRes.wait()
    const signedReleaseData = await re_swap.signForRelease(web3Store.currentAccount, true)
    console.log(signedReleaseData)
    
    const postData = {
      "encodedSwap": signedReleaseData.encoded,
      "sign": signedReleaseData.signature,
      "recipient": signedReleaseData.recipient,
      "initiator": signedReleaseData.initiator,
      "targetChain":activeName.value==='deposit'?'one':'eth'
    }
    const res = await axios.post('https://meson-ethbridge.vercel.app/api', postData ,{
      headers: {
        'Content-Type': 'application/json'
      },
    })
    if (res.data.err) {
      // throw new Error(res.data.err)
      ElMessage.error(res.data.err)
    } else if(res.data.status==0){
      ElMessage({
      message: 'Deposit success.',
        type: 'success',
      })
      dialogShow.value = false
    }
    // console.log(re_swap, 'signature_1', res);
  } catch (error) {
    const err = error.message || error
    console.log(err);
    ElMessage.error(error.message||error.toString())
  } finally {
    btnPending.value = false
  }

  
}

onMounted(()=>{
    console.log('start page');
    if (route.params.type=='withdraw') {
      activeName.value = route.params.type
    } else {
      activeName.value = 'deposit'
    }
    if (web3Store.currentAccount) {
      getAllowance()
      // getBalance()
    }
  })
</script>
<style lang="less">
:root{
  --el-color-primary:#D6B635;
  --el-text-color-primary:#fff;
}
.el-tabs__item{
  font-size: 18px;
}
.task-item{
  position: relative;
  z-index: 0;
  overflow: hidden;
  box-shadow: inset 1px 1px 2px #333333;
  transition: all 300ms ease-in-out;
  &:hover{
    background: rgba(255,255,255,0.1);
  }
}
.el-input__inner, .el-input__wrapper{
  background:none;
  box-shadow:none;
}
.el-input__inner{
  height: 50px;
  font-size: 32px;
}
.deposit-dialog {
  .el-dialog {
    width: 470px;
    border-radius: 16px;
    background-color: #222222;
  }
}
</style>