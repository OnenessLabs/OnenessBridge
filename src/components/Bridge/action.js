import { ethers, Contract, Wallet } from "ethers";
import {contractTokens,tokenList} from '@/packages/chainList/config/chainId.js'
import pinia, {useWeb3Store} from "@/stores/index.js";
const web3Store = useWeb3Store(pinia);
const getRemoteSigner = (providerAddr) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  return {
    getAddress: () => providerAddr,//provider.address
    signMessage: async msg => {
      const header = '\x19Ethereum Signed Message:\n32'
      const digest = ethers.utils.solidityKeccak256(['string', 'bytes32'], [header, msg])
      const { r, s, v } = provider._signingKey().signDigest(digest)
      return ethers.utils.solidityPack(['bytes32', 'bytes32', 'uint8'], [r, s, v])
    },
    signTypedData: async (data) => {
      console.log(data, 'data');
      const signature = await provider.provider.request({
        method: 'eth_signTypedData',
        params: [
          data
        , providerAddr]
      })
      return signature
    }
  }
}

const getContract = (signerAddr, tokenAddr, abi)=>{
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner(signerAddr)
  return new Contract(tokenAddr, abi, signer)
}
const addTokenToWallet = async () => {
  const token = tokenList.find((item)=>item.name==='usdc'&&item.chainId==web3Store.evmCurrentNetwork.chainId)
  if (window.ethereum && window.ethereum.isMetaMask) {
    const tokenAddress = token.address
    const tokenSymbol = web3Store.evmCurrentNetwork.chainId == '123666'?'meson_usdt':'USDC';
    const tokenDecimals = '6';
    const tokenImage = '';
  
    const params = {
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address: tokenAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage,
        },
      },
    };
  
    try {
      const result = await window.ethereum.request(params);
      // console.log('Token added to MetaMask', result);
    } catch (error) {
      // console.error('Error adding token to MetaMask', error);
    }
  } else {
    console.error('MetaMask is not installed');
  }
}
export {getRemoteSigner, addTokenToWallet}

// const balance = await provider.getBalance(web3Store.currentAccount)
// const wallet = new Wallet('')
// 0x0100001e848080000000000005bfec6600000f424000663de589003d0536a801'
// 0x0100001e848080000000000005bfec6600000f424000663de589003d0536a801
// 0xd3a62d759aafa2349fbdf7cc79e4460efa053d7bb4cb2a3db06304a54ac70c5139d417c05d766d8157b47199077a41ba09956ec7d6131a5c0d40a1def727a32a
// 0xa66c1e986e4fe3cfaad0e408d507bba9b585e6287c3004681082e96819712e224a9a8ab39ac426724ed1535ba7c597476ad30f824475e26a590cf16c959f27b0
// "0xa66c1e986e4fe3cfaad0e408d507bba9b585e6287c3004681082e96819712e224a9a8ab39ac426724ed1535ba7c597476ad30f824475e26a590cf16c959f27b0"
// const swapSigner = new EthersWalletSwapSigner(wallet)
// const short = await contract.getShortCoinType();
// console.log(short, 'short');
// const mesonClientForInitiator = new MesonClient(contract,"0x36a8")

// const re_swap =  mesonClientForInitiator.requestSwap(data, "0x003d")

// const signature_1 = await swapSigner.signSwapRelease(re_swap.encoded, web3Store.currentAccount, false)
    // const signedReleaseData = await re_swap.signForRelease(web3Store.currentAccount, false)
    // console.log(signedReleaseData);
    // const signedRelease = new SignedSwapRelease(signedReleaseData)
    // signedRelease.checkSignature()
    // const exswap = await mesonClientForInitiator.executeSwap(signedRelease, false)
    // const signature = await provider.provider.request({
    //   method: 'eth_signTypedData',
    //   params: [[
    //     {
    //       name: "Sign to request a swap on Meson",
    //       type: "bytes32",
    //       // value: '0x0100001e8480800000000000ef9cbe4400000f424000663cf527003d0536a801'
    //       value: re_swap.encoded
    //     },
    //     {
    //       name: "Recipient",
    //       type: "address",
    //       value: web3Store.currentAccount
    //     }
    //   ], web3Store.currentAccount]
    // })
    
    // const recovered = ethers.utils.keccak256(SwapSigner.prehashRequest(re_swap.encoded, true))
    // const recovered = ethers.utils.recoverAddress(SwapSigner.hashRequest(re_swap.encoded, true)).toLowerCase()
    // // const recovered = ethers.utils.recoverAddress(this.getDigest(), this.signature).toLowerCase()
    // // // signer.signMessage('Sign to release a swap on Meson:'+new Swap(data).encoded)
    // console.log(signature, recovered, 'recovered');
    // const signatureObj = ethers.utils.splitSignature(signature).compact;
    // const signatureObj = separateSignature(signature)
    // // // const contract = new Contract('0x483c1FE0E455912A69De699DC967b6d0E1e4f94a', abi, signer)
    // console.log(signatureObj);
    // const res = await contract.postSwap(
    //   re_swap.encoded,
    //   // '0x0100001e8480800000000000ef9cbe4400000f424000663cf527003d0536a801',
    //   signatureObj[0],
    //   signatureObj[1],
    //   // signatureObj[2],
    //   ethers.utils.solidityPack(['address', 'uint40'], [web3Store.currentAccount, 1])
    // )
    // console.log(res,'contract')