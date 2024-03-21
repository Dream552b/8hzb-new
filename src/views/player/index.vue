<template>
  <div class="relative player-wrap h-full flex flex-col">
    <span class="absolute z-[200] left-[18px] top-[10px]" @click="onBack">
      <van-icon size="24px" name="arrow-left" color="white" />
    </span>

    <!-- top video -->
    <div>
      <!-- bg-[#002200]  h-[234px] bg-[#000] -->
      <div class="video-wrap relative h-[212px]">
        <div class="h-full bg-[#000]" v-if="matchInfo.sportsType">
          <notStarted
            :matchInfo="matchInfo"
            @onPlayback="onPlayback"
            v-if="
              (matchInfo.matchStatus === 1 ||
                (matchInfo.sportsType === 1 && matchInfo.matchStatus === 8) ||
                (matchInfo.sportsType === 2 && matchInfo.matchStatus === 10)) &&
              !isBackVideo &&
              !matchInfo.matchLiveInfo.playUrl
            "
          />
          <div v-else-if="originData[originDataIndex]">
            <VideoPlayer
              ref="VideoPlayerRef"
              :videoOrigin="originData[originDataIndex]"
              :isBackVideo="isBackVideo"
            />
          </div>

          <videoStatus v-else :videoStatusNum="2" />

          <!-- 广告 -->
          <advPosition
            class="absolute top-0 left-0 z-[100]"
            :matchID="queryParams.matchID"
            :advInfo="advInfo"
            :matchInfo="matchInfo"
            @handlanGetMatchInfo="handlanGetMatchInfo"
          />

          <!-- 黑板广告 -->
          <div
            v-if="false"
            class="absolute bottom-[6px] left-[6px] right-[6px] m-auto py-[2px] w-[90%] bg-[#000] text-[#fff] text-[12px]"
          >
            趁着比赛没开始,先下载泡泡和投注APP泡泡网址：ya.cn
            添加账号：meixi368下注网址:
            v5ty35.vip下载好了，跟主播一起边看球边下注
            趁着比赛没开始,先下载泡泡和投注应用泡泡网址:ya.cn添加账号:meixi368下注网址:v5ty35.vip下载好了,跟主播一起边看球边下注
          </div>

          <!-- 在线人数 管理员才显示-->
          <online v-if="userInfo.roleID === 16" :lineNum="lineNum" />
        </div>
      </div>

      <div class="handlan bg-[#fff] px-[10px] pt-[10px] pb-[4px] text-[12px]">
        <div
          class="flex items-center w-full"
          v-if="queryParams.sportsType === 1"
        >
          <div class="flex items-center text-[#ff0000] shrink-0">
            <img
              class="w-[14px] h-[14px] ml-[1px]"
              src="@/assets/img-zuqiu.png"
              alt=""
              :class="{
                rotate: FOOTBALL_STYLE_STATUS_ARR.find(
                  s => s === matchInfo.matchStatus
                )
              }"
            />
          </div>

          <div
            class="w-full h-full flex-1 flex justify-center items-center leading-[16px]"
          >
            <span class="van-ellipsis">{{ matchInfo.homeTeamName }}</span>
            <img
              class="w-[14px] h-[14px] ml-[4px]"
              :src="matchInfo.homeTeamLogo"
              alt=""
            />
            <div
              class="flex items-center justify-center text-[14px] font-bold mx-[10px]"
              v-if="matchInfo.homeScores"
            >
              <span> {{ matchInfo.homeScores[0] }}</span>
              <span class="mx-[2px]">-</span>
              <span> {{ matchInfo.awayScores[0] }}</span>
            </div>
            <img
              class="w-[14px] h-[14px] mr-[4px]"
              :src="matchInfo.awayTeamLogo"
              alt=""
            />
            <span class="van-ellipsis">{{ matchInfo.awayTeamName }}</span>
          </div>

          <div class="flex items-center shrink-0">
            <!-- <div class="w-[0.4px] h-[10px] bg-[#9f9f9f] mx-[12px]"></div> -->

            <span>{{ FOOTBALL_TYPE[matchInfo.matchStatus] }}</span>
          </div>
        </div>

        <div
          class="flex items-center w-full overflow-hidden text-[12px]"
          v-if="queryParams.sportsType === 2"
        >
          <div class="flex items-center text-[#3CCAC8] shrink-0">
            <img
              class="w-[14px] h-[14px] ml-[1px]"
              src="@/assets/img-lanqiu.png"
              alt=""
              :class="{
                rotate: BASKETBALLSTYLE_STATUS_ARR.find(
                  s => s === matchInfo.matchStatus
                )
              }"
            />
          </div>

          <div class="flex flex-1 justify-center items-center leading-[16px]">
            <span class="van-ellipsis max-w-[80px]">{{
              matchInfo.awayTeamName
            }}</span>
            <img
              class="w-[14px] h-[14px] ml-[4px]"
              :src="matchInfo.awayTeamLogo"
              alt=""
            />
            <div
              class="flex items-center justify-center text-[14px] font-bold mx-[6px]"
            >
              <span>{{ matchInfo.away_basketball_score }}</span>
              <span class="mx-[2px]">-</span>
              <span>{{ matchInfo.home_basketball_score }}</span>
            </div>
            <img
              class="w-[14px] h-[14px] mr-[4px]"
              :src="matchInfo.homeTeamLogo"
              alt=""
            />
            <span class="van-ellipsis max-w-[80px]">{{
              matchInfo.homeTeamName
            }}</span>
          </div>

          <div class="flex items-center shrink-0 min-w-[40px] text-[12px]">
            <!-- <div class="w-[0.4px] h-[10px] bg-[#9f9f9f] mx-[6px]"></div> -->

            <span>{{ BASKETBALL_TYPE[matchInfo.matchStatus] }}</span>
          </div>
        </div>

        <div class="mt-[20px] flex items-center" v-if="!isBackVideo">
          <div class="font-bold shrink-0">直播源：</div>

          <div v-if="originData.length" class="flex items-center">
            <div
              class="text-[10px] bg-[#e9fafa] rounded-[20px] px-[12px] py-[5px] mr-[10px] van-ellipsis max-w-[90px]"
              :class="{ 'bg-avtive': o_index === originDataIndex }"
              v-for="(o_item, o_index) in originData"
              :key="o_index"
              @click="onChangeOrigin(o_index)"
            >
              {{ o_item.name }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="iframe-wrap flex-1" style="height: 100%; flex: 1">
      <iframe
        style="height: 100%; width: 100%"
        :src="iframeUrl"
        frameborder="0"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import {
  FOOTBALL_TYPE,
  BASKETBALL_TYPE,
  FOOTBALL_STYLE_STATUS_ARR,
  BASKETBALLSTYLE_STATUS_ARR,
  F_LIVE_STATUS,
  B_LIVE_STATUS
} from "@/modules/enum";
import videojs from "video.js";
import "video.js/dist/video-js.css";

import {
  nextTick,
  ref,
  onMounted,
  reactive,
  toRefs,
  onUnmounted,
  watch,
  getCurrentInstance
} from "vue";
import { socket, socketState } from "@/utils/socket";
import { getMatchInfo, getAdvertisement } from "@/api/game";
import { secondsToMinutesAndSeconds } from "@/utils/time";
import online from "./components/online.vue";
// import videoCom from "./videoCom.vue";
import advPosition from "./components/adv-position.vue";
import notStarted from "./components/not-started.vue";
import VideoPlayer from "./components/VideoPlayer.vue";
import videoStatus from "./components/video-status.vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const { proxy } = getCurrentInstance();

let userInfo = ref(proxy.$cache.local.getJSON("user") || {});

const lineNum = ref(0); //在线人数

const isShow = ref(true);

const currentDomain =
  process.env.NODE_ENV === "production" ? window.location.hostname : "8hzb.com";

const iframeUrl = ref(
  `https://${currentDomain}/chatRoom/chat/${route.params.sportsType}/${route.params.matchID}`
);

// 本地
// const currentDomain =
// process.env.NODE_ENV === "production"
//   ? window.location.hostname
//   : "192.168.3.248:5174"; //本地

// 本地 http
// const iframeUrl = ref(
//   `http://${currentDomain}/chatRoom/chat/${route.params.sportsType}/${route.params.matchID}`
// );

const VideoPlayerRef = ref();
const player = ref(null);
const myPlayer = ref(null);

const originData = ref([]);
const originDataIndex = ref(0);

const advInfo = ref({});
const isBackVideo = ref(false);

const data = reactive({
  queryParams: {
    sportsType: Number(route.params.sportsType),
    matchID: Number(route.params.matchID)
  },
  matchInfo: {}
});
const { queryParams, matchInfo } = toRefs(data);

const onBack = () => {
  router.back(-1);
};

const onChangeOrigin = index => {
  originDataIndex.value = index;
};

const onGetAdvertisement = async () => {
  let params = {
    ...queryParams.value
  };
  const { data, code } = await getAdvertisement(params);
  if (code !== 200) return;
  advInfo.value = data;
};

// 视频详情
const handlanGetMatchInfo = async () => {
  let params = {
    ...queryParams.value
  };

  const { data, code } = await getMatchInfo(params);
  if (code !== 200) return;
  let disData = onObjDisScore(data);

  videoOriginDis(disData);

  //测试主播
  // disData.matchLiveInfo.anchorName = "123";
  // disData.matchLiveInfo.playUrl =
  //   "https://playsz.juwangyun.cn/live/1710766791521.m3u8?timestamp=1710817220993";
  // console.log("disData", disData);

  matchInfo.value = disData;
};

const onPlayback = item => {
  if (originData.value.length) return;
  let obj = {
    name: "回放源",
    url: item.playbackUrl
  };
  isBackVideo.value = true;
  originData.value.push(obj);
  console.log("originData.value", originData.value);
};

// 视频源处理
const videoOriginDis = disData => {
  // 生成随机参数
  var timestamp = Date.now();

  // 主播源处理
  if (disData.matchLiveInfo.playUrl) {
    // flv 换成 m3u8； 只是.后面的格式不同
    let disURL = disData.matchLiveInfo.playUrl.replace(".flv", ".m3u8");

    let obj = {
      name: disData.matchLiveInfo.anchorName,
      url: disURL + "?timestamp=" + timestamp
    };
    originData.value.push(obj);
  }

  let arr = ["pullurl1", "pullurl2", "pullurl3"];
  let nameObj = {
    pullurl1: "高清",
    pullurl2: "中文蓝光",
    pullurl3: "英文蓝光"
  };

  arr.forEach((item, index) => {
    if (disData[item]) {
      // flv 换成 m3u8； 只是.后面的格式不同
      let disURL = disData[item].replace(".flv", ".m3u8");
      let obj = {
        name: nameObj[item],
        url: disURL + "?timestamp=" + timestamp
      };
      //测试
      // if (index === 0) {
      //   obj.name = "8H主播";
      //   obj.url = "https://playsz.juwangyun.cn/live/1710766791521.m3u8?timestamp=1710817220993";
      // }
      originData.value.push(obj);
    }
  });
};

// obj处理比分
const onObjDisScore = dataObj => {
  const sum = dataObj.awayScores.reduce((acc, val) => acc + val, 0);
  const sumHome = dataObj.homeScores.reduce((acc, val) => acc + val, 0);
  dataObj.away_basketball_score = sum;
  dataObj.home_basketball_score = sumHome;
  dataObj.basketball_time = secondsToMinutesAndSeconds(dataObj.liveTime);
  return dataObj;
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

    let v_item = matchInfo.value;

    if (id === v_item.matchID) {
      // console.log("socketState.matchLive 足球 状态更新", socketState.matchLive);
      //从未开始到已开始逻辑处理 刷新详情接口
      // if(v_item.statusID === 1 && status !== 1){
      // }

      if (v_item.homeScores[0] !== homeScores[0]) {
        v_item.home_bgActive = true;
      }
      if (v_item.awayScores[0] !== awayScores[0]) {
        v_item.away_bgActive = true;
      }

      v_item.homeScores = homeScores;
      v_item.awayScores = awayScores;

      v_item.matchStatus = status;

      v_item.liveTime = liveTime;
      // disStyleClose(id);
    }
  }

  if (data.sportsType === 2) {
    //篮球
    let id = data.score[0];
    let status = data.score[1];
    let kaiqiuTime = data.score[2]; //小节剩余时间(秒) - int"
    let homeScores = data.score[3];
    let awayScores = data.score[4];

    let v_item = matchInfo.value;

    if (id === v_item.matchID) {
      // console.log("socketState.matchLive篮球 状态更新", socketState.matchLive);
      const o_sumAway = v_item.awayScores.reduce((acc, val) => acc + val, 0);
      const o_sumHome = v_item.homeScores.reduce((acc, val) => acc + val, 0);
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

      v_item.matchStatus = status;

      v_item.liveTime = kaiqiuTime;
      v_item.basketball_time = secondsToMinutesAndSeconds(v_item.liveTime);

      v_item.away_basketball_score = sumAway;
      v_item.home_basketball_score = sumHome;

      // disStyleClose(id);
    }
  }
};

