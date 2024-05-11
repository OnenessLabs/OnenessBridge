import Cookies from "@/packages/Cookies/index.js";
const cookies = new Cookies();
import pinia, { useWeb3Store } from "@/stores/index.js";

class TokenManage {
  constructor() {
    this.web3store = useWeb3Store(pinia);
  }

  currentAccountKey() {
    const account = this.web3store.currentAccount || sessionStorage.getItem('current_select_account');
    return account;
  }

  tokenKey(key) {
    return `${key || this.currentAccountKey()}_token`;
  }

  tokenTsKey() {
    return `${this.currentAccountKey()}_token_ts`;
  }

  removeToken() {
    cookies.remove(this.tokenKey());
  }

  setToken(token) {
    if (!token) return;
    cookies.set(this.tokenKey(), token, { expires: 365 * 3 });
  }

  getToken(key) {
    return cookies.get(this.tokenKey(key));
  }

  removeTokenTs() {
    cookies.remove(this.tokenTsKey());
  }

  setTokenTs(token) {
    cookies.set(this.tokenTsKey(), token, { expires: 365 * 3 });
  }

  getTokenTs() {
    return cookies.get(this.tokenTsKey());
  }
}

export default TokenManage;
