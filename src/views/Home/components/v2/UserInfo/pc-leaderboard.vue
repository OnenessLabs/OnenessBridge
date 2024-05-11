<template>
  <div id="pc-leaderboard" class="max-sm:hidden sm:flex-1 sm:flex sm:flex-col sm:items-center relative">
    <div id="pc-leaderboard-title" class="flex items-center justify-center gap-4 mb-[1.25vw] 3xl:mb-[24px] max-sm:mb-[3.2vw]">
      <svg width="40" height="3" viewBox="0 0 40 3" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="40" y1="1.5" y2="1.5" stroke="url(#paint0_linear_92_250)" stroke-width="2"/>
        <defs>
          <linearGradient id="paint0_linear_92_250" x1="0" y1="0" x2="40" y2="0" gradientUnits="userSpaceOnUse">
            <stop stop-color="#D8BB47" stop-opacity="0"/>
            <stop offset="1" stop-color="#D8BB47"/>
          </linearGradient>
        </defs>
      </svg>
      <b class="2xl:text-[20px] max-sm:text-[2.66vw] uppercase">Leaderboard</b>
      <svg width="40" height="3" viewBox="0 0 40 3" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="1.5" x2="40" y2="1.5" stroke="url(#paint0_linear_92_252)" stroke-width="2"/>
        <defs>
          <linearGradient id="paint0_linear_92_252" x1="40" y1="3" x2="0" y2="3" gradientUnits="userSpaceOnUse">
            <stop stop-color="#D8BB47" stop-opacity="0"/>
            <stop offset="1" stop-color="#D8BB47"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
    <div class="w-[90%] absolute left-[5%] right-0 bottom-[15px]" :style="{ top: pcLeaderboardTop + 'px' }">
      <leaderboard scroll-target="pc"></leaderboard>
    </div>
  </div>
</template>

<script setup>
import leaderboard from "./leaderboard.vue";
import {nextTick, ref, onMounted} from "vue";

const pcLeaderboardTop = ref(0);

nextTick(() => {
  getLeaderboardTop();
});

onMounted(() => {
  window.addEventListener("resize", () => {
    clearTimeout(window.getLeaderboardTopTimer);
    window.getLeaderboardTopTimer = setTimeout(() => {
      getLeaderboardTop();
    }, 100);
  });
})

const getLeaderboardTop = () => {
  const pcLeaderboardTitle = document.getElementById("pc-leaderboard-title");
  const pcLeaderboardTitleMarginBottom = window.getComputedStyle(pcLeaderboardTitle).marginBottom;
  pcLeaderboardTop.value = pcLeaderboardTitle.offsetHeight + parseInt(pcLeaderboardTitleMarginBottom);
};
</script>
