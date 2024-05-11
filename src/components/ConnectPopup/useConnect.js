import {computed, inject, ref} from "vue";
import pinia, {useWeb3Store} from "@/stores/index.js";
import { query } from "@/packages/utils/index.js"

import {ElDialog} from "element-plus";
import {customNotification} from "@/packages/customNotification/index.js";

export function useConnect (emit)  {
    const web3Store = useWeb3Store(pinia);
    const $httpApi = inject('$httpApi');
    const $tokenManage = inject('$tokenManage');

    const okxWalletDisabled = computed(() => {
        return !web3Store.installedList.okx || false;
    });

    const uniSatWalletDisabled = computed(() => {
        return !web3Store.installedList.uniSat || false;
    });

    const methods = {
        handleOpen() {
            web3Store.connectPop.btcFirstError = '';
            web3Store.isShowConnectWallet = true;
        },
        handleClose() {
            web3Store.connectPop.btcFirstError = '';
            web3Store.connectLoadingIcon = false;
            web3Store.isShowConnectWallet = false;
        },
        onConnectWallet({ accounts }) {
            const account = accounts[0];
            sessionStorage.setItem('current_select_account', account);
            methods.personalSign(account).then(res => {
                if (res?.code !== 0) return;
                web3Store.accounts = accounts;
                web3Store.saveLocalProviderKey();
                $tokenManage.setToken(res?.data.token);
                web3Store.loginComplete = true;
                web3Store.isShowConnectWallet = false;
                sessionStorage.setItem('current_select_account', '');
            }).finally(() => {
                web3Store.connectLoadingIcon = false;
            })
        },
        async personalSign (account) {
            try {
                let chainId;
                if (web3Store.isOkxWallet()) {
                    chainId = await web3Store.activeProvider.bitcoin.getNetwork();
                } else if (web3Store.isUniSatWallet()) {
                    chainId = await web3Store.activeProvider.getNetwork();
                }

                const publicKey = await methods.getPublicKey();
                const address = account;
                const message = `${address}#${Math.round(new Date().getTime() / 1000)}#${chainId}`;
                // const message = `login#${Math.round(new Date().getTime() / 1000)}#${chainId}#${publicKey}#${address}`;
                let signature;

                if (web3Store.isOkxWallet()) {
                    signature = await web3Store.activeProvider.bitcoin.signMessage(message, 'ecdsa')
                } else if (web3Store.isUniSatWallet()) {
                    signature = await web3Store.activeProvider.signMessage(message,'ecdsa');
                }
                console.log('=======');
                console.log({
                    address,
                    message,
                    signature,
                    publicKey
                });
                console.log('=======');

                return methods.recoverAddressAndMessage({ message, signature, publicKey, address });
            } catch (e) {
                web3Store.disconnect();
                customNotification({
                    message: 'Wallet signature failed, please try again later.',
                    type: 'error',
                })
                console.error("personalSign Error：", e);
            }
        },
        async getPublicKey() {
            let publicKey;
            if (web3Store.isOkxWallet()) {
                publicKey = await web3Store.activeProvider.bitcoin.getPublicKey();
            } else if (web3Store.isUniSatWallet()) {
                publicKey = await web3Store.activeProvider.getPublicKey();
            }
            return publicKey;
        },
        recoverAddressAndMessage({ message, signature, publicKey, address}) {
            const params = {
                code: query("code") || '',
                type: 'wallet',
                platform: web3Store.providerKey.toLocaleLowerCase(),
                publickey: publicKey,
                message,
                signature,
                address
            };
            return $httpApi.login(params).then(res => {
                if (res?.code === 0) {
                    customNotification({
                        message: 'Login successful',
                        type: 'success',
                    })
                    setTimeout(() => {
                        emit("loginSuccess");
                    }, 300);
                } else {
                    customNotification({
                        message: 'Login failed, please try again later.',
                        type: "error",
                    });
                    web3Store.disconnect();
                }
                return res;
            }).catch(e => {
                web3Store.disconnect();
                console.error("login Error：", e);
            });
        }
    }

    return {
        ElDialog,
        web3Store,
        $httpApi,
        $tokenManage,
        okxWalletDisabled,
        uniSatWalletDisabled,
        methods,
        emit,
    }
}
