<script setup>
import { useAction } from "../useAction.js";
import {defineProps} from "vue";
import TitleBtn from "./titleBtn.vue";
import TaskBtn from "./taskBtn.vue";
import Btn from "@/views/Home/components/v2/btn/index.vue";
import refreshWrap from "./refreshWrap.vue";

const props = defineProps({
  detail: {
    type: Object,
    default: () => {
      return {
        loading: false
      };
    }
  },
  taskType: {
    type: String,
    default: 'Once'
  }
});

const {
  web3Store,
  data,
  isShowRefresh,
  methods,
  taskFinish
} = useAction(props);
</script>
<template>
  <div
    :class="{ 'items-center task-hide-point' : props.detail?.extra?.hide_points === 1 }"
    class="task-item flex relative justify-between bg-[#222222]
rounded-[calc(24/1920*100vw)] max-sm:rounded-[calc(20/750*100vw)] 3xl:rounded-[24]
px-[calc(32/1920*100vw)] max-sm:px-[calc(24/750*100vw)] 3xl:px-[32px]
pt-[calc(48/750*100vw)] sm:pt-[calc(48/1920*100vw)] 3xl:pt-[48px]
pb-[calc(20/750*100vw)] sm:pb-[calc(24/1920*100vw)] 3xl:pb-[24px]
">
    <div class="flex-1">
      <div>
        <span class="item-type-tag text-[calc(22/1920*100vw)] max-sm:text-[calc(22/750*100vw)] 3xl:text-[22px]
         absolute top-0 left-0"
        >{{ props.detail.tag || props.taskType }}</span>
        <span class="text-[calc(24/1920*100vw)] max-sm:text-[calc(24/750*100vw)] 3xl:text-[24px]"
        >{{ props.detail.title }}</span>
        <title-btn v-if="props.detail.title_button_text"
                   :text="props.detail.title_button_text"
                   :action="props.detail.title_button_action"
        >
        </title-btn>
      </div>
      <p
        v-if="props.detail?.extra?.hide_points !== 1"
        class="text-[#D6B635] font-[LemonMilk]
        text-[calc(28/1920*100vw)] 3xl:text-[28px] max-sm:text-[calc(28/750*100vw)]
         mt-[calc(10/1920*100vw)] max-sm:mt-[calc(8/750*100vw)] 3xl:mt-[10px]">
        {{ props.detail.point }} POINTS
      </p>
    </div>
    <div class="flex max-sm:items-center mt-[3px]">
      <slot name="right"></slot>
      <template v-if="!$slots.right">

        <!--未登录的按钮-->
        <template v-if="!web3Store.currentAccount">
          <btn v-connect-wallet
               class="animated-pop-in min-w-[calc(207/1920*100vw)] max-sm:min-w-[calc(199/750*100vw)] 3xl:min-w-[207px]">
            Connect
          </btn>
        </template>

        <!--激活类型任务按钮-->
        <template v-else-if="props.detail.extra.need_enabled === 1">
          <task-btn
            v-if="taskFinish"
            text="Activated"
            :task-finish="false"
            :activated="true"
            @click="methods.clipboardContent()"
          >
          </task-btn>

          <task-btn
            v-else
            :text="props.detail.buttonText"
            :task-finish="taskFinish"
            @click="methods.doTask()"
          >
          </task-btn>

          <refresh-wrap />
        </template>

        <!--已完成的按钮-->
        <template v-else-if="taskFinish">
          <img class="animated-pop-in h-[calc(48/750*100vw)] sm:h-[calc(48/1920*100vw)] 3xl:h-[48px]"
               src="../img/icon-task-complete.png" alt="">
        </template>

        <!--常规任务按钮-->
        <template v-else>
          <task-btn
            v-if="props.detail.buttonText"
            :text="props.detail.buttonText"
            :task-finish="taskFinish"
            @click="methods.doTask()"
          >
          </task-btn>

          <task-btn
            v-if="isShowRefresh === 2"
            :text="props.detail.extra.check_button_text"
            :task-finish="taskFinish"
            @click="methods.refreshTask(true)"
          >
          </task-btn>

          <refresh-wrap>
            <template v-slot:body>
              <img v-if="isShowRefresh === 1" @click="methods.refreshTask(false)" :class="{'rotate-center' : data.refreshLoading }" class="animated-pop-in cursor-pointer"
                   src="../img/icon-task-refresh.png" alt="">
            </template>
          </refresh-wrap>
        </template>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>

.task-item{
  position: relative;
  z-index: 0;
  overflow: hidden;
  box-shadow: inset 1px 1px 2px #333333;
  transition: all 300ms ease-in-out;
  &:hover{
    background: rgba(255,255,255,0.1);
  }
}

.item-type-tag{
  color: #D6B635;
  border-radius: calc(6/720*100vw);
  padding: calc(4/750*100vw) calc(20/750*100vw);
  border-bottom-right-radius: 6px;
  background-color: rgba(255,255,255, 0.1)
}

.task-hide-point{
  min-height: calc(160/750*100vw);
}

@screen sm{
  .item-type-tag{
    border-radius: calc(6/1920*100vw);
    padding: calc(4/1920*100vw) calc(24/1920*100vw);
    border-bottom-right-radius: calc(16/1920*100vw);
    margin-right: calc(16/1920*100vw);
  }
  .task-hide-point{
    min-height: calc(160/1920*100vw);
  }
}

@screen 3xl{
  .item-type-tag{
    border-radius:6px;
    padding: 4px 24px;
    border-bottom-right-radius: 16px;
    margin-right: 16px;
  }
  .task-hide-point{
    min-height: 160px;
  }
}
</style>
