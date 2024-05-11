<template>
  <ons-popup :visible="homeStore.popup.showNftList" @on-close="methods.handleClose" ref="leaderboardRef" title="One Spark NFT">
    <div class="w-[100%] flex flex-wrap py-[calc(10/750*100vw)] md:py-[calc(10/1920*100vw)] 3xl:py-[10px]
     gap-x-[calc(22/750*100vw)] md:gap-x-[calc(22/1920*100vw)] 3xl:gap-x-[22px]
     gap-y-[calc(30/750*100vw)] md:gap-y-[calc(30/1920*100vw)] 3xl:gap-y-[30px]">
      <div v-for="(item, index) in data.list" :key="index"
      class="text-[#ffffff] text-[14px] xl:text-[16px] 3xl:text-[18px]">
        {{ item }}
      </div>
    </div>
  </ons-popup>
</template>

<script setup>
import { reactive, defineExpose } from "vue";
import pinia, {useHomeStore} from "@/stores/index.js";

const homeStore = useHomeStore(pinia);
const data = reactive({
  list: [
    'NodeMonkes',
    'Runestone',
    'Bitcoin Puppets',
    'RSIC METAPROTOCOL',
    'Quantum Cats',
    'Bitcoin Frogs',
    'Pizza Ninjas',
    'bitDisc-Black(bitSmiley OG)',
    'Goosinals',
    'bitmap',
    'ORDI',
    'SATS',
    'RATS',
    'MMSS',
    'MICE',
    'BTCS',
    'ATOM',
    'QUARK',
    'SOPHON'
  ],
})

const methods = {
  handleClose() {
    homeStore.popup.showNftList = false;
  },
  handleOpen() {
    homeStore.popup.showNftList = true;
  }
};

defineExpose({
  handleOpen: methods.handleOpen,
  handleClose: methods.handleClose
});
</script>

<style lang="less">
</style>