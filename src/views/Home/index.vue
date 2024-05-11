<template>
  <div class="flex justify-between max-w-[1920px] m-auto max-md:flex-col">
    <div class="home-left-container flex-1 max-xl:w-[100%] md:min-w-[800px] max-sm:pb-[calc(450/750*100vw)]
md:overflow-scroll md:h-[100vh]">
      <div class="mx-[4.16vw]">
        <Banner></Banner>

        <div v-if="homeStore.v1TaskStatus === 0" class="text-white text-center text-[22px] font-[LemonMilk] py-[14vw]">
          The event has ended, stay tuned for more upcoming activities.
        </div>

        <template v-if="homeStore.v1TaskStatus === 1">
          <!--基础任务 所有social任务展示在一个大类-->
          <TaskList class="mt-[calc(36/1920*100vw)] max-sm:mt-[calc(36/725*100vw)] 3xl:mt-[36px]"
                    task-type="Once"
                    category-name="Basic Tasks"
                    :category-icon="baseTaskCategoryIcon"
                    :task-list="v1SocialTask"
                    v-if="v1SocialTask.length > 0"
          ></TaskList>

          <!--每日任务 按照任务分类展示-->
          <template v-for="(key, index) in Object.keys(homeStore.v1DailyTask)">
            <TaskList class="mt-[calc(36/1920*100vw)] max-sm:mt-[calc(36/725*100vw)] 3xl:mt-[36px]"
                      :key="`${key}-${index}`"
                      task-type="Daily"
                      :category-name="twitterTaskCategoryName[key.toLocaleLowerCase()]"
                      :category-icon="twitterTaskCategoryIcon[key.toLocaleLowerCase()]"
                      :task-list="homeStore.v1DailyTask[key]"
                      v-if="homeStore.v1DailyTask[key].length > 0"
            ></TaskList>
          </template>

          <!--邀请模块-->
          <div class="mt-[calc(36/1920*100vw)] max-sm:mt-[calc(36/725*100vw)] 3xl:mt-[36px]">
            <FriendsTask></FriendsTask>
          </div>
        </template>

        <div class="text-[#ffffff] opacity-30 text-center flex items-center justify-center
   py-[calc(40/750*100vw)] sm:py-[calc(40/1920*100vw)] 3xl:py-[40px]">
          @{{ new Date().getFullYear() }} Oneness Labs. All rights reserved.
        </div>
      </div>
    </div>
    <div class="w-[26vw] max-md:w-[100%] md:min-w-[400px] md:max-w-[500px] sm:h-[100vh]
    py-0 md:py-[calc(32/1920*100vw)] 3xl:py-[32px]">
      <UserInfo></UserInfo>
    </div>
  </div>

  <!--展示增加积分的特定nft范围-->
  <nft-token-list-popup></nft-token-list-popup>
</template>

<script setup>
import {computed, inject, onMounted, watch} from "vue";
import pinia, {useHomeStore, useWeb3Store} from "@/stores/index.js";

import Banner from './components/v2/Banner/index.vue'
import UserInfo from "./components/v2/UserInfo/index.vue"

import TaskList from "./components/Task/index.vue";
import NftTokenListPopup from "./components/v2/NftTokenListPopup/index.vue";
import FriendsTask from "@/views/Home/components/FriendsTask/index.vue";
import {customNotification} from "@/packages/customNotification/index.js"
import {hideLoading, showLoading} from "@/components/showLoading/index.js";

const web3Store = useWeb3Store(pinia);
const homeStore = useHomeStore(pinia);
const $httpApi = inject('$httpApi');
const baseTaskCategoryIcon = new URL("@/views/Home/components/Task/img/icon-task-base.png", import.meta.url).href;
const twitterTaskCategoryIcon = {
  nft: new URL("@/views/Home/components/Task/img/icon-task-asset.png", import.meta.url).href,
  twitter: new URL("@/views/Home/components/Task/img/icon-task-twitter.png", import.meta.url).href
}
const twitterTaskCategoryName = {
  nft: "Asset tasks",
  twitter: "TWITTER TASKS"
}

// 检测是否有需要展示的消息
const checkSessionToastMsg = () => {
  const type = sessionStorage.getItem('auth_callback_type');
  const message = sessionStorage.getItem('auth_callback_message');
  sessionStorage.removeItem('auth_callback_type');
  sessionStorage.removeItem('auth_callback_message');
  if (type && message) {
    customNotification({
      message,
      type,
    });
  }
}

onMounted(() => {
  showLoading();
  homeStore.initData().finally(() => {
    hideLoading();
  });
  checkSessionToastMsg();
});

const loginComplete = computed(() => {
  return web3Store.loginComplete;
});

const v1SocialTask = computed(() => {
  // 遍历任务列表，把数据结果改成数组
  const taskList = homeStore.v1SocialTask;
  return Object.values(taskList).reduce((acc, val) => acc.concat(val), []);
});

watch(loginComplete, (val) => {
  if (val) {
    showLoading();
    homeStore.initData().finally(() => {
      hideLoading();
    })
  }
})
</script>

<style lang="less">
@import "./custom-notification.less";

body{
  background-image: url("./img/bg.png");
  background-position: calc(-150/750*100vw) top;
  background-size: 150% calc(500/750*100vw);
  background-repeat: no-repeat;
  overflow-y: scroll;
}

.home-left-container{
  overflow: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

@screen sm{
  body{
    background-image: url("./img/bg.png");
    background-position: right top;
    background-size: 100% auto;
    background-repeat: no-repeat;
    overflow-y: hidden;
  }
}
</style>
