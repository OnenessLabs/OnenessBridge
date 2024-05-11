<template>
  <div class="bg-[#151515] text-[#ffffff]
  rounded-[calc(32/1920*100vw)] max-sm:rounded-[calc(32/750*100vw)] 3xl:rounded-[32px]
  py-[calc(32/1920*100vw)] max-sm:py-[calc(32/750*100vw)] 3xl:py-[32px]
  px-[calc(40/1920*100vw)] max-sm:px-[calc(24/750*100vw)] 3xl:px-[40px]
  pb-[calc(14/1920*100vw)] max-sm:pb-[calc(14/750*100vw)] 3xl:pb-[14px]
">
    <div class="flex items-center
mb-[calc(24/1920*100vw)] max-sm:mb-[calc(24/750*100vw)] 3xl:mb-[24px]
">
      <img class="w-[calc(64/1920*100vw)] max-sm:w-[calc(48/750*100vw)] 3xl:w-[64px]
      mr-[calc(16/1920*100vw)] max-sm:mr-[calc(16/750*100vw)] 3xl:mr-[16px]" :src="icon" alt="">
      <span class="font-[LemonMilk] text-[calc(36/1920*100vw)] max-sm:text-[calc(32/720*100vw)] 3xl:text-[36px]">
        {{ props.title }}
      </span>
    </div>
    <slot name="item"></slot>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "Basic Tasks"
  },
  icon: {
    type: String,
    default: "icon"
  }
})

</script>