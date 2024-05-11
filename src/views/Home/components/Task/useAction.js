import {computed, inject, reactive} from "vue";
import TaskExecutor from "./taskExecutor.js";
import pinia, {useHomeStore, useWeb3Store} from "@/stores/index.js";
import {hideLoading, showLoading} from "@/components/showLoading/index.js";
import {customNotification, singletonNotification} from "@/packages/customNotification/index.js"

// 推特任务未完成提示
export function twitterTaskNotFinishNotification() {
    customNotification({
        message: 'Unauthorized Twitter account, please complete account authorization before continuing with tasks',
        type: "error"
    });
}

export function useAction(props) {
    const web3Store = useWeb3Store(pinia);
    const homeStore = useHomeStore(pinia);
    const $httpApi = inject('$httpApi');
    const taskAction = new TaskExecutor(props.detail, $httpApi, homeStore);

    const data = reactive({
        refreshLoading: false,
    })

    // 判断是否展示刷新按钮 0不展示 1图标按钮 2文字按钮
    const isShowRefresh = computed(() => {
        // return web3Store.currentAccount && props.detail?.status === 0 && props.detail?.extra?.need_check === 1;
        if (!web3Store.currentAccount) return 0;
        if (props.detail?.extra?.need_check === 1) {
            if (props.detail?.extra?.check_button_type === 2) return 2;
            if (props.detail?.status === 0) return 1;
        }
        return 0;
    });

    // 任务是否已经完成
    const taskFinish = computed(() => {
        return props.detail?.status === 1;
    });

    // 检测推特绑定任务是否已完成
    const checkTwitterFinish = computed(() => {
        const category = props?.detail.category.toLocaleLowerCase() || '';
        const action = props?.detail.action.toLocaleLowerCase() || '';
        const twitterFinish = homeStore.v1SocialTaskStatus.twitterFinish;
        const accountAction = ['bind', 'follow'];
        return !(category === 'twitter' && !accountAction.includes(action) && !twitterFinish);
    });

    // 监听某些任务页面回传的消息弹窗
    const origin = location.origin;
    function handleMessage (event) {
        if (event.origin !== origin) {
            return;
        }
        const author = event.data?.author;
        const message = event.data?.message;
        const type = event.data?.type;
        if (author === 'auth_callback' && message) {
            singletonNotification({
                message,
                type
            });
            window.removeEventListener('message', handleMessage, false);
        }
    }

    const methods = {
        clipboardContent() {
            taskAction.clipboardContent();
        },
        doTask() {
            window?.gtag('event', 'task_click', {
                action: props.detail.action,
                task_id: props.detail.id,
                twitter_finish: checkTwitterFinish.value ? 'success' : 'fail'
            });

            window.removeEventListener('message', handleMessage, false);
            window.addEventListener('message', handleMessage, false);

            if (!checkTwitterFinish.value) return twitterTaskNotFinishNotification();
            if (props.detail?.status === 1) return;

            showLoading();
            taskAction.trigger(props.detail).then( async (res) => {
                if (res?.refresh_flag) await homeStore.initData();
                hideLoading();
            });
        },
        refreshTask(openLoading = false) {
            window?.gtag('event', 'refresh_task_click', {
                action: props.detail.action,
                task_id: props.detail.id,
                twitter_finish: checkTwitterFinish.value ? 'success' : 'fail'
            });

            if (!checkTwitterFinish.value) return twitterTaskNotFinishNotification();

            if (data.refreshLoading) return;

            openLoading && showLoading();
            data.refreshLoading = true;
            taskAction.checkStatus().then(res => {
                props.detail.status = res?.data?.status || 0;
            }).finally(async() => {
                // await homeStore.initData();
                data.refreshLoading = false;
                hideLoading();
                homeStore.getV1PointMy();
                homeStore.getV1SocialTask();
                homeStore.getV1DailyTask();
            });
        }
    }

    return {
        web3Store,
        data,
        isShowRefresh,
        methods,
        taskFinish,
    }
}
