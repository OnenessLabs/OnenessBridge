import { defineStore } from "pinia";
import Cookies from "@/packages/Cookies/index.js";
import pinia, { useHomeStore, useWeb3Store } from "@/stores/index.js";
import {customNotification} from "@/packages/customNotification/index.js";

const cookie = new Cookies();

export const useInviteCodePopup = defineStore("inviteCodePopup", {
    state: () => ({
        visible: false,
        homeStore: useHomeStore(pinia),
        web3Store: useWeb3Store(pinia)
    }),
    actions: {
        openInviteCodePopup() {
            // 根据绑定状态判断是否显示弹窗
            if (this.homeStore.v1Invite.invite_info.bind_status === 1) {
                cookie.set(`v1_invite_bind_status${this.web3Store.currentAccount}`, '1');
                customNotification({
                    message: "You have already bound the invitation code",
                    type: "error"
                });
                return;
            }
            this.visible = true;
        },
        loginShowPopup() {
            // 登录后展示邀请码弹窗 因为是登录后触发，需要登录接口数据返回
            // 轮询store的用户数据是否已经绑定过，如果绑定过，不展示弹窗
            let intervalCount = 0;
            const interval = setInterval(() => {
                const isLogin = this.homeStore.v1Invite.login_status === 1;
                const notBind = this.homeStore.v1Invite.invite_info.bind_status === 0;
                if (isLogin && notBind) {
                    const status = cookie.get(`v1_invite_bind_status${this.web3Store.currentAccount}`);
                    const key = `invite_code_popup_count_${this.web3Store.currentAccount}`;
                    const count = cookie.get(key);
                    const nowCount =  count ? +count + 1 : 1;
                    if (nowCount <= 3 && status !== '1') {
                        this.visible = true;
                        cookie.set(key, nowCount);
                    }
                    clearInterval(interval);
                }

                intervalCount++;
                if(intervalCount >= 20) {
                    clearInterval(interval);
                }
            }, 200);
        }
    }
});
