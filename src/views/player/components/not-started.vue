<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

const props = defineProps({
  matchInfo: {
    type: Object,
    default: {}
  },
  videoOriginLength: {
    type: Number,
    default: 0
  }
});

const emits = defineEmits(["onPlayback"]);

let timeok = ref("");
const timer = ref(null);

function countdown() {
  // 比赛开始时间（假设为2022年3月1日 10:00:00）
  const startTime = props.matchInfo.matchTime;

  const currentTime = Math.floor(Date.now() / 1000); // 当前时间戳
  const timeDiff = startTime - currentTime; // 计算时间差（单位：毫秒）

  if (timeDiff <= 0) {
    timeok.value = "比赛已经开始！";
    return;
  }

  let days = Math.floor(timeDiff / (60 * 60 * 24));
  let hours = Math.floor((timeDiff % (60 * 60 * 24)) / (60 * 60));
  let minutes = Math.floor((timeDiff % (60 * 60)) / 60);
  let seconds = timeDiff % 60;

  days = days < 10 ? "0" + days : days;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timeok.value = `${days} 天 ${hours} 时 ${minutes} 分 ${seconds} 秒`;

  timer.value = setTimeout(countdown, 1000); // 每隔一秒重新计算倒计时
}

const lookBlok = item => {
  emits("onPlayback", item);
};
onMounted(() => {
  countdown();
});
onUnmounted(() => {
  clearInterval(timer.value);
});
</script>

<template>
  <div class="relative w-full h-full">
    <img class="w-full h-full absolute" src="@/assets/bg-no-start.png" alt="" />
    <div class="w-full h-full relative z-10 flex justify-center items-center">
      <div
        class="w-[44px] text-[#fff] text-[10px] flex flex-col justify-center items-center"
        v-if="matchInfo.sportsType == 1"
      >
        <div class="w-[44px] h-[44px] rounded-[50%] mb-[7px]">
          <img class="w-full h-full" :src="matchInfo.homeTeamLogo" alt="" />
        </div>
        <div class="van-ellipsis">{{ matchInfo.homeTeamName }}</div>
      </div>

      <div
        class="w-[44px] text-[#fff] text-[10px] flex flex-col justify-center items-center"
        v-if="matchInfo.sportsType == 2"
      >
        <div class="w-[44px] h-[44px] rounded-[50%] mb-[7px]">
          <img class="w-full h-full" :src="matchInfo.awayTeamLogo" alt="" />
        </div>
        <div class="van-ellipsis">{{ matchInfo.awayTeamName }}</div>
      </div>

      <div
        class="text-[10px] text-[#fff] flex flex-col justify-center items-center mx-[47px]"
        v-if="!videoOriginLength"
      >
        暂无视频源...
      </div>
      <div
        v-else
        class="text-[10px] text-[#fff] flex flex-col justify-center items-center mx-[47px]"
      >
        <div>{{ matchInfo.matchStatus === 1 ? "开赛倒计时" : "已结束" }}</div>
        <div
          v-if="matchInfo.matchStatus === 1"
          class="px-[8px] py-[2px] bg-[rgba(255,255,255,0.35)] mt-[4px] mb-[8px] min-w-[60px] min-h-[10px]"
        >
          <span>{{ timeok }}</span>
        </div>
        <div class="text-[22px] font-bold" v-if="matchInfo.matchStatus === 1">
          VS
        </div>
        <div
          class="text-[22px] font-bold mt-[6px] flex flex-col justify-center items-center"
        >
          <span v-if="matchInfo.sportsType == 1 && matchInfo.matchStatus === 8">
            <span> {{ matchInfo.homeScores[0] }}</span>
            <span class="mx-[2px]">:</span>
            <span> {{ matchInfo.awayScores[0] }}</span>
          </span>

          <span
            v-if="matchInfo.sportsType == 2 && matchInfo.matchStatus === 10"
          >
            <span>{{ matchInfo.away_basketball_score }}</span>
            <span class="mx-[2px]">-</span>
            <span>{{ matchInfo.home_basketball_score }}</span>
          </span>

          <div
            v-if="matchInfo.playbackUrl"
            class="flex items-center mt-[2px]"
            @click="lookBlok(matchInfo)"
          >
            <img
              class="w-[14px] h-[12px] mr-[4px] text-[#fff]"
              src="@/assets/icon-hui-bai.png"
              alt=""
            />
            <span class="text-[10px]">查看回放</span>
          </div>
        </div>
      </div>

      <div
        class="w-[44px] text-[#fff] text-[10px] flex flex-col justify-center items-center"
        v-if="matchInfo.sportsType == 2"
      >
        <div class="w-[44px] h-[44px] rounded-[50%] mb-[7px]">
          <img class="w-full h-full" :src="matchInfo.homeTeamLogo" alt="" />
        </div>
        <div class="van-ellipsis">{{ matchInfo.homeTeamName }}</div>
      </div>

      <div
        class="w-[44px] text-[#fff] text-[10px] flex flex-col justify-center items-center"
        v-if="matchInfo.sportsType == 1"
      >
        <div class="w-[44px] h-[44px] rounded-[50%] mb-[7px]">
          <img class="w-full h-full" :src="matchInfo.awayTeamLogo" alt="" />
        </div>
        <div class="van-ellipsis">{{ matchInfo.awayTeamName }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
