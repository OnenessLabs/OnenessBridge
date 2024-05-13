
import { ethers, Contract, Wallet } from "ethers";
import abi from '@/abi/meson.json'
import Erc20abi from '@/abi/ERC20.json'
const getContract = (signerAddr, tokenAddr, abi)=>{
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner(signerAddr)
  return new Contract(tokenAddr, abi, signer)
}
const getErc20Contract = (signerAddr, tokenAddr)=>{
  return getContract(signerAddr, tokenAddr,Erc20abi.abi)
}
const getSwapContract = (signerAddr, tokenAddr)=>{
  return getContract(signerAddr, tokenAddr,abi)
}
export {getContract, getErc20Contract, getSwapContract}