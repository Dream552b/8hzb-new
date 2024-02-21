<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell v-for="item in list" :key="item" :title="item" >  -->

        <div class="bg-[#fff] px-[12px] rounded-t-[20px] pb-[12px] mt-[14px]">
          <TitleText title="置顶赛事" />
          <div class="card-box" v-for="index in 2" :key="index">
            <GameItem />
          </div>
        </div>

        <div class="bg-[#fff] px-[12px] rounded-t-[20px] pb-[12px] mt-[10px]">
          <TitleText title="1月19日 周五" />
          <van-cell class="card-box" v-for="index in 8" :key="index">
            <GameItem />
          </van-cell>
        </div>
        <!-- </van-cell> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { ref } from "vue";

import GameItem from "@/components/Competition/gameItem.vue";
import TitleText from "@/components/TitleText/index.vue";

const list = ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = () => {
  setTimeout(() => {
    if (refreshing.value) {
      list.value = [];
      refreshing.value = false;
    }

    for (let i = 0; i < 10; i++) {
      list.value.push(list.value.length + 1);
    }
    loading.value = false;

    if (list.value.length >= 40) {
      finished.value = true;
    }
  }, 1000);
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};
</script>

<style lang="less" scoped>
.van-cell {
  padding: 0;
  line-height: 20px;
}
</style>
