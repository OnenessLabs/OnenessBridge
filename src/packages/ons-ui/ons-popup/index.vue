<template>
  <el-dialog
      modal-class="ons-popup-modal"
      class="ons-popup"
      :append-to-body="true"
      :model-value="props.visible"
      :show-close="false"
      align-center
      @close="methods.handleClose()"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
  >
    <template #header>
      <slot name="header"></slot>
      <!--判断是否有slot-->
      <div v-if="!$slots.header" class="w-[100%] relative flex items-center justify-between">
        <span>{{ props.title }}</span>
        <div class="icon-close" @click="methods.handleClose()">
          <icon-close></icon-close>
        </div>
      </div>
    </template>

    <div class="container flex">
      <slot></slot>
    </div>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import {ElDialog} from "element-plus";
import IconClose from "@/packages/ons-ui/ons-popup/icon-close.vue";

const emits = defineEmits(['onClose']);
const props = defineProps({
  title: String,
  visible: {
    type: Boolean,
    default: false
  }
})
const methods = {
  handleClose() {
    emits('onClose');
  }
};
</script>

<style lang="less">
.ons-popup{
  width: calc(560 / 750 * 100vw);
  border-radius: 4.26vw;
  color: #ffffff;
  background-color: #151515;

  .el-dialog__header{
    padding: 3.2vw 4.8vw;
    margin: 0;
    font-size: 3.73vw;
    font-weight: bold;
    border-bottom: 1px solid #333333;
    .icon-close{
      cursor: pointer;
      width: 4.8vw;
      height: 4.8vw;
    }
  }

  .el-dialog__body{
    padding: 3.2vw 4.8vw;
  }
}

@screen md{
  .ons-popup{
    width: 26vw;
    min-width: 400px;
    max-width: 560px;
    border-radius: 1.66vw;
    .el-dialog{
      max-width: 500px;
      border-radius: 1.66rem;
    }
    .el-dialog__header{
      padding: 1.25vw 1.875vw;
      font-size: 1.51vw;
      border-bottom: 1px solid #333333;
      .icon-close{
        width: 1.875vw;
        height: 1.875vw;
      }
    }
    .el-dialog__body{
      padding: 1.25vw 1.875vw;
    }
  }
}

@screen 3xl{
  .ons-popup{
    .el-dialog{
      border-radius: 32px;
    }
    .el-dialog__header{
      padding: 24px 36px;
      font-size: 28px;
      border-bottom: 1px solid #333333;
      .icon-close{
        width: 36px;
        height: 36px;
      }
    }
    .el-dialog__body{
      padding: 24px 36px;
    }
  }
}
</style>