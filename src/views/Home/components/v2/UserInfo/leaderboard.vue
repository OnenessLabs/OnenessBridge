<template>
  <div :class="{ 'leaderboard-list-scroll' : data.list.length > 0 }"
       class="relative leaderboard-list leaderboard-list-mobile text-[#ffffff] text-[14px] 2xl:text-[16px] max-sm:text-[3.13vw]">
    <table style="width: 100%; height: 100%" cellpadding="0" cellspacing="0"  v-if="data.list.length <= 0 && data.lastPage && !data.loading">
      <thead>
      <tr>
        <th>Rank</th>
        <th>User</th>
        <th>Points</th>
        <th>REFERRALS</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td colspan="4">
          UTC+0 02:00 will update the leaderboard.
        </td>
      </tr>
      </tbody>
    </table>

    <table cellpadding="0" cellspacing="0" v-else>
      <thead>
      <tr>
        <th>Rank</th>
        <th>User</th>
        <th>Points</th>
        <th>REFERRALS</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in data.list" :key="index">
        <td align="center">
          <div class="flex items-center justify-center" v-if="index === 0">
            <img src="./img/icon-1.png" alt="">
          </div>
          <div class="flex items-center justify-center" v-else-if="index === 1">
            <img src="./img/icon-2.png" alt="">
          </div>
          <div class="flex items-center justify-center" v-else-if="index === 2">
            <img src="./img/icon-3.png" alt="">
          </div>
          <div v-else>{{ index + 1 }}</div>
        </td>
        <td class="break-all">{{ item.nickname || addressFake(item.addr) }}</td>
        <td>{{ item.points }}</td>
        <td align="center">{{ item.inviteNum }}</td>
      </tr>
      </tbody>
    </table>


  <div class="w-[100%] flex items-center justify-center py-[2vw]" v-if="props.scrollTarget === 'pc' && !data.lastPage">
    <InfiniteLoading target=".leaderboard-list" :distance="300" @infinite="load" />
  </div>

  <div class="w-[100%] flex items-center justify-center py-[2vw]" v-if="props.scrollTarget === 'mobile' && !data.lastPage">
    <InfiniteLoading :distance="100" @infinite="load" />
  </div>

  </div>
</template>

<script setup>
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { addressFake } from "@/packages/utils/index.js"
import {reactive, defineProps, inject} from "vue";

const $httpApi = inject('$httpApi');
const props = defineProps({
  scrollTarget: {
    type: String,
    default: 'pc'
  }
})
const data = reactive({
  list: [],
  lastPage: false,
  loading: false,
  page: 0,
  pageSize: 30
})

const load = async () => {
  if (data.lastPage || data.loading) return;

  data.page++;
  data.loading = true;
  $httpApi.v1PointRank(data.page, data.pageSize).then(res => {
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
  width: 100%;
  height: 100%;
  margin: 0 auto;
  table{
    width: 100%;
    thead tr:first-child th {
      font-weight: normal;
      position: sticky;
      top: 0;
      z-index: 1;
      padding: 6px 8px;
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
      img{
        height: 4.8vw;
      }
    }
    td:first-child {
      text-align: center;
      white-space: nowrap;
    }
    td:nth-child(2),
    td:nth-child(3) {
      width: 70%;
      text-align: center;
    }
  }
}

.leaderboard-list-scroll{
  overflow: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}

@screen sm{
  .leaderboard-list {
    table{
      thead tr:first-child th {
        padding: 10px;
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
        padding: 15px 0;
        img{
          height: auto;
        }
      }
    }
  }
}
</style>
