<script setup>
  import { reactive, defineExpose } from "vue";
  import TaskPoint from "./task-point.vue"
  import InvitePoints from "./invite-points.vue";
  import IconClose from "@/packages/ons-ui/ons-popup/icon-close.vue";

  const data = reactive({
    visible: false,
    list: [],
    activeIndex: 0
  })

  const methods = {
    handleIndex(index = 0) {
      data.activeIndex = index;
    },
    handleClose() {
      data.visible = false;
    },
    handleOpen(index = 0) {
      methods.handleIndex(index);
      data.visible = true;
    }
  };

  defineExpose({
    handleOpen: methods.handleOpen,
    handleClose: methods.handleClose
  });
</script>

<template>
  <ons-popup :visible="data.visible" @on-close="methods.handleClose" ref="leaderboardRef" title="Leaderboard">
    <template v-slot:header>
      <div class="points-detail-header flex items-center justify-between">
        <span class="flex items-center">
          <b @click="methods.handleIndex(0)" :class="{'active' : data.activeIndex === 0}">Task Points</b>
          <b @click="methods.handleIndex(1)" :class="{'active' : data.activeIndex === 1}">Invitation Points</b>
        </span>
        <div class="icon-close">
          <icon-close @click="methods.handleClose"></icon-close>
        </div>
      </div>
    </template>
    <div class="flex flex-col flex-1 w-[100%] h-[50vh] md:h-[480px] max-h-[500px]">
      <task-point v-if="data.visible && data.activeIndex === 0"></task-point>
      <invite-points v-if="data.visible && data.activeIndex === 1"></invite-points>
    </div>
  </ons-popup>
</template>

<style lang="less" scoped>
  .points-detail-header{
    span{
      gap: 3.2vw;
      b{
        font-weight: normal;
        font-size: calc(28/750*100vw);
        opacity: 60%;
      }
      b.active{
        font-weight: bold;
        opacity: 100%;
      }
    }
  }

  @screen md{
    .points-detail-header{
      span{
        gap: 24px;
        b{
          font-size: calc(28/1920*100vw)
        }
      }
    }
  }

  @screen 3xl{
    .points-detail-header{
      span{
        gap: 24px;
        b{
          font-size: 28px;
        }
      }
    }
  }
</style>