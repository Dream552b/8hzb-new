<template>
  <div class="gamewrap">
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
        class="listwrap"
      >
        <!-- class="min-h-[175px]" -->
        <div>
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
              <!-- <GameItem
                :gameItem="item"
                @matchObjects="matchObjects"
                @refreshTopData="refreshTopData"
                dataOrgin="topKey"
              /> -->
              <footballItem
                :gameItem="item"
                @matchObjects="matchObjects"
                @refreshTopData="refreshTopData"
                dataOrgin="topKey"
                v-if="item.sportsType === 1"
              />

              <basketballItem
                v-else
                :gameItem="item"
                @matchObjects="matchObjects"
                @refreshTopData="refreshTopData"
                dataOrgin="topKey"
              />
            </div>
          </div>
          <!-- <div @click="test">123123123</div> -->
          <!-- 列表 -->
          <div v-if="list.length">
            <div v-for="(timeEl, key) in timeObjData" :key="key">
              <div
                class="bg-[#fff] px-[12px] rounded-t-[20px] pb-[12px] mt-[10px]"
                v-if="timeEl.length"
              >
                <TitleText :title="key" />

                <div v-for="(item, index) in timeEl" :key="index">
                  <van-cell class="card-box mb-[10px]">
                    <!-- <GameItem
                      :gameItem="item"
                      @matchObjects="matchObjects"
                      :dataOrgin="key"
                      v-if="item.sportsType === 1"
                    /> -->

                    <footballItem
                      :gameItem="item"
                      @matchObjects="matchObjects"
                      :dataOrgin="key"
                      v-if="item.sportsType === 1"
                    />

                    <basketballItem
                      v-else
                      :gameItem="item"
                      @matchObjects="matchObjects"
                      :dataOrgin="key"
                    />
                  </van-cell>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="empty-wrap pt-[175px]" v-if="!list.length && finished">
          <van-empty
            v-if="isEmpty"
            :image="bgEmpty"
            image-size="134"
            description="暂无赛事"
          />
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup>
import {
  reactive,
  ref,
  toRefs,
  getCurrentInstance,
  triggerRef,
  onMounted,
  nextTick,
  watch
} from "vue";

import GameItem from "@/components/Competition/gameItem.vue";
import basketballItem from "@/components/Competition/basketball-item.vue";
import footballItem from "@/components/Competition/football-item.vue";

import TitleText from "@/components/TitleText/index.vue";
import bgEmpty from "../../assets/bg-empty.png";
import iconLoading from "../../assets/icon-loading.gif";

import { getMatchList } from "@/api/game";

import { secondsToMinutesAndSeconds } from "@/utils/time";
import { socket, socketState } from "@/utils/socket";

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

const { proxy } = getCurrentInstance();

const list = ref([]);
const copyList = ref([]); //取消置顶恢复数据用

const error = ref(false);
const loading = ref(false);
const finished = ref(false); //是否已加载完成，加载完成后不再触发 load 事件
const refreshing = ref(false); // 下拉刷新
const finishedText = ref("没有更多了");

const isEmpty = ref(false);

// const bgEmpty = import("../../assets/bg-empty.png");

// 固定的类型
const typedata = {
  "/": 0,
  "/basketball": 2,
  "/football": 1,
  "/competition-results": -1
};

