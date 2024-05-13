import { defineStore } from "pinia";
import { ethers } from "ethers";
// import Web3 from "web3";
import { addressFake } from "@/packages/utils/index.js"
import {getErc20Contract} from '@/packages/utils/evmProvider.js'
import {tokenList,contractTokens} from '@/packages/chainList/config/chainId.js'

export const useWeb3Store = defineStore("web3", {
  state: () => ({
    // web3Ref: new Web3(activeProvider),
    // web3Ref: activeProvider && new ethers.providers.Web3Provider(activeProvider),
    evmProvider:null,
    evmCurrentNetwork: {
      chainId:1
    },
    evmblockNumber: 0,
    btcAddressPublicKey: "",
    bridgeType: "evm",
    evmAccounts: [],
    btcAccounts: [],
    balances: {
      native:0,
      usdc:0
    },
    providerKey: '',
    activeProvider: null,
    installedList: {
      metaMask: false,
      okx: false,
      uniSat: false
    },
    connectPop: {
      btcFirstError: "",
      evmVerifyError: "",
    },
    providerMap: [],
    accounts: [],
    loginComplete: false,
    isShowConnectWallet: false,
    connectLoadingIcon: false,
    avatar: {
      okxLogo: new URL("@/assets/img/logo-okx.png", import.meta.url).href,
      unisatLogo:new URL("@/assets/img/logo-unisat.png", import.meta.url).href,
      iconWallet:new URL("@/assets/img/icon-wallet.png", import.meta.url).href,
      ethLogo:new URL("@/assets/img/eth.png", import.meta.url).href,
      oneLogo:new URL("@/assets/img/one.png", import.meta.url).href,
    }
  }),
  getters: {
    currentAvatar() {
        if (this.isOkxWallet()) return this.avatar.okxLogo;
        if (this.isUniSatWallet()) return this.avatar.unisatLogo;
        return this.avatar.iconWallet;
    },
    currentWalletAvatar() {
      if (this.evmCurrentNetwork.chainId=='11155111'||this.evmCurrentNetwork.chainId=='1') return this.avatar.ethLogo;
      if (this.evmCurrentNetwork.chainId=='123666') return this.avatar.oneLogo;
      return this.avatar.iconWallet;
  },
    currentAccountFake() {
      return this.currentAccount ? addressFake(this.currentAccount) : '';
    },
    currentAccount() {
      return this.accounts?.length > 0 ? this.accounts[0] : '';
    },
  },
  actions: {
    init({ providerKey, providerMap, installedList, activeProvider }) {
      this.providerKey = providerKey;
      this.providerMap = providerMap;
      this.installedList = installedList;
      this.activeProvider = activeProvider;
    },
    isEip1193Api() {
      return ['okx'].includes(this.providerKey);
    },
    isEthereumChain() {
      return ['okx'].includes(this.providerKey);
    },
    isOkxWallet() {
      return this.providerKey === 'okx';
    },
    isUniSatWallet() {
      return this.providerKey === 'uniSat';
    },
    async getBalance() {
      if (this.bridgeType=='evm'&&window.ethereum) {
        const provider = new ethers.providers.Web3Provider(activeProvider)
      }
    },
    async getAccounts() {
      try {
        let accounts;
        if (this.bridgeType=='evm'&&window.ethereum) {
          // const activeProvider = this.providerMap.get('metaMask');
          const provider = new ethers.providers.Web3Provider(window.ethereum)
          // const isConnect = await provider.isConnected()
          // console.log(await provider.getNetwork());
          accounts = await provider.send('eth_accounts')
          this.accounts = accounts;
          this.evmCurrentNetwork = await provider.getNetwork()
          this.evmAccounts = accounts
          console.log(this.evmCurrentNetwork);
          // get balance
          if(accounts.length<=0) return
          const ban = await provider.getBalance(this.currentAccount)
          this.balances.native = ethers.utils.formatUnits(ban.toString(),18)
          const usdc = tokenList.find((item)=>item.name==='usdc'&&item.chainId==this.evmCurrentNetwork.chainId)
          if (usdc&&usdc.address) {
            const contract = getErc20Contract(this.currentAccount, usdc.address)
            const balance = await contract.balanceOf(this.currentAccount);
            this.balances.usdc = ethers.utils.formatUnits(balance.toString(),6)
          }
          console.log(accounts,'account',this.balances);
          
        } else if(this.bridgeType=='btc'){
          if (this.isOkxWallet()) {
            accounts = await this.activeProvider?.bitcoin?.getAccounts();
          } else if (this.isUniSatWallet()) {
            accounts = await this.activeProvider.getAccounts();
          }
        }
        
        this.accounts = accounts;
        return accounts;
      } catch (e) {
        console.error("web3 store getAccounts error=>", e);
      }
    },
    setActiveProvider(key) {
      this.activeProvider = null;
      this.providerKey = key;
      const activeProvider = this.providerMap.get(this.providerKey);
      if (activeProvider) {
        // this.web3Ref = new Web3(activeProvider)
        // this.web3Ref = new ethers.providers.Web3Provider(activeProvider)
      }
      this.activeProvider = activeProvider;
    },
    saveLocalProviderKey() {
      localStorage.setItem("fe_dapp_provider_save_key", this.providerKey);
    },
    clearProviderKey() {
      this.loginComplete = false;
      this.providerKey = '';
      localStorage.removeItem("fe_dapp_provider_save_key");
      this.accounts = [];
    },
    disconnect() {
      this.clearProviderKey();
    }
  }
});
