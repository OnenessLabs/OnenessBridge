import {hideLoading, showLoading} from "@/components/showLoading/index.js";
import {customNotification} from "@/packages/customNotification/index.js";
import {copyTextToClipboard} from "@/packages/utils/index.js";

const _task = {
    id: null,
    "action": "",
    "point": 5,
    "status": 0,
    "title": "",
    "describe": "",
    "buttonText": "",
    "title_button_text": "", // 标题按钮文案
    "title_button_action": "", // 标题按钮行为
    "extra": {
        "check_button_type": 1, // 刷新按钮类型 1: 图标按钮 2: 文字按钮
        "check_button_text": "", // 按钮文案
        "target": "", // fetch_blank先调用target_url获取url, 然后在新窗口打开 | _blank新窗口打开 | fetch请求接口后提示toast
        "target_url": "", // 跳转的url
        "need_check": 0, // 控制页面是否有刷新按钮
        "check_url": "",  // 如果need_check: 1, 用户行为发生后, 调用该接口验证
        "need_enabled": 0, // 是否需要开启任务
        "hide_points": 0, // 是否隐藏积分
        "clipboard_content": '', // 粘贴版内容
    }
}

class TaskExecutor{
    static $http;
    static homeStore;
    constructor(task = _task, $http, homeStore) {
        this.task = task;
        if (!TaskExecutor.$http) {
            TaskExecutor.$http = $http;
        }
        if (!TaskExecutor.homeStore) {
            TaskExecutor.homeStore = homeStore;
        }
        this.$http = TaskExecutor.$http;
        this.homeStore = TaskExecutor.homeStore;
    }

    clipboardContent() {
        const text = this.task?.extra?.clipboard_content;
        if (!text) return;
        copyTextToClipboard(text);
    }

    trigger(task) {
        if(task) this.task = task;
        const action = this.task.action.toLocaleLowerCase();
        const actionMap = new Map([
            ['bind', this.handleTask],
            ['comment2', this.handleTask],
            ['follow', this.handleTask],
            ['post', this.handleTask],
            ['rename', this.handleTask],
            ['reply', this.handleTask],
            ['retweet', this.handleTask],
            ['like', this.handleTask],
            ['holding', this.holding],
        ]);
        return actionMap.get(action).call(this);
    }

    pointSuccessToast(message) {
        customNotification({
            message,
            type: "success"
        })
    }

    pointErrorToast(message) {
        customNotification({
            message: message || 'Sorry, you have not completed the task yet',
            type: "error",
        })
    }

    // nft领取积分任务
    async holding() {
        // if (this.homeStore.v1PointMy.nftCount <= 0) {
        //     const count = await this.homeStore.getNftCount();
        //     if (count <= 0) {
        //         return this.pointErrorToast();
        //     }
        // }
        return this.checkStatus();
    }

    // 通过状态处理不同的逻辑
    handleTask() {
        const { target, target_url } = this.task.extra;

        if (target === 'fetch') {
            return new Promise((resolve, reject) => {
                showLoading();
                this.$http.get(target_url).then(res => {
                    const tip = res?.data?.tip;
                    tip && this.pointSuccessToast(tip);
                    resolve({ ...res, refresh_flag: true });
                }).catch(err => {
                    this.pointErrorToast(err?.msg || 'Fetch url failed');
                    reject(err);
                }).finally(() => {
                    hideLoading();
                });
            });
        }

        if (target === '_blank') {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    target_url && window.open(target_url);
                }, 200);
                resolve();
            });
        }

        if (target === 'fetch_blank') {
            return new Promise((resolve, reject) => {
                showLoading();
                this.$http.get(target_url).then( async (res) => {
                    if(res?.data?.url) {
                        // 如果有粘贴板内容, 先复制
                        if (this.task?.extra?.clipboard_content) {
                            this.clipboardContent();
                            await new Promise(resolve => setTimeout(resolve, 2000));
                        }

                        setTimeout(() => {
                            window.open(res.data.url);
                        }, 200)
                    }
                    resolve({ ...res, refresh_flag: true });
                }).catch(err => {
                    this.pointErrorToast(err?.msg || 'Fetch url failed');
                    reject(err);
                }).finally(() => {
                    hideLoading();
                });
            });
        }
    }

    // 检查任务状态
    checkStatus() {
        return this.$http.get(this.task.extra.check_url).then(res => {
            if (res?.code !== 0) return;
            // if (res?.code !== 0) return this.pointErrorToast(res?.msg || 'Task not completed')
            const tip = res?.data?.tip;
            if (res.data.status === 1) {
                const fallbackTip = `${this.task.title} completed +${this.task.point} points`;
                this.pointSuccessToast(tip || fallbackTip);
            } else {
                this.pointErrorToast(tip || res?.msg)
            }
            return res;
        });
    }
}

export default TaskExecutor
