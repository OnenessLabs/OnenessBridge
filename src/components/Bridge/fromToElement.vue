<template>
  <div class="w-12 h-12 rounded-full overflow-hidden" v-if="props.type"><img src="@/assets/img/eth.png"/></div>
  <div class="w-12 h-12 rounded-full overflow-hidden" v-if="!props.type"><img src="@/assets/img/one.png"/></div>
  <div class="ml-2"><div class="text-xl font-bold">{{props.title}}</div>
  <div class="text-gray-400">{{props.type?'Ethereum':'Oneness'}}</div></div>
</template>
<script setup>
const props = defineProps({
  type: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: 'From'
  }
});
</script>