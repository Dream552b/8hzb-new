<template>
  <div>
    <div class="c-itam relative text-[#000]">
      <!-- top part -->
      <div class="flex items-center justify-between">
        <div class="flex items-center font-bold">
          <img
            class="w-[14px] h-[14px]"
            v-show="gameItem.sportsType === 1"
            src="@/assets/img-zuqiu.png"
            alt=""
          />

          <img
            class="w-[14px] h-[14px]"
            v-show="gameItem.sportsType === 2"
            src="@/assets/img-lanqiu.png"
            alt=""
          />
          <span class="mx-[5px]">{{
            parseTime(gameItem.matchTime, "{h}:{i}")
          }}</span>
          <span>{{ gameItem.competitionName }}</span>
        </div>

        <div
          class="text-[12px] font-bold text-[#999999]"
          :class="{
            liveActive: FOOTBALL_STYLE_STATUS_ARR.find(
              s => s === gameItem.statusID
            )
          }"
          v-if="gameItem.sportsType === 1"
        >
          {{ FOOTBALL_TYPE[gameItem.statusID] }}
          <span v-if="gameItem.liveTime !== 0">
            {{ getMinutesPassed(gameItem.liveTime) }}'</span
          >
        </div>
        <div v-else class="text-[12px] font-bold text-[#999999]">
          {{ BASKETBALL_TYPE[gameItem.statusID] }}
          <span v-if="gameItem.liveTime !== 0"> {{ gameItem.liveTime }}</span>
        </div>
        <div class="min-w-[70px]">
          <div class="flex font-bold" v-if="gameItem.anchorName">
            <img
              class="w-[14px] h-[14px] mr-[4px]"
              src="@/assets/img-ren.png"
              alt=""
              v-if="gameItem.statusID === 1"
            />

            <img
              v-else
              class="w-[14px] h-[14px] mr-[4px]"
              src="@/assets/img-ren-active.png"
              alt=""
            />
            <span>{{ gameItem.anchorName }}</span>
          </div>
        </div>
      </div>

      <div class="line h-[0.4px] my-[10px]"></div>

      <!-- center part -->
      <div class="flex items-center justify-center">
        <div
          class="flex items-center justify-end min-w-[120px] text-[12px] font-bold"
        >
          <span
            class="bg-[#FAEE00] h-[13px] text-center px-[2px] ml-[5px] rounded-[1px] text-[10px] font-[400] leading-[14px]"
            v-if="gameItem.homeScores[3]"
          >
            {{ gameItem.homeScores[3] }}
          </span>
          <span
            class="bg-[#FF5858] h-[13px] px-[2px] rounded-[1px] ml-[5px] text-[10px] font-[400] leading-[14px]"
            v-if="gameItem.homeScores[2]"
          >
            {{ gameItem.homeScores[2] }}
          </span>

          <span class="van-ellipsis max-w-[74px] text-rigth ml-[5px]">{{
            gameItem.homeTeamName
          }}</span>
          <img
            class="w-[14px] h-[14px] ml-[6px]"
            v-if="gameItem.homeTeamLogo"
            :src="gameItem.homeTeamLogo"
            alt=""
          />
        </div>

        <div class="text-[14px] font-bold text-center mx-[4px]">
          <span v-if="gameItem.statusID === 1">VS</span>
          <span v-else
            >{{ gameItem.homeScores[0] }} - {{ gameItem.awayScores[0] }}</span
          >
        </div>

        <div
          class="flex items-center text-[12px] font-bold leading-[16px] min-w-[120px]"
        >
          <img
            class="w-[14px] h-[14px] mr-[6px]"
            :src="gameItem.awayTeamLogo"
            v-if="gameItem.awayTeamLogo"
            alt=""
          />
          <span class="van-ellipsis max-w-[64px] text-left">{{
            gameItem.awayTeamName
          }}</span>

          <span
            class="bg-[#FAEE00] h-[13px] text-center px-[2px] ml-[5px] rounded-[1px] text-[10px] font-[400] leading-[14px]"
            v-if="gameItem.awayScores[3]"
          >
            {{ gameItem.awayScores[3] }}
          </span>
          <span
            class="bg-[#FF5858] h-[13px] px-[2px] rounded-[1px] ml-[5px] text-[10px] font-[400] leading-[14px]"
            v-if="gameItem.awayScores[2]"
          >
            {{ gameItem.awayScores[2] }}
          </span>
        </div>
      </div>

      <!-- bottom part -->
      <div class="flex items-center justify-center relative leading-[16px]">
        <div class="flex items-center justify-end min-w-[100px]">
          <span class="">{{ gameItem.asia }}</span>
        </div>
        <div class="mx-[10px]">
          <span>
            半: {{ gameItem.homeScores[1] }}-{{ gameItem.awayScores[1] }}
          </span>

          <span class="ml-[4px]">
            角:{{ gameItem.homeScores[4] }}-{{ gameItem.awayScores[4] }}</span
          >
        </div>
        <div class="flex items-center min-w-[100px]">
          <span>{{ gameItem.bs }}</span>
        </div>
      </div>

      <img
        class="w-[38px] h-[23px] ml-[8px] absolute right-[0px] bottom-[0px]"
        src="@/assets/icon-zhuagnshi.png"
        alt=""
      />

      <img
        v-show="dataOrgin !== 'topKey'"
        class="w-[10px] h-[9px] ml-[8px] absolute left-[2px] bottom-[8px]"
        src="@/assets/img-top.png"
        alt=""
        @click="onClikeTop(gameItem)"
      />
      <img
        v-show="dataOrgin === 'topKey'"
        class="w-[10px] h-[9px] ml-[8px] absolute left-[2px] bottom-[8px]"
        src="@/assets/img-top-ok.png"
        alt=""
        @click="onClikeTopClose(gameItem)"
      />
    </div>
  </div>
</template>

<script setup>
import {
  FOOTBALL_TYPE,
  BASKETBALL_TYPE,
  FOOTBALL_STYLE_STATUS_ARR,
  BASKETBALLSTYLE_STATUS_ARR
} from "@/modules/enum";

import { ref, reactive, getCurrentInstance, onMounted, watch } from "vue";
import { showFailToast, showSuccessToast, showToast } from "vant";
import "vant/es/toast/style";

const props = defineProps({
  gameItem: {
    type: Object,
    default: {}
  },
  dataOrgin: {
    type: String,
    default: ""
  }
});

const emit = defineEmits(["matchObjects", "refreshTopData"]);

const { proxy } = getCurrentInstance();

const onClikeTop = item => {
  console.log("dataOrgin", props.dataOrgin);

  let topData = proxy.$cache.session.getJSON("topData") || [];

  let okID = topData.find(sonID => sonID === item.id);
  if (okID) return;
  topData.push(item.id);
  proxy.$cache.session.setJSON("topData", topData);

  emit("matchObjects", item.id, props.dataOrgin);
};

const onClikeTopClose = item => {
  if (item.topStatus) {
    showToast("系统置顶无法取消！");
    return;
  }

  let topData = proxy.$cache.session.getJSON("topData") || [];
  let cindex = topData.findIndex(el => el === item.id);
  topData.splice(cindex, 1);
  proxy.$cache.session.setJSON("topData", topData);

  emit("refreshTopData");
};
</script>

<style lang="less" scoped>
.c-itam {
  width: 100%;
  height: 96px;
  border: #f7f7f7 3px solid;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 12px;
  font-size: 10px;
}

.line {
  background: #e5e5e5;
}

.card-box:nth-last-child(1) .c-itam {
  margin-bottom: 0;
}

.liveActive {
  color: red;
}
</style>
