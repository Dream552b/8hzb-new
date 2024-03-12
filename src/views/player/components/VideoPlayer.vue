<template>
  <div class="w-full h-[234px] relative truncate">
    <video-player
      class="w-full h-full"
      :class="[
        'video-player',
        'vjs-big-play-centered',
        { loading: !videoStateObj }
      ]"
      ref="videoLive"
      :sources="mediaConfig.sources"
      :poster="mediaConfig.poster"
      :tracks="mediaConfig.tracks"
      :autoplay="config.autoplay"
      :playbackRates="config.playbackRates"
      :fluid="config.fluid"
      :loop="config.loop"
      language="zh-CN"
      ontSupportedMessage="此视频无法播放"
      crossorigin="anonymous"
      playsinline
      v-model:volume="config.volume"
      v-model:playbackRate="config.playbackRate"
      v-model:controls="config.controls"
      v-model:muted="config.muted"
      @mounted="handleMounted"
      @loadstart="handleLoadstart"
      @seeking="handleSeeking"
      @error="handleError"
      @readonly="handleReadonly"
      @metaloaded="handleMetaloaded"
      @stopped="handleStopped"
      @paused="handlePaused"
      @playing="handlePlaying"
      @canplay="handleCanplay"
      @play="handlePlay"
    >
    </video-player>

    <videoStatus v-if="isShowVideoStatus" :videoStatusNum="videoStatusNum" />

    <!-- 自定义状态栏 -->
    <div
      class="gradient-box fade-in-out text-[#fff] w-full absolute z-[100] bottom-0 flex justify-between items-center px-[20px] text-[10px]"
      :class="isShowBox ? 'translated' : ''"
      @click.stop=""
    >
      <div class="flex items-center">
        <div class="w-[4px] h-[4px] bg-[#27c5c3] rounded-[50%] mr-[6px]"></div>
        <span>直播中</span>
      </div>
      <div class="flex items-center">
        <span>{{ props.videoOrigin.name || "" }}</span>
        <svg-icon
          class="text-[#fff] text-[16px] ml-[10px]"
          name="full-icon"
          @click="
            videoStateObj.isFullscreen
              ? videoPlayerObj.exitFullscreen()
              : videoPlayerObj.requestFullscreen()
          "
        />
      </div>
    </div>

    <!-- 暂停 播放按钮 -->
    <div class="w-full h-[234px] absolute left-0 top-0" @click="onClikeVideo">
      <div v-if="videoStateObj">
        <div
          class="play-btn w-[50px] h-[40px] flex justify-center items-center rounded-[6px] z-10 absolute left-0 top-0 bottom-0 right-0 m-auto"
          v-show="isShowBox"
          @click.stop="onIsPlay"
        >
          <svg-icon
            class="text-[#fff] text-[20px]"
            name="icon-play"
            v-show="!videoStateObj.playing"
          />

          <svg-icon
            v-show="videoStateObj.playing"
            class="text-[#fff] text-[20px]"
            name="icon-stop-play"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, defineProps, ref, watch } from "vue";
import videoStatus from "./video-status.vue";
import { VideoPlayer } from "@videojs-player/vue";
import PlayerCustomControls from "./advanced.vue";

import videojs from "video.js";
import "video.js/dist/video-js.css";
import video_zhCN from "./zh-CN.json";
import "videojs-flvjs-es6";
videojs.addLanguage("zh-CN", video_zhCN);

const props = defineProps({ videoOrigin: Object, default: {} });

console.log("props.videoOrigin.url", props.videoOrigin.url);

const mediaConfig = ref({
  sources: props.videoOrigin.url,
  poster: "",
  tracks: ""
});
const playbackRatesOptions = [
  [1, 2, 3],
  [0.5, 1.5, 2.5]
];
const config = ref({
  autoplay: true,
  height: 234,
  volume: 0.8,
  playbackRate: 1,
  // playbackRates: playbackRatesOptions[0],
  controls: false,
  fluid: false,
  muted: false,
  loop: false
});

// 视频状态
const videoStateObj = ref(null);
// 视频实例对象
const videoPlayerObj = ref(null);

const videoStatusNum = ref(1); //视频状态
const isShowVideoStatus = ref(true);

const playerSave = ref(null);
const isShowBox = ref(false);

const onClikeVideo = () => {
  isShowBox.value = !isShowBox.value;
};

const onIsPlay = () => {
  // @click="state.playing ? player.pause() : player.play()"

  videoStateObj.value.playing
    ? videoPlayerObj.value.pause()
    : videoPlayerObj.value.play();
};

const handleMounted = payload => {
  // 视频对象
  videoStateObj.value = payload.state;
  videoPlayerObj.value = payload.player;
  // payload.player.play();
  console.log("handleMounted=====================视频对象加载完成", payload);
};

const handleEvent = log => {
  console.log("handleEvent", log);
};

//寻找中
const handleSeeking = log => {
  console.log("handleSeeking 寻找中*****", log);
};

const handleError = log => {
  videoStatusNum.value = 0;
  isShowVideoStatus.value = true;
  console.log("handleError", log);
};
const handleReadonly = log => {
  console.log("handleReadonly", log);
};

const handleMetaloaded = log => {
  console.log("handleMetaloaded", log);
};

const handleStopped = log => {
  console.log("handleStopped", log);
};
const handlePaused = log => {
  console.log("handlePaused", log);
};

//开始播放
const handlePlaying = log => {
  console.log("handlePlaying 开始播放", log);
  isShowVideoStatus.value = false;
};
//播放
const handlePlay = log => {
  console.log("handlePlay----播放", log);
  // isShowVideoStatus.value = false;
};

//可以播放，但中途可能因为加载而暂停
const handleCanplay = log => {
  console.log("handleCanplay----可以播放，但中途可能因为加载而暂停", log);
  isShowVideoStatus.value = false;
};

const handleLoadstart = log => {
  console.log("handleLoadstart 视频加载中", log);
  videoStatusNum.value = 1;

  // console.log("videoPlayerObj.value", videoPlayerObj.value);
  // videoPlayerObj.value.play();
};

watch(
  () => props.videoOrigin.url,
  val => {
    console.log("val-----", val);

    mediaConfig.value.sources = val;
  }
);
</script>

<style lang="less" scoped>
.video-player {
  width: 100%;
  :deep(.vjs-big-play-button) {
    width: 84px !important;
    display: none;
    // height: 44px !important;
  }
}

.gradient-box {
  height: 30px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));

  transition: transform 0.2s ease; /* 过渡效果 */
  transform: translateY(40px);
}
.translated {
  transform: translateY(0);
}
.play-btn {
  background: rgba(0, 0, 0, 0.4);
}
</style>
