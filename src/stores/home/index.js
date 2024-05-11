import {defineStore} from "pinia";
import HttpApi from "@/packages/HttpApi/index.js";
import pinia, {useWeb3Store} from "@/stores/index.js";

/**
 * 遍历任务data对象，判断key给对应key下面的所有任务添加category字段
 * @param data
 * @returns {*}
 */
function addCategoryToTask(data) {
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            const array = data[key];
            // 遍历array, 并给对应的item添加category字段，例如：category: 'twitter'
            array.forEach(item => item.category = key);
        }
    }
    return data;
}

/**
 * 判断key等于推特的所有任务是否都已经完成
 * data是一个对象，key是任务类型，value是任务数组
 * @param data
 * @param type
 * @returns boolean
 */
function isAllTaskCompleted(data, type = 'twitter') {
    for (let key in data) {
        if (data.hasOwnProperty(key) && key === type) {
            const array = data[key];
            return array.every(item => item.status === 1);
        }
    }
    return false;
}

/**
 * 处理任务数据
 * 如果数组长度小于2，不做处理
 * 如果数组长度大于等于2，只保留第一条status等于0的数据，如果没有status等于0的，则取数组的最后一条数据
 * @param data
 * @returns {*}
 */
function processTaskData(data) {
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            const array = data[key];
            if (array.length >= 2) {
                const statusZeroItem = array.find(item => item.status === 0);
                data[key] = statusZeroItem ? [statusZeroItem] : [array[array.length - 1]];
            }
        }
    }
    return data;
}

export const useHomeStore = defineStore("home", {
    state: () => ({
        httpApi: new HttpApi(),
        web3Store: useWeb3Store(pinia),
        // 控制弹窗展示
        popup: {
            showNftList: false
        },
        // 我的积分
        v1PointMy: {
            nftCount: 0,
            points: 0,
            rank: 0,
            nftRewardPoint: 0
        },
        v1Nft: {
            whitelist: [],
            count: 0
        },
        // 社交平台任务
        v1SocialTask: {
            twitter: [],
            discord: []
        },
        v1SocialTaskStatus: {
            twitterFinish: false,
        },
        // 活动状态 0未生效 1生效
        v1TaskStatus: null,
        // 日常任务
        v1DailyTask: {},
        // 我的邀请信息
        v1Invite: {
            login_status: 0,
            bind_social: 0,
            invite_info: {
                bonus_points: 0,
                bind_status: 0,
                link: "",
                code: "",
                count: 0
            }
        }
    }),
    getters: {
        totalNftRewardPoint() {
            return this.v1PointMy.nftRewardPoint || 0;
            // return this.v1PointMy.nftRewardPoint * this.v1Nft.count || 0;
        },
    },
    actions: {
        async initData() {
            // await this.getNftWhitelist();
            return Promise.allSettled([
                this.getNftCount(),
                this.getV1PointMy(),
                this.getV1Invite(),
                this.getV1SocialTask(),
                this.getV1DailyTask(),
                this.getV1InviteTaskStatus()
            ]);
        },
        // 获取可以增加积分奖励的nft白名单
        getNftWhitelist() {
            const list = ['d8964830ea07fe1981d644b7913d49fc29fa22cebd7bf7858a4565a84c79fe22i0']
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.v1Nft.whitelist = list;
                    resolve(list);
                }, 200);
            });
        },
        // 根据钱包返回的nft列表判断是否在白名单中
        getNftCount() {
            const w3s = this.web3Store;
            if (!w3s.currentAccount) return;

            let provider;
            if (w3s.isOkxWallet()) {
                provider = w3s.activeProvider.bitcoin;
            } else if (w3s.isUniSatWallet()) {
                provider = w3s.activeProvider;
            }

            return provider.getInscriptions().then(res => {
                const currentAccount = this.web3Store.currentAccount;
                const whitelist = this.v1Nft.whitelist;
                const nftList = res?.list || [];

                let count = 0;
                if (!currentAccount) return this.v1Nft.count = 0;

                nftList.forEach(nft => {
                    if (whitelist.includes(nft.inscriptionId) && nft.address === currentAccount) {
                        count++;
                    }
                });
                return this.v1Nft.count = count;
            });
        },
        getV1Invite() {
            return this.httpApi.v1Invite().then((res) => {
                return this.v1Invite = res.data;
            });
        },
        getV1PointMy() {
            return this.httpApi.v1PointMy().then((res) => {
                this.v1PointMy = res.data;
                // // 如果nftRewardPoint不是数字，设置默认值
                // if (!isNaN(res.data.nftRewardPoint)) {
                //     this.v1PointMy.nftRewardPoint = res.data.nftRewardPoint;
                // } else {
                //     this.v1PointMy.nftRewardPoint = 0;
                // }
                return this.v1PointMy;
            });
        },
        getV1SocialTask() {
            return this.httpApi.v1SocialTask().then((res) => {
                const list = addCategoryToTask(res.data);
                this.v1SocialTaskStatus.twitterFinish = isAllTaskCompleted(list, 'twitter');
                return this.v1SocialTask = processTaskData(list);
            });
        },
        getV1DailyTask() {
            return this.httpApi.v1DailyTask().then((res) => {
                // res.data.twitter[0].extra.clipboard_content = 'Oneness twitter';
                // res.data.twitter[0].extra.need_enabled = 1;
                // res.data.twitter[1].extra.hide_points = 1;
                // console.error(res.data)
                const list = addCategoryToTask(res.data);
                return this.v1DailyTask = list;
            });
        },
        getV1InviteTaskStatus() {
            return this.httpApi.v1InviteTaskStatus().then((res) => {
                return this.v1TaskStatus = res?.data?.status || 0;
            });
        }
    },
});
