<template>
  <ons-popup :visible="data.visible" @on-close="methods.handleClose" ref="leaderboardRef" title="Leaderboard">
    <div class="flex flex-col flex-1 w-[100%] h-[80vw] md:h-[450px]">
      <leaderboard scroll-target="mobile"></leaderboard>
    </div>
  </ons-popup>
</template>

<script setup>
import { reactive, defineExpose } from "vue";
import leaderboard from "./leaderboard.vue"

const data = reactive({
  visible: false,
  list: [],
})

const methods = {
  handleClose() {
    data.visible = false;
  },
  handleOpen() {
    data.visible = true;
  }
};

defineExpose({
  handleOpen: methods.handleOpen,
  handleClose: methods.handleClose
});
</script>

<style lang="less">
</style>