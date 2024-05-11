<script setup>
import {defineProps} from "vue";

import Wrap from "./widgets/wrap.vue"
import Item from "./widgets/item.vue"

const props = defineProps({
  categoryIcon: {
    type: String,
    default: 'icon'
  },
  categoryName: {
    type: String,
    default: 'Tasks'
  },
  taskList: {
    type: Array,
    default: () => {
      return []
    }
  },
  taskType: {
    type: String,
    default: 'Once'
  }
});
</script>

<template>
    <Wrap :icon="categoryIcon" :title="props.categoryName">
      <template v-slot:item>
        <div class="flex flex-col"  v-for="(item, index) in taskList" :key="index">
          <Item class="mb-[calc(24/1920*100vw)] max-sm:mb-[calc(16/750*100vw)] 3xl:mb-[24px]"
                :key="`${item.id}-${index}`"
                :detail="item"
                :taskType="props.taskType"
          ></Item>
        </div>
    </template>
  </Wrap>
</template>