<script setup>
import { ref, onMounted, watch } from "vue";
import { socket, socketState } from "@/utils/socket";
import MarqueeText from "vue-marquee-text-component";

const props = defineProps({
  advInfo: {
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
        } else {
          //篮球 篮球：第二节完（中场）5，第三节6（下半场）
          zhong.value = obj.statusID === 5;
        }
      }
    }
  );
});
</script>

<template>
  <div class="w-full flex flex-col absolut z-10 top-0 left-0">
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
      class="mt-[10px] flex absolute left-[10px] top-[40px]"
      v-if="!advInfo.midfieldDisplay || zhong"
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
      class="absolute top-[168px]"
      :class="advInfo.position === 1 ? 'left-[10px]' : 'right-[10px]'"
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
  background: rgba(0, 0, 0, 0.3);
}
</style>
