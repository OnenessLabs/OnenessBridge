import axios from "axios";
import TokenManage from "../HttpApi/tokenManage.js";
import pinia, { useWeb3Store } from "@/stores/index.js";
import { ElNotification} from "element-plus"

class Request {
  constructor(baseURL = import.meta.env.VITE_APP_API_BASE_URL) {
    this.web3Store = useWeb3Store(pinia);
    this.tokenManage = new TokenManage();
    this.instance = axios.create({
      baseURL,
    });
    this.instance.interceptors["response"].use(this.responseHandler.bind(this));
    this.instance.interceptors["request"].use(this.requestHandler.bind(this));
  }

  _getToken() {
    return `${this.tokenManage.getToken()}`
  }

  async setHeader(config) {
    config.headers['Access-Token'] = this._getToken();
    return config;
  }

  async requestHandler(config) {
    config = await this.setHeader(config);
    return config;
  }

  async responseHandler(response) {
    const _code = response?.data?.code;

    if (_code !== 0){
      const msg = response?.data?.msg;
      if (_code === 401) {
        this.errorNotification(_code, msg || 'Login status has expired');
        this.tokenManage.removeToken();
        this.tokenManage.removeTokenTs();
        this.web3Store.disconnect();
        this.web3Store.isShowConnectWallet = true;
        return response;
      } else {
        const showToast = response.config.showToast;
        showToast && this.errorNotification(_code, msg || 'Request failed');
      }
    }


    this.checkRenewToken(response);

    return response;
  }

  checkRenewToken(response) {
    /**
     * 自动续期token：如果token不一样，最新颁发的时间，大于上次存在本地的时间，就把本地存储的时间和token更新掉
     * 接口调用成功后，response header将包含 「Access-Token」,「Access-Token-Ts」
     * Access-Token 和 Access-Token-Ts 都存在本地
     */
    const accessToken = response.headers['access-token'];
    const accessTokenTs = response.headers['access-token-ts'];
    const localAccessToken = this.tokenManage.getToken();
    const localAccessTokenTs = this.tokenManage.getTokenTs();
    // 检查从响应中获取的 token 是否存在
    if (!accessToken || !accessTokenTs) {
      return response;
    }

    // 比较 token 和时间戳
    const localAccessTokenTsNumber = Number(localAccessTokenTs);
    if (accessToken !== localAccessToken || +accessTokenTs > localAccessTokenTsNumber) {
      this.tokenManage.setToken(accessToken);
      this.tokenManage.setTokenTs(accessTokenTs);
    }

    return response;
  }

  errorNotification(code, message) {
    clearTimeout(window.oneness_request_error_toast_timer);
    window.oneness_request_error_toast_timer = setTimeout(() => {
      ElNotification({
        message: message,
        customClass: "custom-notification custom-notification-error",
        showClose: true,
        type: "error"
      })
    }, 200);
  }

  async get(url, params = {}, config = {}) {
    config.showToast = config.hasOwnProperty('showToast') ? config.showToast : true;
    if (config?.mock) return config?.mock;
    try {
      const response = await this.instance.get(url, { params, ...config });
      return response.data;
    } catch (error) {
      const { code, message } = error;
      this.errorNotification(code, message);
      // throw new Error(error.response);
    }
  }

  async post(url, data = {}, config = {}) {
    config.showToast = config.hasOwnProperty('showToast') ? config.showToast : true;
    if (config?.mock) return config?.mock;
    try {
      const response = await this.instance.post(url, data, config);
      return response.data;
    } catch (error) {
      const { code, message } = error;
      this.errorNotification(code, message);
      // throw new Error(error.response);
    }
  }
}

export default Request;
