<template>
  <button>
    ones button component
  </button>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  text: String,
  onClick: Function,
})
</script>