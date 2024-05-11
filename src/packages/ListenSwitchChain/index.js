import pinia, {useWeb3Store} from "@/stores/index.js";
import EventEmitter from "@/packages/EventEmitter/index.js";
import {ethereumChain, uniSatChain} from "@/packages/chainList/index.js"
import {customNotification} from "@/packages/customNotification/index.js";

const isPrdEnv = import.meta.env.VITE_APP_ENV === "prd";
const web3Store = useWeb3Store(pinia);

class ListenSwitchChain extends EventEmitter {
  constructor() {
    super();
    this.chain = null;
    this.checkChain();
  }

  // 根据环境判断主网/测试网
  comparisonNetWork(currentNetWork) {
    let network;
    if (web3Store.isEthereumChain()) {
      network = parseInt(ethereumChain.chainId, 16);
    } else if (web3Store.isUniSatWallet()) {
      network = uniSatChain.chainId;
    }
    return network === currentNetWork;
  }

  async checkChain() {
    if (web3Store.isEthereumChain()) {
      this.chain = ethereumChain;
    } else if (web3Store.isUniSatWallet()) {
      this.chain = uniSatChain;
    }

    if (!this.chain) return;

    let network;
    if (web3Store.isEip1193Api()) {
      network = await this._getCurrentChainId();
    } else if (web3Store.isUniSatWallet()) {
      network = await web3Store.activeProvider.getNetwork();
    }

    if (!this.comparisonNetWork(network)) this._emit("switch", this.chain);
  }

  async _getCurrentChainId() {
    let chainId;
    if (web3Store.isEip1193Api()) {
      chainId = await web3Store.activeProvider.request({ method: "eth_chainId" });
    } else if (web3Store.isUniSatWallet()) {
      chainId = await web3Store.activeProvider.getNetwork();
    }
    return chainId;
  }

  switchErrorToast(message) {
    customNotification({
      message,
      type: 'success',
    })
  }

  async _switchChain() {
    if (web3Store.isEip1193Api()) {
      try {
        await web3Store.activeProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId:  this.chain.chainId }],
        });
        this._emit("chainChanged");
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await web3Store.activeProvider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: this.chain.chainId,
                  chainName: this.chain.chainName,
                  rpcUrls: this.chain.rpcUrls
                },
              ],
            });
            this._emit("chainChanged");
          } catch (addError) {
            this.switchErrorToast('Chain add failed');
          }
        }
        this.switchErrorToast('Chain switch failed');
      }
    } else if (web3Store.isUniSatWallet()) {
      await web3Store.activeProvider.switchNetwork(this.chain.chainId);
      this._emit("chainChanged");
    }
  }
}

export default ListenSwitchChain;
