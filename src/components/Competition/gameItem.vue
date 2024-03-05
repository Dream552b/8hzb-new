<template>
  <div>
    <div class="c-itam relative text-[#000]" @click="onToDetails(gameItem)">
      <!-- top part -->
      <div class="flex items-center justify-between">
        <div class="flex items-center font-bold">
          <img
            class="w-[14px] h-[14px]"
            v-show="gameItem.sportsType === 1"
            src="@/assets/img-zuqiu.png"
            alt=""
            :class="{
              rotate: FOOTBALL_STYLE_STATUS_ARR.find(
                s => s === gameItem.statusID
              )
            }"
          />

          <img
            class="w-[14px] h-[14px]"
            v-show="gameItem.sportsType === 2"
            src="@/assets/img-lanqiu.png"
            alt=""
            :class="{
              rotate: BASKETBALLSTYLE_STATUS_ARR.find(
                s => s === gameItem.statusID
              )
            }"
          />
          <span class="mx-[5px]">{{
            parseTime(gameItem.matchTime, "{h}:{i}")
          }}</span>
          <span>{{ gameItem.competitionName }} </span>
        </div>

        <div
          class="text-[12px] flex items-center font-bold text-[#999999] leading-[14px]"
          :class="{
            liveActive: FOOTBALL_STYLE_STATUS_ARR.find(
              s => s === gameItem.statusID
            )
          }"
          v-if="gameItem.sportsType === 1"
        >
          <img
            class="w-[14px] h-[14px]"
            v-if="
              gameItem.hotCompetition &&
              FOOTBALL_STYLE_STATUS_ARR.find(s => s === gameItem.statusID)
            "
            src="@/assets/img-huo.gif"
            alt=""
          />

          <span class="mx-[4px]">{{ FOOTBALL_TYPE[gameItem.statusID] }}</span>

          <span v-if="gameItem.liveTime || gameItem.statusID === 3">
            {{ getMinutesPassed(gameItem)
            }}{{
              getMinutesPassed(gameItem) === 46 ||
              getMinutesPassed(gameItem) === 90
                ? "+"
                : ""
            }}<span>'</span>
          </span>
        </div>

        <div
          v-else
          class="text-[12px] flex items-center text-center font-bold text-[#999999] leading-[14px]"
          :class="{
            liveActive: BASKETBALLSTYLE_STATUS_ARR.find(
              s => s === gameItem.statusID
            )
          }"
        >
          <img
            v-if="
              gameItem.hotCompetition &&
              BASKETBALLSTYLE_STATUS_ARR.find(s => s === gameItem.statusID)
            "
            class="w-[14px] h-[14px]"
            src="@/assets/img-huo.gif"
            alt=""
          />

          <span class="mx-[4px]">{{ BASKETBALL_TYPE[gameItem.statusID] }}</span>

          <span v-if="gameItem.liveTime !== 0">
            {{ gameItem.basketball_time }}</span
          >
        </div>

        <div class="min-w-[70px]">
          <div
            class="flex justify-end font-bold text-[#58C6C6] leading-[14px]"
            v-if="
              gameItem.sportsType === 1
                ? F_LIVE_STATUS.find(s => s === gameItem.statusID)
                : B_LIVE_STATUS.find(s => s === gameItem.statusID)
            "
          >
            <img
              class="w-[14px] h-[14px] mr-[4px]"
              src="@/assets/icon-bo-active.png"
              alt=""
            />
            <span>直播中</span>
          </div>
        </div>
      </div>

      <div class="line h-[0.4px] my-[10px]"></div>

      <!-- center part -->
      <!-- 足球 -->
      <div
        class="flex items-center justify-center"
        v-if="gameItem.sportsType === 1"
      >
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

          <span
            class="van-ellipsis max-w-[74px] text-rigth ml-[5px]"
            :class="{ activeBg: gameItem.home_bgActive }"
          >
            {{ gameItem.homeTeamName }}</span
          >
          <img
            class="w-[14px] h-[14px] ml-[6px]"
            :src="gameItem.homeTeamLogo"
            v-if="gameItem.homeTeamLogo"
            alt=""
          />
        </div>

        <div class="text-[14px] font-bold text-center mx-[10px]">
          <span v-if="gameItem.statusID === 1">VS</span>
          <span
            v-else
            :class="{ blink: gameItem.away_bgActive || gameItem.home_bgActive }"
          >
            {{ gameItem.homeScores[0] }}
            -
            {{ gameItem.awayScores[0] }}
          </span>
        </div>

        <div
          class="flex items-center text-[12px] font-bold leading-[16px] min-w-[120px]"
        >
          <img
            class="w-[14px] h-[14px] mr-[6px]"
            v-if="gameItem.awayTeamLogo"
            :src="gameItem.awayTeamLogo"
            alt=""
          />
          <span
            class="van-ellipsis max-w-[74px] text-left"
            :class="{ activeBg: gameItem.away_bgActive }"
            >{{ gameItem.awayTeamName }}</span
          >

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
      <!-- 篮球 -->
      <div
        class="flex items-center justify-center"
        v-if="gameItem.sportsType === 2"
      >
        <div
          class="flex items-center justify-end min-w-[120px] text-[12px] font-bold"
        >
          <span
            class="van-ellipsis max-w-[74px] text-rigth ml-[5px]"
            :class="{ activeBg: gameItem.away_bgActive }"
          >
            {{ gameItem.awayTeamName }}</span
          >
          <img
            class="w-[14px] h-[14px] ml-[6px]"
            v-if="gameItem.awayTeamLogo"
            :src="gameItem.awayTeamLogo"
            alt=""
          />
        </div>

        <div class="text-[14px] font-bold text-center mx-[10px]">
          <span v-if="gameItem.statusID === 1">VS</span>
          <span
            v-else
            :class="{ blink: gameItem.away_bgActive || gameItem.home_bgActive }"
          >
            {{ gameItem.away_basketball_score }}
            -
            {{ gameItem.home_basketball_score }}
          </span>
        </div>

        <div
          class="flex items-center text-[12px] font-bold leading-[16px] min-w-[120px]"
        >
          <img
            class="w-[14px] h-[14px] mr-[6px]"
            :src="gameItem.homeTeamLogo"
            v-if="gameItem.homeTeamLogo"
            alt=""
          />
          <span
            class="van-ellipsis max-w-[74px] text-left"
            :class="{ activeBg: gameItem.home_bgActive }"
            >{{ gameItem.homeTeamName }}</span
          >
        </div>
      </div>

      <!-- bottom part -->
      <div class="flex items-center justify-center relative leading-[16px]">
        <div
          class="flex items-center justify-end min-w-[100px]"
          :class="{ blink: gameItem.asia_zhiActive }"
        >
          <span v-if="gameItem.sportsType === 1">
            {{ gameItem.asia.split(",").slice(0, 3).join(" ") }}
          </span>
          <span v-else>
            {{
              gameItem.statusID !== 9
                ? gameItem.awayScores
                    .slice(0, gameItem.homeScores.length - 1)
                    .join(" ")
                : gameItem.awayScores
                    .slice(0, gameItem.homeScores.length)
                    .join(" ")
            }}
          </span>
        </div>

        <div class="mx-[14px] min-w-[40px]">
          <div v-if="gameItem.sportsType === 1">
            <span>
              半:
              <span :class="{ blink: gameItem.asia_zhiActive }"
                >{{ gameItem.homeScores[1] }}-{{ gameItem.awayScores[1] }}
              </span>
            </span>

            <span class="ml-[4px]">
              角:
              <span :class="{ blink: gameItem.bs_zhiActive }">
                {{ gameItem.homeScores[4] }}-{{ gameItem.awayScores[4] }}
              </span>
            </span>
          </div>
          <div v-if="gameItem.sportsType === 2">
            <span>
              让:
              <span :class="{ blink: gameItem.asia_zhiActive }">{{
                gameItem.basketball_rang
              }}</span>
            </span>

            <span class="ml-[10px]">
              总:
              <span :class="{ blink: gameItem.bs_zhiActive }"
                >{{ gameItem.basketball_zong }}
              </span></span
            >
          </div>
        </div>
        <div
          class="flex items-center min-w-[100px]"
          :class="{ blink: gameItem.bs_zhiActive }"
        >
          <span v-if="gameItem.sportsType === 1">
            {{ gameItem.bs.split(",").slice(0, 3).join(" ") }}
          </span>
          <span v-else>
            {{
              gameItem.statusID !== 9
                ? gameItem.homeScores
                    .slice(0, gameItem.homeScores.length - 1)
                    .join(" ")
                : gameItem.homeScores
                    .slice(0, gameItem.homeScores.length)
                    .join(" ")
            }}
          </span>
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
        @click.stop="onClikeTop(gameItem)"
      />
      <img
        v-show="dataOrgin === 'topKey'"
        class="w-[10px] h-[9px] ml-[8px] absolute left-[2px] bottom-[8px]"
        src="@/assets/img-top-ok.png"
        alt=""
        @click.stop="onClikeTopClose(gameItem)"
      />
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

import { ref, reactive, getCurrentInstance, onMounted, watch } from "vue";
import { showFailToast, showSuccessToast, showToast } from "vant";
import "vant/es/toast/style";

import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

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

const onToDetails = item => {
  console.log("item", item);
  router.push({
    path: `/details/player/index`,
    query: {
      sportsType: item.sportsType,
      matchID: item.id
    }
  });
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

.activeBg {
  background-color: #3ccac8;
  // animation: fadeOutBackground 1s forwards;
}

@keyframes fadeOutBackground {
  to {
    background-color: transparent;
  }
}

.blink {
  animation: blink 1s infinite;
}
@keyframes blink {
  0% {
    color: rgb(0, 0, 0);
  }
  50% {
    color: red;
  }
  100% {
    color: rgb(0, 0, 0);
  }
}
</style>
