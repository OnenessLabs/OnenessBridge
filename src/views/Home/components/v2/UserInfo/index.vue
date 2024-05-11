<script setup>
  import Nft from "./nft.vue";
  import Vue3Autocounter from 'vue3-autocounter';
  import UserWalletPopup from "@/views/Home/components/v2/UserInfo/user-wallet-popup.vue";
  import PcLeaderboard from "@/views/Home/components/v2/UserInfo/pc-leaderboard.vue";
  import MobileLeaderboard from "@/views/Home/components/v2/UserInfo/mobile-leaderboard.vue";
  import PointsDetailPopup from "@/views/Home/components/v2/UserInfo/points-detail-popup/index.vue";
  import InviteCodePopup from "@/components/InviteCodePopup/index.vue";
  import { useAccountInfo } from "@/views/Home/components/v2/UserInfo/useAccountInfo.js";

  const {
    myRank,
    web3Store,
    mobileLeaderboardRef,
    handleItemClick,
    pointsDetailPopupRef,
    userWalletPopupRef,
    handleOpenWallet,
    homeStore,
  } = useAccountInfo();
</script>

<template>
  <div class="bg-color rounded-[1.66vw] text-[#ffffff]
max-sm:fixed max-sm:w-[100%] max-sm:bottom-0 max-sm:pb-[1vw] max-sm:bg-[#151515] max-sm:rounded-[4.26vw]
sm:h-[100%] sm:flex sm:flex-col
">
    <div class="pt-[2.08vw] 3xl:pt-[40px] max-sm:pt-[5.33vw] px-[2.08vw] 3xl:px-[40px] max-sm:px-[5.33vw]">
      <div class="flex items-center">
        <div style="background-color: rgba(255,255,255, 10%);"
             class="relative cursor-pointer rounded-[100%] w-[4.16vw] h-[4.16vw] 3xl:w-[80px] 3xl:h-[80px] max-sm:w-[10.66vw] max-sm:h-[10.66vw]
p-[0.93vw] 3xl:p-[18px] max-sm:p-[2.4vw]"
             v-connect-wallet="() => handleOpenWallet()"
        >
          <div
              v-if="homeStore.v1PointMy.nftCount > 0"
              class="absolute w-[calc(36/750*100vw)] sm:w-[calc(36/1920*100vw)] 3xl:w-[36px]
          left-[calc(-5/750*100vw)] top-[calc(-5/750*100vw)] sm:left-[calc(-5/1920*100vw)] sm:top-[calc(-5/1920*100vw)] 3xl:left-[-5px] 3xl:top-[-5px]
">
            <nft></nft>
          </div>
          <img :src="web3Store.currentAvatar" alt="">
        </div>
        <div class="flex items-center cursor-pointer" v-connect-wallet="() => handleOpenWallet()">
          <p
              class="mx-[1.04vw] 3xl:mx-[20px] max-sm:mx-[2.66vw] text-[1.35vw] 3xl:text-[26px] max-sm:text-[3.46vw]">
            {{ web3Store.currentAccountFake || 'Connect Wallet' }}
          </p>
          <svg class="w-[0.83vw] h-[0.83vw] 3xl:w-[16px] 3xl:h-[16px] max-sm:w-[2.13vw] max-sm:h-[2.13vw]"
              width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.410704 0.327421C0.0852666 0.652858 0.0852666 1.1805 0.410704 1.50593L6.90478 8.00001L0.410704 14.4941C0.0852666 14.8195 0.0852666 15.3472 0.410704 15.6726C0.736141 15.998 1.26378 15.998 1.58921 15.6726L8.67255 8.58927C8.99799 8.26383 8.99799 7.73619 8.67255 7.41075L1.58921 0.327421C1.26378 0.00198426 0.736141 0.00198426 0.410704 0.327421Z" fill="white"/>
          </svg>
        </div>
      </div>

      <div class="flex text-center justify-between gap-5 py-[2.08vw] 3xl:py-[40px] max-sm:py-[5.33vw]">
        <div
            :class="{ 'item-pointer' : item.type === 'points' }"
            class="number-item flex items-center justify-start flex-col gap-1 w-[50%] rounded-[24px] max-sm:rounded-[3.2vw]
             py-[2.08vw] 3xl:py-[40px] max-sm:py-[4.33vw]"
              v-connect-wallet="() => handleItemClick(item.type)"
             v-for="(item, index) in myRank"
             :key="index"
        >
          <div class="flex items-center">
            <span class="font-[LemonMilk] text-[#aeaeae] text-[1.04vw] 2xl:text-[20px] max-xl:text-[20px] max-sm:text-[2.66vw]">
              {{ item.title }}
            </span>
            <div class="title-more w-[calc(10/750*100vw)] sm:w-[calc(10/1920*100vw)] 3xl:w-[10px] ml-[calc(8/750*100vw)] sm:ml-[calc(8/1920*100vw)] 3xl:ml-[8px]">
              <svg width="100%" height="100%" viewBox="0 0 10 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.6">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M1.61612 3.49112C1.12796 3.97927 1.12796 4.77073 1.61612 5.25888L6.35723 10L1.61612 14.7411C1.12796 15.2293 1.12796 16.0207 1.61612 16.5089C2.10427 16.997 2.89573 16.997 3.38388 16.5089L9.00888 10.8839C9.49704 10.3957 9.49704 9.60427 9.00888 9.11612L3.38388 3.49112C2.89573 3.00296 2.10427 3.00296 1.61612 3.49112Z" fill="white"/>
                </g>
              </svg>
            </div>
          </div>
          <p style="letter-spacing: 4px"
             :class="{ 'scale-75' : item.value.toString().length >= 7 }"
             class="font-[LemonMilk] text-[2.08vw] 2xl:text-[40px] max-xl:text-[40px] max-sm:text-[5.33vw]">
            <span v-if="homeStore.v1Invite.login_status !== 1">0</span>
            <vue3-autocounter v-else-if="!isNaN(item.value)" ref='counter' :startAmount='0' :endAmount='item.value' separator="" :duration="1">
            </vue3-autocounter>
            <span v-else>{{ item.value }}</span>
          </p>
          <p v-if="item.nft && item.nftTotalReward > 0" class="animated-pop-in text-[12px] 2xl:text-[16px]">
            NFT Bonus <span class="text-[#D6B635]">+{{ item.nftTotalReward }} ></span>
          </p>
        </div>
      </div>
    </div>

    <pc-leaderboard></pc-leaderboard>
  </div>

  <!--移动端排行榜弹窗-->
  <mobile-leaderboard ref="mobileLeaderboardRef"></mobile-leaderboard>

  <!--积分详情弹窗-->
  <points-detail-popup ref="pointsDetailPopupRef"></points-detail-popup>

  <!--已链接钱包后点击当前地址弹窗-->
  <user-wallet-popup ref="userWalletPopupRef"></user-wallet-popup>

  <!--填写邀请码-->
  <invite-code-popup></invite-code-popup>
</template>

<style lang="less" scoped>
@screen sm{
  .bg-color{
    background-image: linear-gradient(90deg, rgba(255, 255, 255, 10%) 10%, rgb(0,0,0, 10%));
  }
}

.number-item{
  background-color: rgba(255, 255, 255, 5%);
}
.item-pointer{
  cursor: pointer;
}
.item-pointer{
  transition: all 400ms;
  &:hover{
    b{
      opacity: 60%;
    }
    background-color: rgba(255, 255, 255, 15%);
  }
}


@screen sm{
  .number-item:last-child{
    .title-more{
      display: none;
    }
  }
}
</style>