const data = reactive({
  queryParams: {
    page: 1,
    limit: 10,
    type: 0,
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
  if (refreshing.value) return;
  if (finished.value) return;

  // console.log("加载更多");

  queryParams.value.page++;

  loading.value = true;
  // if (queryParams.value.page > 1) return;
  onGetMatchList();
};

// 下拉刷新
const onRefresh = () => {
  if (loading.value) return;
  // console.log("下拉刷新");
  refreshing.value = true;

  finishedText.value = "";

  finished.value = false;
  queryParams.value.page = 1;

  isEmpty.value = false;
  loading.value = false;

  setTimeout(() => {
    if (refreshing.value) {
      onGetMatchList();
    }
  }, 100);
};

// 重置数据
const reDate = () => {
  list.value = [];
  timeObjData.value = {};
  topArrayData.value = [];
};

// 列表数据
const onGetMatchList = async () => {
  let params = {
    ...queryParams.value,
    type:
      proxy.$cache.session.getJSON("tabsIndex") == 4
        ? -2
        : queryParams.value.type
  };
  const { data, code } = await getMatchList(params);

  if (refreshing.value) {
    reDate();
  }
  refreshing.value = false;
  loading.value = false;
  if (code !== 200) {
    finished.value = true;
    finishedText.value = data;
    return;
  }

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
    finishedText.value = "没有更多了";
    return;
  }

  // 时间升序
  if (params.type == -1 || params.type == -2) {
    data.records.sort((a, b) => b.matchTime - a.matchTime);
  } else {
    data.records.sort((a, b) => a.matchTime - b.matchTime);
  }

  data.records = onDisScore(data.records);

  copyList.value = JSON.parse(JSON.stringify(data.records));

  //赛果不需要置顶
  let noTopisUserData;
  if (params.type !== -1) {
    //判断是否是用户置顶的数据
    noTopisUserData = isUserTopDate(data.records);
  }

  // 日期数组分类 确定了数据
  onTimeDis(noTopisUserData || data.records);

  list.value.push(...data.records);
};

// 处理比分
const onDisScore = dataList => {
  dataList.map(item => {
    item.huifang_type = queryParams.value.type;

    if (item.sportsType === 2) {
      const sum = item.awayScores.reduce((acc, val) => acc + val, 0);
      const sumHome = item.homeScores.reduce((acc, val) => acc + val, 0);
      item.away_basketball_score = sum;
      item.home_basketball_score = sumHome;
      item.basketball_rang = item.asia.split(",")[1] || "-";
      item.basketball_zong = item.bs.split(",")[1] || "-";

      if (item.liveTime) {
        item.basketball_time = secondsToMinutesAndSeconds(item.liveTime);
      }

      if (queryParams.value.type === 0 || !queryParams.value.type) {
        item.basketball_type = 0;
      }
    }
    if (item.sportsType === 1) {
      if (queryParams.value.type === 0 || !queryParams.value.type) {
        item.football_type = 0;
      }
    }
  });

  return dataList;
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

  //用户置顶
  let uArr = []; //用户置顶
  for (var j = 0; j < topDataID.value.length; j++) {
    for (var i = 0; i < datalist.length; i++) {
      if (datalist[i].id === topDataID.value[j]) {
        uArr.push(odata[i]);
        topArrayData.value.push(odata[i]);
      }
    }
  }

  let idsToRemoveUser = uArr.map(item => item.id); // 获取arr2中的id数组
  // 没置顶的数据
  let filteredArrUser = odata.filter(
    item => !idsToRemoveUser.includes(item.id)
  );
  odata = filteredArrUser;
  //--------

  // 系统置顶
  let arr1 = []; //置顶数据
  for (var i = 0; i < odata.length; i++) {
    if (odata[i].topStatus) {
      arr1.push(odata[i]);
      topArrayData.value.unshift(odata[i]);
    }
  }

  let idsToRemove = arr1.map(item => item.id); // 获取arr2中的id数组
  // 没置顶的数据
  let filteredArr = odata.filter(item => !idsToRemove.includes(item.id));

  // 时间升序  已置顶的数据
  topArrayData.value.sort((a, b) => a.matchTime - b.matchTime);
  return filteredArr;
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
  if (!tabObj) return;
  queryParams.value.type = tabObj.sportsType;
  queryParams.value.competitionID = tabObj.competitionID;

  finished.value = false;

  onRefresh();
};

// ws比分处理
const onWsDisScore = data => {
  if (data.sportsType === 1) {
    //足球
    let id = data.score[0];
    let status = data.score[1];
    let homeScores = data.score[2];
    let awayScores = data.score[3];
    let liveTime = data.score[4];
    let beizhu = data.score[5];

    Object.entries(timeObjData.value).forEach(([key, value]) => {
      value.map((v_item, v_index) => {
        if (id === v_item.id) {
          // 去除列表结束的数据
          if (status === 8) {
            timeObjData.value[key].splice(v_index, 1);
            return;
          }

          if (v_item.homeScores[0] !== homeScores[0]) {
            v_item.home_bgActive = true;
          }
          if (v_item.awayScores[0] !== awayScores[0]) {
            v_item.away_bgActive = true;
          }

          v_item.homeScores = homeScores;
          v_item.awayScores = awayScores;

          v_item.statusID = status;

          v_item.liveTime = liveTime;
          disStyleClose(id);
        }
      });
    });
  }

  if (data.sportsType === 2) {
    //篮球
    let id = data.score[0];
    let status = data.score[1];
    let kaiqiuTime = data.score[2]; //小节剩余时间(秒) - int"
    let homeScores = data.score[3];
    let awayScores = data.score[4];

    Object.entries(timeObjData.value).forEach(([key, value]) => {
      value.map((v_item, v_index) => {
        if (id === v_item.id) {
          // 去除列表结束的数据
          if (status === 10) {
            timeObjData.value[key].splice(v_index, 1);
            return;
          }

          const o_sumAway = v_item.awayScores.reduce(
            (acc, val) => acc + val,
            0
          );
          const o_sumHome = v_item.homeScores.reduce(
            (acc, val) => acc + val,
            0
          );
          const sumAway = awayScores.reduce((acc, val) => acc + val, 0);
          const sumHome = homeScores.reduce((acc, val) => acc + val, 0);

          if (sumHome != o_sumHome) {
            v_item.home_bgActive = true;
          }
          if (sumAway != o_sumAway) {
            v_item.away_bgActive = true;
          }

          v_item.homeScores = homeScores;
          v_item.awayScores = awayScores;

          v_item.statusID = status;

          v_item.liveTime = kaiqiuTime;
          v_item.basketball_time = secondsToMinutesAndSeconds(v_item.liveTime);

          v_item.away_basketball_score = sumAway;
          v_item.home_basketball_score = sumHome;

          disStyleClose(id);
        }
      });
    });
  }
};

// ws指数处理
const onWsDisSun = data => {
  if (data.sportsType === 1) {
    let id = data.matchID;
    let type = data.type; // 亚指：asia, 大小球：eu
    let sun = data.data;

    Object.entries(timeObjData.value).forEach(([key, value]) => {
      value.map((v_item, v_index) => {
        if (id === v_item.id) {
          v_item[type] = sun;
          if (type === "asia") {
            v_item.asia_zhiActive = true;
          } else if (type === "eu") {
            v_item.bs_zhiActive = true;
          }
          disStyleClose(id);
        }
      });
    });
  }

  if (data.sportsType === 2) {
    //篮球
    let id = data.matchID;
    let type = data.type; // 亚指：asia, 大小球：bs
    let sun = data.data;

    Object.entries(timeObjData.value).forEach(([key, value]) => {
      value.map((v_item, v_index) => {
        if (id === v_item.id) {
          if (type === "asia") {
            // item.basketball_rang = item.asia.split(",")[1] || "-";
            v_item.basketball_rang = sun.split(",")[1] || "-";

            v_item.asia_zhiActive = true;
          } else if (type === "bs") {
            // item.basketball_zong = item.bs.split(",")[1] || "-";
            v_item.basketball_zong = sun.split(",")[1] || "-";
            v_item.bs_zhiActive = true;
          }
          // v_item.zhiActive = true;
          disStyleClose(id);
        }
      });
    });
  }
};

// TODO:测试
const test = () => {
  let data = {
    sportsType: 2,
    score: [
      3739784,
      10,
      [2, 2, 0, 0, 3, 0, 0],
      [0, 0, 0, 1, 0, 0, 0],
      1709553615,
      ""
    ]
  };

  if (data.sportsType === 1) {
    //足球
    let id = data.score[0];
    let status = data.score[1];
    let homeScores = data.score[2];
    let awayScores = data.score[3];
    let liveTime = data.score[4];
    let beizhu = data.score[5];

    Object.entries(timeObjData.value).forEach(([key, value]) => {
      value.map((v_item, v_index) => {
        if (id === v_item.id) {
          // 去除列表结束的数据
          if (status === 8) {
            timeObjData.value[key].splice(v_index, 1);
          }

          if (v_item.homeScores[0] !== homeScores[0]) {
            v_item.home_bgActive = true;
          }
          if (v_item.awayScores[0] !== awayScores[0]) {
            v_item.away_bgActive = true;
          }

          v_item.homeScores = homeScores;
          v_item.awayScores = awayScores;

          v_item.statusID = status;

          v_item.liveTime = liveTime;
          disStyleClose(id);
        }
      });
    });
  }

  if (data.sportsType === 2) {
    //篮球
    let id = data.score[0];
    let status = data.score[1];
    let kaiqiuTime = data.score[2]; //小节剩余时间(秒) - int"
    let homeScores = data.score[3];
    let awayScores = data.score[4];

    Object.entries(timeObjData.value).forEach(([key, value]) => {
      value.map((v_item, v_index) => {
        if (id === v_item.id) {
          // 去除列表结束的数据
          if (status === 10) {
            timeObjData.value[key].splice(v_index, 1);
            return;
          }

          const o_sumAway = v_item.awayScores.reduce(
            (acc, val) => acc + val,
            0
          );
          const o_sumHome = v_item.homeScores.reduce(
            (acc, val) => acc + val,
            0
          );

          const sumAway = awayScores.reduce((acc, val) => acc + val, 0);
          const sumHome = homeScores.reduce((acc, val) => acc + val, 0);

          console.log("sumHome", sumHome);
          console.log("o_sumHome", o_sumHome);
          console.log("o_sumHome11", sumHome == o_sumHome);

          if (sumHome != o_sumHome) {
            v_item.home_bgActive = true;
            console.log("进拉了");
          }

          console.log("sumAway", sumAway);
          console.log("o_sumAway", o_sumAway);

          if (sumAway != o_sumAway) {
            v_item.away_bgActive = true;
            console.log("进拉了2");
          }

          v_item.homeScores = homeScores;
          v_item.awayScores = awayScores;

          v_item.statusID = status;

          v_item.liveTime = kaiqiuTime;
          v_item.basketball_time = secondsToMinutesAndSeconds(v_item.liveTime);

          v_item.away_basketball_score = sumAway;
          v_item.home_basketball_score = sumHome;

          disStyleClose(id);
        }
      });
    });
  }
};

// 清理颜色
const disStyleClose = id => {
  setTimeout(() => {
    Object.entries(timeObjData.value).forEach(([key, value]) => {
      value.map((v_item, v_index) => {
        if (id === v_item.id) {
          v_item.away_bgActive = false;
          v_item.home_bgActive = false;
          v_item.asia_zhiActive = false;
          v_item.bs_zhiActive = false;
        }
      });
    });
  }, 2000);
};

onMounted(() => {
  queryParams.value.page = 0;

  // 比分，时间, 比赛状态更新
  watch(
    () => socketState.matchLive,
    () => {
      socketState.matchLive.map(item => {
        onWsDisScore(item);
      });
    },
    { immediate: true }
  );
  // 指数
  watch(
    () => socketState.matchOdds,
    () => {
      socketState.matchOdds.map(item => {
        onWsDisSun(item);
      });
    },
    { immediate: true }
  );
});

defineExpose({ refreshListData });
</script>

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

.listwrap {
  // background: #000 !important;
  min-height: calc(100vh - 88px);
  // box-sizing: border-box;
  // padding-top: 175px;
}
</style>
