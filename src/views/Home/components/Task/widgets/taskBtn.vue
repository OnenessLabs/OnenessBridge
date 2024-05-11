<script setup>
import { defineProps } from "vue";
import Btn from "@/views/Home/components/v2/btn/index.vue";

const props = defineProps({
  text: {
    type: String,
    default: ""
  },
  activated: {
    type: Boolean,
    default: false
  },
  taskFinish: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <btn
    :disabled="props.taskFinish"
    :activated="props.activated"
    class="animated-pop-in min-w-[calc(207/1920*100vw)] max-sm:min-w-[calc(199/750*100vw)] 3xl:min-w-[207px]"
  >
    {{ props.text}}
  </btn>
</template>
