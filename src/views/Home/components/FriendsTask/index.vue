<script setup>
import { computed, ref } from "vue";
import pinia, { useWeb3Store, useHomeStore } from "@/stores/index.js";
import { copyTextToClipboard } from "@/packages/utils/index.js";
import Wrap from "@/views/Home/components/Task/widgets/wrap.vue";
import Item from "@/views/Home/components/Task/widgets/item.vue";
import Btn from "@/views/Home/components/v2/btn/index.vue";
import PointsDetailPopup from "@/views/Home/components/v2/UserInfo/points-detail-popup/index.vue";
import { twitterTaskNotFinishNotification } from "@/views/Home/components/Task/useAction.js";

const homeStore = useHomeStore(pinia);
const web3Store = useWeb3Store(pinia);
const friendCategoryIcon = new URL("@/views/Home/components/FriendsTask/img/icon-inviter.png", import.meta.url).href;
const pointsDetailPopupRef = ref();
const friendTask = computed(() => {
  return {
    "point": homeStore.v1Invite.invite_info.bonus_points,
    "title": "Invite your friends",
    "buttonText": "Follow",
  }
})

const inviteInfo = computed(() => {
  if (!web3Store.currentAccount) return {
    code: "******",
    link: `${location.origin}${location.pathname}?code=******`,
    count: 0
  };
  return {
    ...homeStore.v1Invite.invite_info,
    link: homeStore.v1Invite.invite_info.link,
  }
});

const methods = {
  moreFriends() {
    pointsDetailPopupRef.value.handleOpen(1);
  },
  copyLink () {
    if(!homeStore.v1SocialTaskStatus.twitterFinish) return twitterTaskNotFinishNotification();
    window?.gtag('event', 'copy_link_click', {});
    copyTextToClipboard(inviteInfo.value.link);
  },
  copyCode () {
    if(!homeStore.v1SocialTaskStatus.twitterFinish) return twitterTaskNotFinishNotification();
    window?.gtag('event', 'copy_code_click', {});
    copyTextToClipboard(inviteInfo.value.code);
  }
}

</script>

<template>
  <Wrap :icon="friendCategoryIcon" title="REFER FRIENDS TASK">
    <template v-slot:item>
      <p class="text-[#ffffff] opacity-60
ml-[calc(80/1920*100vw)] max-sm:ml-[calc(62/750*100vw)] 3xl:ml-[80px]
text-[calc(20/1920*100vw)] max-sm:text-[12px] 3xl:text-[20px]
mt-[calc(-20/1920*100vw)]
">
        Invited users need to complete basic tasks and calculate assets. After completion, points will be automatically added to your account.
      </p>

      <Item class="my-[calc(24/1920*100vw)] max-sm:my-[calc(16/750*100vw)] 3xl:my-[24px]"
            :detail="friendTask"
            taskType="Series"
      >
        <template v-slot:right>
          <div class="flex flex-col items-end text-[calc(24/1920*100vw)] max-sm:text-[calc(24/750*100vw)] 3xl:text-[24px]">
            <div class="text-[#ffffff] opacity-60">You have invited</div>
            <div
                v-connect-wallet="() => methods.moreFriends()"
                class="cursor-pointer flex items-center text-[#D6B635] text-[calc(26/1920*100vw)] max-sm:text-[calc(26/750*100vw)] 3xl:text-[26px]">
              <span>
                <b :class="{'class' : inviteInfo.count > 0 }" >{{ inviteInfo.count }}</b>
                Friends</span>
              <img class="w-[calc(24/750*100vw)] sm:w-[calc(24/1920*100vw)] 3xl:w-[24px]" src="./img/icon-inviter-r.png" alt="">
            </div>
          </div>
        </template>
      </Item>

      <div class="invite-link text-[#ffffff] p-[calc(32/1920*100vw)] max-sm:p-[calc(24/750*100vw)] 3xl:p-[32px;]
      rounded-[calc(32/1920*100vw)] max-sm:rounded-[calc(24/750*100vw)] 3xl:rounded-[32px;]
      text-[calc(24/1920*100vw)] max-sm:text-[calc(24/750*100vw)] 3xl:text-[24px]
">
        <div class="">Your link and code</div>
        <div class="invite-link__item">
          <div class="flex items-center">
            <span>Link:</span>
            <i class="max-sm:w-[calc(250/750*100vw)] text-[calc(22/1920*100vw)] max-sm:text-[calc(22/750*100vw)] 3xl:text-[22px]">
              {{ inviteInfo.link }}
            </i>
          </div>
          <btn class="min-w-[calc(148/1920*100vw)] max-sm:min-w-[calc(140/750*100vw)] 3xl:min-w-[148px]
          mr-0 sm:mr-[calc(40/1920*100vw)] 3xl:mr-[40px]"
               v-connect-wallet="() => methods.copyLink()">
            Copy
          </btn>
        </div>
        <div class="invite-link__item">
         <div>
           <span>Code:</span>
           <i class="text-[calc(26/1920*100vw)] max-sm:text-[calc(26/750*100vw)] 3xl:text-[26px]">
             {{ inviteInfo.code }}
           </i>
         </div>
          <btn class="min-w-[calc(148/1920*100vw)] max-sm:min-w-[calc(140/750*100vw)] 3xl:min-w-[148px]
          mr-0 sm:mr-[calc(40/1920*100vw)] 3xl:mr-[40px]"
               v-connect-wallet="() => methods.copyCode()">
            Copy
          </btn>
        </div>
      </div>
    </template>
  </Wrap>

  <!--积分详情弹窗-->
  <points-detail-popup ref="pointsDetailPopupRef"></points-detail-popup>
</template>

<style lang="less" scoped>
.invite-link{
  border: 1px solid rgba(254, 243, 166, 0.15);
  &__item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: calc(24/750*100vw);
    background-color: #222222;
    height: calc(84/750*100vw);
    padding: 0 calc(24/750*100vw);
    border-radius: calc(24/750*100vw);
    span{
      margin-right: calc(20/750*100vw);
    }
    i{
      opacity: 50%;
      font-style: normal;
      word-break: break-all;
    }
  }

  @screen sm{
    .invite-link__item{
      height: calc(90/1920*100vw);
      padding: 0 calc(24/1920*100vw);
      margin-top: calc(24/1920*100vw);
      border-radius: calc(24/1920*100vw);
      span{
        margin-right: calc(20/1920*100vw);
      }
    }
  }

  @screen 3xl{
    .invite-link__item{
      height: 90px;
      padding: 0 24px;
      margin-top: 24px;
      border-radius: 24px;
      span{
        margin-right: 20px;
      }
    }
  }
}
</style>
