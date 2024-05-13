<template>
  <div class="flex items-center">
    <div class="flex">
      <fromToElement :type="isFrom"/>
    </div>
    <div class="px-6">
      <img class="w-[calc(24/750*100vw)] sm:w-[calc(24/1920*100vw)] 3xl:w-[24px]" src="@/assets/img/icon-inviter-r.png" alt="">
    </div>
    <div class="flex">
      <fromToElement :type="!isFrom" title="to"/>
    </div>
  </div>
</template>
<script setup>
import { defineProps, computed } from "vue"
import fromToElement from "./fromToElement.vue"
const props = defineProps({
  type: {
    type: String,
    default: 'deposit'
  },
});
let isFrom = computed(() => props.type==='deposit')
</script>