<template>
  <div class="switch-chain-dialog">
    <el-dialog
      v-model="localShow"
      :show-close="false"
      align-center
      @close="handleClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="switch-content">
        <el-scrollbar>
          <div class="switch-content__title">
            Current feature is only supported on {{ props.chain.chainName }} {{ props.chain.env }}
          </div>

          <div class="switch-content__warn">
            <span> Please switch your network to continue </span>
          </div>

          <div
            class="switch-content__btn switch-content__btn__switch cursor-pointer"
            @click="handleSwitchChain"
          >
            Switch Network
          </div>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, defineEmits, defineExpose, defineProps } from "vue";
import { ElDialog } from "element-plus";

const props = defineProps({
  chain: {
    type: Object,
    default: () => {
      return {
      }
    }
  },
});
const localShow = ref(false);
const emit = defineEmits(["onSwitchChain", "onDisconnect"]);

const handleOpen = () => {
  localShow.value = true;
};

const handleClose = () => {
  localShow.value = false;
};

const handleSwitchChain = () => {
  emit("onSwitchChain");
};

defineExpose({
  handleOpen,
  handleClose,
});
</script>

<style lang="less">
.switch-chain-dialog {
  .el-dialog {
    width: 470px;
    border-radius: 16px;
    background-color: #f2f2f2;
    &__header {
      margin-right: 0;
    }
    &__body {
      padding-top: 0;
    }
    .switch-header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 0 2px;
      h1 {
        font-size: 22px;
        font-weight: 600;
        margin: 5px 0;
      }
      img {
        height: 22px;
      }
    }

    .switch-content {
      font-size: 13px;
      font-weight: 600;
      color: #000;
      padding: 0 2px;
      text-align: center;
      &__title {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        color: #111111;
        text-align: left;
      }
      &__warn {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f8eee3;
        border: 1px solid #ff0000;
        border-radius: 8px;
        padding: 10px 15px;
        font-weight: 600;
        font-size: 16px;
        color: #ff0000;
        margin-top: 20px;
      }
      &__btn {
        cursor: pointer;
        border-radius: 8px;
        padding: 19px 0;
        font-weight: 800;
        font-size: 24px;
        margin-top: 16px;
      }
      &__btn__switch {
        color: #ffffff;
        background: #333;
      }
    }
  }
}
</style>
