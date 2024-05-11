import JsCookies from "js-cookie";

function getDomainOrIP(hostname) {
  const ipPattern = /^(?:\d{1,3}\.){3}\d{1,3}$/;
  if (ipPattern.test(hostname)) {
    return hostname;
  } else {
    const parts = hostname.split('.');
    if (parts.length > 2) {
      parts.shift(); // 移除第一个部分 (例如 'www')
    }
    return parts.join('.');
  }
}

class Cookies {
  constructor(nameSpace = "fe_dapp_wallet_activity") {
    this.nameSpace = nameSpace;
  }

  cookieOptions() {
    return {
      expires: 3 * 365,
      domain: getDomainOrIP(window.location.hostname)
    };
  }

  set(key, value, options = {}) {
    JsCookies.set(`${this.nameSpace}_${key}`, value, { ...this.cookieOptions(), ...options });
  }

  get(key) {
    return JsCookies.get(`${this.nameSpace}_${key}`);
  }

  remove(key, options = {}) {
    JsCookies.remove(`${this.nameSpace}_${key}`, { ...this.cookieOptions(), ...options });
  }
}

export default Cookies;
