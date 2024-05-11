import { defineStore } from "pinia";
import { ethers } from "ethers";
// import Web3 from "web3";
import { addressFake } from "@/packages/utils/index.js"

export const useWeb3Store = defineStore("web3", {
  state: () => ({
    // web3Ref: new Web3(activeProvider),
    // web3Ref: activeProvider && new ethers.providers.Web3Provider(activeProvider),
    evmProvider:null,
    btcAddressPublicKey: "",
    bridgeType: "evm",
    evmAccounts: [],
    btcAccounts: [],
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
    }
  }),
  getters: {
    currentAvatar() {
        if (this.isOkxWallet()) return this.avatar.okxLogo;
        if (this.isUniSatWallet()) return this.avatar.unisatLogo;
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
    async getAccounts() {
      try {
        let accounts;
        if (this.bridgeType=='evm') {
          const activeProvider = this.providerMap.get('metaMask');
          const provider = new ethers.providers.Web3Provider(activeProvider)
          // const isConnect = await provider.isConnected()
          accounts = await provider.send('eth_accounts')
          console.log(accounts,'account');
          this.evmAccounts = accounts
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
