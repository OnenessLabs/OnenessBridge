<script setup>
import { defineProps } from "vue";
import pinia, { useHomeStore } from "@/stores/index.js";

const props = defineProps({
  text: {
    type: String,
    default: ""
  },
  action: {
    type: String,
    default: ""
  }
});

const homeStore = useHomeStore(pinia);

const methods = {
  handleClick() {
    if (props.action === 'nft_token_popup') return homeStore.popup.showNftList = true;
  }
}
</script>

<template>
  <span
      @click="methods.handleClick"
      class="cursor-pointer text-[#D6B635] text-[calc(26/1920*100vw)] max-sm:text-[calc(26/750*100vw)] 3xl:text-[26px]
   ml-[calc(10/750*100vw)] md:ml-[calc(10/1920*100vw)] 3xl:ml-[10px]">
    {{ props.text }}<img class="inline-block w-[calc(24/750*100vw)] sm:w-[calc(24/1920*100vw)] 3xl:w-[24px]" src="../img/icon-inviter-r.png" alt="">
  </span>
</template>