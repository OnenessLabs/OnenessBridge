/**
 * 通用工具函数
 */

import {customNotification} from "@/packages/customNotification/index.js";

/**
 * 返回 querystring 对象
 * @param url
 * @return {Object} 对象
 */
function queryParse(url) {
    const dic = {};
    url = url || location.search.slice(1);
    const array = url.split("&");
    for (let i = 0, len = array.length; i < len; i++) {
        const params = array[i].split("=");
        if (params[0]) {
            dic[decodeURIComponent(params[0])] = decodeURIComponent(params[1]);
        }
    }
    return dic;
}

/**
 * 将qs的对象序列化成 querystring 字符串
 * @param {object} obj
 * @return {string}
 */
function queryStringify(obj) {
    const qs = [];
    for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
            qs.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    }
    return qs.join("&");
}

/**
 * 根据key返回url中的value
 * @param {string} key
 * @param {string} [url]
 * @returns {string}
 */
function query(key, url) {
    return queryParse(url)[key];
}

/**
 * 节流
 * @returns {function} 返回一个函数，接受 fn，limitMS
 */
function throttle() {
    let lock = false;
    return (fn, limitMS) => {
        if (lock) return;
        lock = true;
        fn();
        setTimeout(() => {
            lock = false;
        }, limitMS);
    };
}

/**
 * 防抖
 * @returns {function} 返回一个函数，接受 fn，limitMS
 * @returns
 */
function debounce() {
    let id = null;
    return (fn, limitMS) => {
        if (id) clearTimeout(id);

        // first invoke
        if (!id) {
            id = "invoke";
            fn();
        } else {
            id = setTimeout(() => {
                fn();
            }, limitMS);
        }
    };
}

// 动态加载js
function loadJs(src, scope = window) {
    return new Promise((resolve, reject) => {
        const ref = scope.document.getElementsByTagName("script")[0];
        const script = scope.document.createElement("script");
        script.src = src;
        ref.parentNode.insertBefore(script, ref);
        script.onload = resolve;
        script.onerror = reject;
    });
}

// 复制文本
function copyTextToClipboard(text) {
    try {
        navigator.clipboard.writeText(text);
    } catch (e) {
        copyTextToClipboardFallback(text);
    }
    customNotification({
        message: 'Copied to clipboard!',
        type: "success"
    })
}

function copyTextToClipboardFallback(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // 使 textArea 不可见并防止页面滚动
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        console.log("文本复制成功");
    } catch (err) {
        console.error("无法复制文本", err);
    }

    document.body.removeChild(textArea);
}

const addressFake = (address) => {
    const start = address?.substring(0, 4) || "";
    const end = address?.substring(address?.length - 4) || "";
    return `${start}*****${end}`;
};

const isMobile = () => {
    const ua = navigator.userAgent;
    const isIOS = /iphone|ipad|ipod|ios/i.test(ua);
    const isAndroid = /android|XiaoMi|MiuiBrowser/i.test(ua);
    return isIOS || isAndroid;
}

const isOKApp = /OKApp/i.test(navigator.userAgent);

const okxAppUniversalLink = () => {
    if (isMobile() && !isOKApp) {
        const encodedDappUrl = encodeURIComponent(location.href);
        const deepLink = "okx://wallet/dapp/url?dappUrl=" + encodedDappUrl;
        return "https://www.okx.com/download?deeplink=" + encodeURIComponent(deepLink);
    }
}

export {
    query,
    queryStringify,
    queryParse,
    debounce,
    throttle,
    loadJs,
    copyTextToClipboard,
    addressFake,
    isMobile,
    isOKApp,
    okxAppUniversalLink
};
