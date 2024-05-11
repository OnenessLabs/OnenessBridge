<template>
  <ons-popup :visible="showPopup" @on-close="methods.handleClose" ref="leaderboardRef" title="Enter referral code">
    <div class="w-[100%] 3xl:text-[24px] md:text-[1.25vw] text-[3.2vw]">
      <p class="text-[calc(24/1920*100vw)] max-sm:text-[calc(24/750*100vw)] 3xl:text-[24px]
      mb-[calc(16/1920*100vw)] max-sm:mb-[calc(16/750*100vw)] 3xl:mb-[16px] text-[#FFFFFF] opacity-[60%]">
        referral link/code
      </p>
      <div
             :class="{ 'input-error' : data.error.show }"
             class="flex items-center justify-between bg-[#222222] rounded-[2.13vw] md:rounded-[0.83vw] 3xl:rounded-[16px]
 py-[3.73vw] px-[3.2vw] md:py-[1.45vw] md:px-[1.25vw] 3xl:py-[28px] 3xl:px-[24px] text-[#ffffff]
text-[24/1920*100vw] max-sm:text-[24/750*100vw] 3xl:text-[24px]
mb-[calc(8/1920*100vw)] max-sm:mb-[calc(8/750*100vw)] 3xl:mb-[8px]
">
        <span v-if="haveBindInvite">{{ homeStore.v1Invite.invite_info.code }}</span>
        <input v-else class="bg-transparent text-[#ffffff]" :disabled="haveBindInvite" v-model="data.code" @input="methods.handleInput" type="text">
      </div>

      <p v-if="haveBindInvite" class="text-[#FF0000]
text-[calc(18/1920*100vw)] max-sm:text-[calc(18/750*100vw)] 3xl:text-[18px]
">
        {{ data.error.have }}
      </p>

      <p v-if="data.error.show" class="text-[#FF0000]
text-[calc(18/1920*100vw)] max-sm:text-[calc(18/750*100vw)] 3xl:text-[18px]
">
        {{ data.error.text }}
      </p>

      <div class="flex items-center justify-center 3xl:mt-[24px] md:mt-[1.25vw] mt-[3.2vw]">
        <button
            :disabled="haveBindInvite"
            @click="methods.submitCode"
            class="bg-[#D6B635] text-[#000000]
         text-[calc(24/1920*100vw)] max-sm:text-[calc(24/750*100vw)] 3xl:text-[24px]
         px-[calc(12/1920*100vw)] max-sm:px-[calc(12/750*100vw)] 3xl:px-[12px]
         w-[calc(234/1920*100vw)] max-sm:w-[calc(234/750*100vw)] 3xl:w-[234px]
         h-[calc(58/1920*100vw)] max-sm:h-[calc(58/750*100vw)] 3xl:h-[58px]
         rounded-[calc(50/1920*100vw)] max-sm:rounded-[calc(50/750*100vw)] 3xl:rounded-[50px]
        ">
          Confirm
        </button>
      </div>
    </div>
  </ons-popup>
</template>

<script setup>
import { reactive, inject, computed } from "vue";
import { query } from "@/packages/utils/index.js"
import { showLoading, hideLoading } from "@/components/showLoading/index.js";
import pinia, { useInviteCodePopup, useHomeStore } from "@/stores/index.js";
import {customNotification} from "@/packages/customNotification/index.js";

const homeStore = useHomeStore(pinia);
const inviteCodePopupStore = useInviteCodePopup(pinia);
const $httpApi = inject("$httpApi");
const data = reactive({
  code: query("code") || "",
  error: {
    have: 'You have already bound the invitation code',
    text: 'Please enter the correct content',
    show: false,
  }
});

// 是否已经绑定邀请码
const haveBindInvite = computed(() => {
  return homeStore.v1Invite.invite_info.bind_status === 1;
});

// 只有登录后才能显示弹窗
const showPopup = computed(() => {
  const visible = inviteCodePopupStore.visible;
  const isLogin = homeStore.v1Invite.login_status === 1;
  return visible && isLogin;
})

const methods = {
  handleInput() {
    data.error.show = false;
  },
  handleOpen() {
    inviteCodePopupStore.openInviteCodePopup();
  },
  handleClose() {
    if (data.error.show) {
      data.code = query("code") || "";
    }
    data.error.show = false;
    inviteCodePopupStore.visible = false;
  },
  /**
   * 从字符串解析出邀请码
   * 1.如果字符串是一个url并且包含code参数，则解析出code
   * 2.否则直接直接返回该字符串
   */
  parseCodeFromString(str) {
    try {
      const url = new URL(str);
      const code = url.searchParams.get('code');
      return code ? code : null;
    } catch (error) {
      return str;
    }
  },
  submitCode() {
    window?.gtag('event', 'submit_invite_code_click', {});

    const parseCode = methods.parseCodeFromString(data.code);

    // 判断code是否为空 并且提示
    if (!parseCode) return data.error.show = true;

    showLoading();
    $httpApi.v1InviteBind(parseCode).then(res => {
      window?.gtag('event', 'submit_invite_code_success', {});
      if (res?.code === 0) {
        customNotification({
          message: res?.data?.tip,
          type: "success"
        });
        homeStore.v1Invite.invite_info.bind_status = 1;
        inviteCodePopupStore.visible = false;
        homeStore.getV1PointMy();
        homeStore.getV1Invite();
      } else {
        data.error.show = true;
        // if (res?.msg) {
        //   data.error.text = res.msg;
        // } else {
        //   data.error.text = 'Please enter correct content';
        // }
        homeStore.v1Invite.invite_info.code = parseCode;
        homeStore.getV1Invite();
      }
    }).finally(() => {
      hideLoading();
    });
  }
}
</script>

<style lang="less" scoped>
.input-error{
  border: 1px solid #FF3C3C;
  background-color: #372e30;
}
button:disabled{
  background: #cccccc;
  color: #666666;
  cursor: not-allowed;
}
</style>
