<script setup>
import { defineProps } from "vue";

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  activated: {
    type: Boolean,
    default: false
  },
});
</script>

<template>
  <button :disabled="props.disabled"
          :class="{ 'activated' : props.activated }"
          class="btn bg-[#D6B635] text-[#000000]
              text-[calc(24/1920*100vw)] max-sm:text-[calc(24/750*100vw)] 3xl:text-[24px]
              rounded-[calc(50/1920*100vw)] max-sm:rounded-[calc(50/750*100vw)] 3xl:rounded-[50px]
              px-[10px]
              h-[calc(58/1920*100vw)] max-sm:h-[calc(52/750*100vw)] 3xl:h-[58px]
">
    <slot></slot>
  </button>
</template>

<style lang="less" scoped>
.btn:disabled{
  color: #999999;
  cursor: not-allowed;
  background-color: #666666;
}
.activated{
  background: none;
  color: #D6B635;
  border: 1px solid #D6B635;
}
</style>
