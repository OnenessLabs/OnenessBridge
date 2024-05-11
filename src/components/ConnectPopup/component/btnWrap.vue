<template>
  <div class="flex flex-col text-center">
    <button :disabled="props.disabled" class="flex items-center justify-between">
      <span class="flex items-center gap-2">
        <slot name="icon"></slot>
        <b>{{ props.name }}</b>
      </span>
      <slot name="right"></slot>
      <svg v-if="!$slots.right" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1751 3.25821C12.7195 3.71382 12.7195 4.45252 13.1751 4.90813L22.2668 13.9998L13.1751 23.0915C12.7195 23.5472 12.7195 24.2859 13.1751 24.7415C13.6307 25.1971 14.3694 25.1971 14.825 24.7415L24.7417 14.8248C25.1973 14.3692 25.1973 13.6305 24.7417 13.1749L14.825 3.25821C14.3694 2.8026 13.6307 2.8026 13.1751 3.25821Z" fill="white"/>
      </svg>
    </button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>
