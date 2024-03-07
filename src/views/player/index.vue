<template>
  <div class="relative player-wrap h-full flex flex-col">
    <span class="absolute z-20 left-[18px] top-[18px]" @click="onBack">
      <van-icon size="24px" name="arrow-left" color="white" />
    </span>

    <!-- top video -->
    <div>
      <!---->
      <div class="video-wrap relative h-[234px] bg-[#000]">
        <div class="h-full" v-if="matchInfo.sportsType">
          <notStarted
            :matchInfo="matchInfo"
            v-if="
              matchInfo.matchStatus === 1 ||
              (matchInfo.sportsType === 1 && matchInfo.matchStatus === 8) ||
              (matchInfo.sportsType === 2 && matchInfo.matchStatus === 10)
            "
          />
          <div v-else-if="originData[originDataIndex]">
            <VideoPlayer
              ref="VideoPlayerRef"
              :videoOrigin="originData[originDataIndex]"
            />

            <!-- <div
              class="text-[10px] text-[#fff] w-full h-full flex flex-col justify-center items-center z-10 absolute left-0 top-0 bottom-0 right-0 m-auto"
            >
              <img
                class="w-[125px] h-[30px] mb-[6px]"
                src="@/assets/img-video-logo.png"
                alt=""
                @click="onIsPlay"
              />
              <div>赛事直播准备中….</div>
            </div> -->
          </div>

          <div
            v-else
            class="text-[10px] text-[#fff] w-full h-full flex flex-col justify-center items-center"
          >
            <img
              class="w-[125px] h-[30px] mb-[6px]"
              src="@/assets/img-video-logo.png"
              alt=""
              @click="onIsPlay"
            />
            <div>暂无视频可看</div>
          </div>
        </div>
        <!-- <videoCom v-else :videoOrigin="originData[originDataIndex]" /> -->
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
                  s => s === matchInfo.statusID
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
            <div class="w-[0.4px] h-[10px] bg-[#9f9f9f] mx-[12px]"></div>

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
            <div class="w-[0.4px] h-[10px] bg-[#9f9f9f] mx-[6px]"></div>

            <span>{{ BASKETBALL_TYPE[matchInfo.matchStatus] }}</span>
          </div>
        </div>

        <div class="mt-[20px] flex items-center">
          <div class="font-bold">直播源：</div>

          <div
            class="text-[10px] bg-[#e9fafa] rounded-[20px] px-[12px] py-[5px] mr-[10px]"
            v-if="matchInfo.matchLiveInfo?.playUrl"
          >
            {{ matchInfo.matchLiveInfo.anchorName }}
          </div>

          <div v-if="originData.length" class="flex items-center">
            <div
              class="text-[10px] bg-[#e9fafa] rounded-[20px] px-[12px] py-[5px] mr-[10px]"
              :class="{ 'bg-avtive': o_index === originDataIndex }"
              v-for="(o_item, o_index) in originData"
              :key="o_index"
              @click="onChangeOrigin(o_index)"
            >
              信号源{{ o_index + 1 }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="iframe-wrap flex-1">
      <iframe
        width="100%"
        height="100%"
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

import { nextTick, ref, onMounted, reactive, toRefs, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getMatchInfo } from "@/api/game";
import { secondsToMinutesAndSeconds } from "@/utils/time";
// import videoCom from "./videoCom.vue";
import notStarted from "./not-started.vue";
import VideoPlayer from "./components/VideoPlayer.vue";

const router = useRouter();
const route = useRoute();

const isShow = ref(true);
const iframeUrl = ref(
  `http://192.168.3.248:5174/chat/${route.params.sportsType}/${route.params.matchID}`
);
const VideoPlayerRef = ref();
const player = ref(null);
const myPlayer = ref(null);

const originData = ref([]);
const originDataIndex = ref(0);

console.log("route", route);

const data = reactive({
  queryParams: {
    sportsType: Number(route.params.sportsType),
    matchID: Number(route.params.matchID)
  },
  matchInfo: {}
});
const { queryParams, matchInfo } = toRefs(data);

const onBack = () => {
  console.log("123123");

  router.back(-1);
};

const onChangeOrigin = index => {
  originDataIndex.value = index;
};

const handlanGetMatchInfo = async () => {
  let params = {
    ...queryParams.value
  };

  const { data, code } = await getMatchInfo(params);
  if (code !== 200) return;
  let disData = onObjDisScore(data);

  if (disData.pullurl1) {
    originData.value.push(disData.pullurl1);
  }
  if (disData.pullurl2) {
    originData.value.push(disData.pullurl2);
  }
  if (disData.pullurl3) {
    originData.value.push(disData.pullurl3);
  }

  matchInfo.value = disData;
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

handlanGetMatchInfo();

onMounted(() => {
  const labelMap = {
    0: "高清",
    1: "中文蓝光",
    2: "英文蓝光"
  };
  const arr = ["https://play.xshuijiu.cn/live/sd-2-3747549.flv", "", ""]
    .map((item, idx) => {
      return {
        src: item,
        name: labelMap[idx],
        type: "video/flv",
        selected: idx === 0
      };
    })
    .filter(item => item);
  // VideoPlayerRef.value.init({ sources: arr });
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
