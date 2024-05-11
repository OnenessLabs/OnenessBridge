import pinia, { useWeb3Store } from "@/stores/index.js";

const web3Store = useWeb3Store(pinia);

export default function directiveConnectWallet(app) {
    app.directive('connect-wallet', {
        mounted(el, binding) {
            el.addEventListener('click', () => {
                if (!web3Store.currentAccount) {
                    web3Store.isShowConnectWallet = true;
                    return;
                }
                // 如果传递了 test 参数并且是一个函数，则执行它
                if (typeof binding.value === 'function') {
                    const args = binding.arg ? [binding.arg] : []; // 提取参数
                    binding.value(...args);
                }
            });
        }
    });
}