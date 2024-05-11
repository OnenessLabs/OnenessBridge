<template>
  <div class="leaderboard-list">
    <div class="leaderboard-scroll text-[#ffffff] text-[14px] 2xl:text-[16px] max-sm:text-[3.13vw]">
      <div class="flex justify-center items-center w-[100%] h-[100%]" v-if="data.list <= 0 && data.lastPage">No records</div>
      <table cellpadding="0" cellspacing="0" v-else>
        <thead>
        <tr>
          <th>name</th>
          <th>Time</th>
          <th>Points</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in data.list" :key="index">
          <td align="center" class="break-word">
            {{ item.invite_user.nickname || item.invite_user.addr }}
          </td>
          <td align="center">{{ dateFormat(item.completed_at, 'yyyy-MM-dd') }}</td>
          <td align="center">{{ item.point }}</td>
        </tr>
        <tr>
          <td colspan="4">
            <div class="w-[100%] flex items-center justify-center">
              <InfiniteLoading v-if="!data.lastPage" @infinite="load" />
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { addressFake } from "@/packages/utils/index.js"
import { dateFormat } from "@/packages/utils/dateFormat.js";
import {reactive, onMounted, inject} from "vue";

const $httpApi = inject('$httpApi');
const data = reactive({
  list: [],
  lastPage: false,
  loading: false,
  page: 0,
  pageSize: 30
})

onMounted(() => {
  data.page = 0;
  load();
});

const load = async () => {
  if (data.lastPage || data.loading) return;

  data.page++;
  data.loading = true;
  $httpApi.v1InviteMyLog(data.page, data.pageSize).then(res => {
    data.loading = false;
    const list = res?.data?.list || [];
    data.list.push(...list);
    if (list.length < data.pageSize) {
      data.lastPage = true;
    }
  });
}
</script>

<style lang="less" scoped>
.leaderboard-list {
  flex: 1;
  .leaderboard-scroll{
    overflow: scroll;
    width: 100%;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    //height: calc(100% - 1.6vw);
    height: 100%;
    margin: 0 auto;
    position: relative;
    table{
      position: absolute;
      width: 100%;
      thead tr:first-child th {
        font-weight: normal;
        position: sticky;
        top: 0;
        z-index: 1;
        padding: 1.73vw;
        background-color: #333333;
        color: #999999;
        &:first-child{
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        }
        &:last-child{
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        }
      }
      td{
        padding: 3.13vw 0 2.13vw 0;
      }
      td:nth-child(1) {
        width: 40%;
        text-align: center;
      }
    }
  }
}

@screen sm{
  .leaderboard-list {
    .leaderboard-scroll{
      table{
        thead tr:first-child th {
          padding: 0.67vw;
        }
        td{
          padding: 0.67vw;
        }
      }
    }
  }
}

@screen 3xl{
  .leaderboard-list {
    .leaderboard-scroll{
      table{
        thead tr:first-child th {
          padding: 13px;
        }
        td{
          padding: 13px;
        }
      }
    }
  }
}
</style>
