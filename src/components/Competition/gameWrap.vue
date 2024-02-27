<template>
  <div>
    <van-pull-refresh
      :head-height="80"
      v-model="refreshing"
      @refresh="onRefresh"
      loading-text=""
    >
      <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
      <template #pulling="props">
        <!-- <img
          class="doge"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/doge.png"
          :style="{ transform: `scale(${props.distance / 80})` }"
        /> -->
        <!-- <span>用力拉</span> -->
      </template>

      <!-- 释放提示 -->
      <template #loosing>
        <div class="flex flex-col justify-center items-center">
          <div class="w-[28px] h-[28px]">
            <img class="w-[28px] h-[28px]" :src="iconLoading" />
          </div>
          <span class="mt-[-10px]">下拉刷新内容</span>
        </div>
      </template>

      <!-- 加载提示 -->
      <template #loading>
        <div class="flex flex-col justify-center items-center">
          <div class="w-[28px] h-[28px]">
            <img class="w-[28px] h-[28px]" :src="iconLoading" />
          </div>
          <span class="mt-[-10px]">玩命加载中...</span>
        </div>
      </template>

      <van-list
        v-model:loading="loading"
        :finished="finished"
        :finished-text="finishedText"
        v-model:error="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
        offset="0"
      >
        <div class="min-h-[175px]">
          <div
            class="bg-[#fff] px-[12px] rounded-t-[20px] pb-[12px] mt-[14px]"
            v-if="topArrayData.length"
          >
            <TitleText title="置顶赛事" />
            <div
              class="card-box"
              v-for="(item, index) in topArrayData"
              :key="index"
            >
              <GameItem
                :gameItem="item"
                @matchObjects="matchObjects"
                @refreshTopData="refreshTopData"
                dataOrgin="topKey"
              />
            </div>
          </div>

          <!-- 列表 -->
          <div v-for="(timeEl, key) in timeObjData" :key="key">
            <div
              class="bg-[#fff] px-[12px] rounded-t-[20px] pb-[12px] mt-[10px]"
              v-if="timeEl.length"
            >
              <TitleText :title="key" />

              <div v-for="(item, index) in timeEl" :key="index">
                <van-cell class="card-box mb-[10px]">
                  <GameItem
                    :gameItem="item"
                    @matchObjects="matchObjects"
                    :dataOrgin="key"
                  />
                </van-cell>
              </div>
            </div>
          </div>
        </div>
      </van-list>

      <van-empty
        v-if="isEmpty"
        :image="bgEmpty"
        image-size="134"
        description="暂无赛事"
        class=""
      />
    </van-pull-refresh>
  </div>
</template>

<script setup>
import { reactive, ref, toRefs, getCurrentInstance, triggerRef } from "vue";

import GameItem from "@/components/Competition/gameItem.vue";
import TitleText from "@/components/TitleText/index.vue";
import bgEmpty from "../../assets/bg-empty.png";
import iconLoading from "../../assets/icon-loading.gif";

import { getMatchList } from "@/api/game";

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const { proxy } = getCurrentInstance();

const list = ref([]);
const copyList = ref([]); //取消置顶恢复数据用

const error = ref(false);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false); // 下拉刷新
const finishedText = ref("没有更多了");

const isEmpty = ref(false);

// const bgEmpty = import("../../assets/bg-empty.png");

// 固定的类型
const typedata = {
  "/home": 0,
  "/basketball": 2,
  "/football": 1,
  "/competition-results": -1
};

const data = reactive({
  queryParams: {
    page: 0,
    limit: 10,
    type: "",
    competitionID: ""
  },
  timeObjData: {}, //日期数据

  topDataID: [], //置顶数据id
  topArrayData: []
});
const { queryParams, timeObjData, topDataID, topArrayData } = toRefs(data);

queryParams.value.type = typedata[route.path];

// 加载更多
const onLoad = () => {
  if (finished.value) return;
  queryParams.value.page++;

  loading.value = true;
  onGetMatchList();
};