handlanGetMatchInfo();
onGetAdvertisement();

onMounted(() => {
  // 连接socket房间
  socket.emit("joinMatchRoom", { matchID: Number(queryParams.value.matchID) });

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

  // 在线人数
  watch(
    () => socketState.matchRoomOnlineUserNum,
    val => {
      lineNum.value = val;
    },
    { immediate: true }
  );

  // 主播流状态推送
  watch(
    () => socketState.matchLiveStatusChange,
    obj => {
      // let tsojb = {
      //   anchorName: "8H主播",
      //   playUrl:
      //     "https://play.8hzb.science/live/1711015144287.flv?timestamp=1711019289725",
      //   liveStatus: 3
      // };

      let tsojb = obj;
      if (tsojb.liveStatus === 2) {
        // 直播中
        // 主播源处理
        if (tsojb.playUrl) {
          // flv 换成 m3u8； 只是.后面的格式不同
          let disURL = tsojb.playUrl.replace(".flv", ".m3u8");
          let obj = {
            name: tsojb.anchorName,
            url: disURL
          };
          originData.value.unshift(obj);
          // onChangeOrigin(0);
        }
      } else {
        // 结束
        originData.value.shift();
      }
    }
  );
});
onUnmounted(() => {
  // 退出socket房间
  socket.emit("exitMatchRoom", { matchID: Number(queryParams.value.matchID) });
  console.log("onUnmounted");
});
</script>

<style lang="less" scoped>
.iframe-wrap {
  overflow-y: hidden;
  overflow-x: hidden;
}
.bg-avtive {
  background: #1fcbca;
  color: #ffffff;
}

.rotate {
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
