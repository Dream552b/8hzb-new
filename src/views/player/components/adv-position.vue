<script setup>
import { ref, onMounted, watch } from "vue";
import { socket, socketState } from "@/utils/socket";
import MarqueeText from "vue-marquee-text-component";

const emits = defineEmits(["handlanGetMatchInfo"]);
const props = defineProps({
  advInfo: {
    type: Object,
    defalut: {}
  },
  matchInfo: {
    type: Object,
    defalut: {}
  },
  matchID: {
    type: Number,
    defalut: 0
  }
});
const zhong = ref(false); // 中场
const isScrollable = ref(true);

const noticeBarRef = ref(null);
const paused = ref(false);

const onClickBar = () => {
  paused.value = !paused.value;
  // console.log("noticeBarRef.value", noticeBarRef.value);

  // noticeBarRef.value?.reset();
  // isScrollable.value = !isScrollable.value;
};

onMounted(() => {
  // 中场
  watch(
    () => socketState.matchStatusIDChange,
    obj => {
      // console.log("obj 中场", obj, props.matchID);
      if (obj.matchID === props.matchID) {
        if (obj.sportsType === 1) {
          //足球 足球：中场3，下半场4
          zhong.value = obj.statusID === 3;

          if (props.statusID == 8) {
            // 比赛结束刷新详情接口
            emits("handlanGetMatchInfo");
          }
        } else {
          //篮球 篮球：第二节完（中场）5，第三节6（下半场）
          zhong.value = obj.statusID === 5;

          if (props.statusID == 10) {
            // 比赛结束刷新详情接口
            emits("handlanGetMatchInfo");
          }
        }
      }
    }
  );
});
</script>

<template>
  <div class="w-full h-[212px] flex flex-col absolut z-10 top-0 left-0">
    <!-- 黑板广告 -->
    <div
      v-if="false"
      class="absolute bottom-[6px] left-[6px] right-[6px] m-auto py-[2px] w-[90%] bg-[#000] text-[#fff] text-[12px]"
    >
      趁着比赛没开始,先下载泡泡和投注APP泡泡网址：ya.cn
      添加账号：meixi368下注网址: v5ty35.vip下载好了，跟主播一起边看球边下注
      趁着比赛没开始,先下载泡泡和投注应用泡泡网址:ya.cn添加账号:meixi368下注网址:v5ty35.vip下载好了,跟主播一起边看球边下注
    </div>

    <!-- 文字滚动 -->
    <div
      class="w-[100%] self-end flex flex-col wrap-bar"
      @click="onClickBar"
      v-if="advInfo.content"
    >
      <div
        class="w-[90%] h-[40px] px-[10px] self-end text-[#fff] flex items-center"
      >
        <MarqueeText :duration="25" :paused="paused">
          {{ advInfo.content }}</MarqueeText
        >
      </div>
    </div>
    <!-- 宣传图 -->
    <!-- midfieldDisplay = 1 中场才显示 -->
    <div
      class="mt-[10px] flex absolute left-[10px] top-[26px]"
      v-if="
        !advInfo.midfieldDisplay ||
        zhong ||
        (matchInfo.sportsType === 2 &&
          matchInfo.matchStatus === 5 &&
          advInfo.midfieldDisplay) ||
        (matchInfo.sportsType === 1 &&
          matchInfo.matchStatus === 3 &&
          advInfo.midfieldDisplay)
      "
    >
      <img
        :src="item"
        class="w-[70px] h-[110px] mr-[10px]"
        alt=""
        v-for="(item, index) in advInfo.imageArr"
        :key="index"
      />
    </div>
    <!-- 二维码 -->
    <div
      v-if="advInfo.qrcodeImageArr"
      class="absolute top-[152px]"
      :class="advInfo.position === 1 ? 'left-[6px]' : 'right-[10px]'"
    >
      <img
        :src="advInfo.qrcodeImageArr[0]"
        class="w-[40px] h-[40px]"
        :class="1 ? ' self-end' : ''"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.wrap-bar {
  background: rgba(0, 0, 0, 0.2);
}
</style>