// 下拉刷新
const onRefresh = () => {
  finished.value = false;
  queryParams.value.page = 0;

  list.value = [];
  timeObjData.value = {};
  topArrayData.value = [];

  isEmpty.value = false;
  loading.value = false;

  setTimeout(() => {
    if (refreshing.value) {
      refreshing.value = false;

      onLoad();
    }
  }, 500);
};

// const onLoad = () => {
//   setTimeout(() => {
//     if (refreshing.value) {
//       list.value = [];
//       refreshing.value = false;
//     }

//     for (let i = 0; i < 10; i++) {
//       list.value.push(list.value.length + 1);
//     }
//     loading.value = false;

//     if (list.value.length >= 40) {
//       finished.value = true;
//     }
//   }, 1000);
// };

// const onRefresh = () => {
//   // 清空列表数据
//   finished.value = false;

//   // 重新加载数据
//   // 将 loading 设置为 true，表示处于加载状态
//   loading.value = true;
//   onLoad();
// };

// 列表数据
const onGetMatchList = async () => {
  let params = {
    ...queryParams.value
  };

  const { data, code } = await getMatchList(params);
  loading.value = false;
  if (code !== 200) return;

  // 第一页没有数据
  if (queryParams.value.page === 1 && !data.records) {
    finishedText.value = "";
    finished.value = true;
    isEmpty.value = true;
    return;
  }

  // 是否没有更多了
  if (!data.records) {
    finished.value = true;
    return;
  }

  //判断是否是用户置顶的数据
  // data.records[1].topStatus = 1; // TODO: 模拟系统置顶
  let isUserData = isUserTopDate(data.records);

  list.value.push(...data.records);
  copyList.value = JSON.parse(JSON.stringify(list.value));

  onTimeDis(data.records);

  // 是否没有更多了
  if (!data.records || data.records.length < queryParams.value.limit) {
    finished.value = true;
    return;
  }
};

// 处理日期数据
const onTimeDis = data => {
  data.map((item, index) => {
    item.time_md =
      proxy.parseTime(item.matchTime, "{m}-{d}") +
      " 周" +
      proxy.parseTime(item.matchTime, "{a}");

    if (!timeObjData.value[item.time_md]) {
      timeObjData.value[item.time_md] = [item];
    } else {
      timeObjData.value[item.time_md].push(item);
    }
  });

  return data;
};

// 是否是置顶数据
const isUserTopDate = datalist => {
  topDataID.value = proxy.$cache.session.getJSON("topData") || [];

  let odata = JSON.parse(JSON.stringify(datalist)); //处理置顶

  for (var i = 0; i < datalist.length; i++) {
    for (var j = 0; j < topDataID.value.length; j++) {
      if (datalist[i].id === topDataID.value[j]) {
        topArrayData.value.push(datalist[i]);
        odata.splice(i, 1);
      }
    }

    // 系统置顶
    if (datalist[i].topStatus) {
      console.log("laile111");

      topArrayData.value.unshift(datalist[i]);
      odata.splice(i, 1);
    }
  }
  return odata;
};

// 点击置顶数据处理
const matchObjects = (id, dataOrginKey) => {
  let elIndex = timeObjData.value[dataOrginKey].findIndex(
    item => item.id === id
  );

  topArrayData.value.push(timeObjData.value[dataOrginKey][elIndex]);

  timeObjData.value[dataOrginKey].splice(elIndex, 1);
};

//刷新置顶数据   取消置顶
const refreshTopData = () => {
  topArrayData.value = [];

  let resData = isUserTopDate(copyList.value);

  list.value = resData;

  timeObjData.value = {};
  onTimeDis(list.value);
};

// 刷新列表
const refreshListData = tabObj => {
  queryParams.value.type = tabObj.sportsType;
  queryParams.value.competitionID = tabObj.competitionID;

  refreshing.value = true;

  onRefresh();
};

defineExpose({ refreshListData });
</script>

<style lang="less" scoped>
.van-cell {
  padding: 0;
  line-height: 20px;
}
</style>

<style lang="less" scoped>
.van-cell {
  padding: 0;
  line-height: 20px;
}

.doge {
  width: 140px;
  height: 72px;
  margin-top: 8px;
  border-radius: 4px;
}
</style>
