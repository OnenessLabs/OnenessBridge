<template>
  <div>
    ons message component
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  text: String,
  onClick: Function,
})
</script>