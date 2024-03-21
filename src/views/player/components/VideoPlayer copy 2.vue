<template>
  <div class="w-full h-[212px] relative truncate">
    <!-- disablePictureInPicture 取消画中画 h-[234px]  bg-[#000]  -->
    <!-- <video-player
      class="w-full h-full"
      :class="[
        'video-player',
        'vjs-big-play-centered',
        { loading: !videoStateObj }
      ]"
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
      width="375"
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
    </video-player> -->

    <video-player
      :class="['video-player', 'vjs-big-play-centered', { loading: !state }]"
      :sources="mediaConfig.sources"
      :poster="mediaConfig.poster"
      :tracks="mediaConfig.tracks"
      :autoplay="config.autoplay"
      :playbackRates="config.playbackRates"
      :fluid="config.fluid"
      :loop="config.loop"
      crossorigin="anonymous"
      playsinline
      :width="680"
      v-model:height="config.height"
      v-model:volume="config.volume"
      v-model:playbackRate="config.playbackRate"
      v-model:controls="config.controls"
      v-model:muted="config.muted"
      @mounted="handleMounted"
    >
    </video-player>
  </div>
</template>

<script setup>
import {
  defineComponent,
  defineProps,
  ref,
  watch,
  getCurrentInstance
} from "vue";
import videoStatus from "./video-status.vue";
import { VideoPlayer } from "@videojs-player/vue";
import PlayerCustomControls from "./advanced.vue";

import videojs from "video.js";
import "video.js/dist/video-js.css";
import video_zhCN from "./zh-CN.json";
import "videojs-flvjs-es6";
videojs.addLanguage("zh-CN", video_zhCN);

const { proxy } = getCurrentInstance();

const props = defineProps({
  videoOrigin: {
    type: Object,
    default: {}
  },
  // 回放
  isBackVideo: {
    type: Boolean,
    default: false
  }
});

const mediaConfig = ref({
  sources: props.videoOrigin.url,
  poster: "",
  tracks: ""
});
// const playbackRatesOptions = [[1, 2, 3], (0.5, 1.5, 2.5)];
const playbackRatesOptions = [[1, 2, 3], (0.5, 1.5, 2.5)];
const config = ref({
  autoplay: true,
  height: 234,
  volume: 0.8,
  playbackRate: 1,
  playbackRates: playbackRatesOptions[0],
  controls: true,
  fluid: true, // 铺满
  muted: false,
  loop: false
});

const isAppShow = ref(proxy.$cache.session.get("from") || "");

const isAppOnePlay = ref(false); //第一次播放

// 视频状态
const videoStateObj = ref(null);
// 视频实例对象
const videoPlayerObj = ref(null);

const videoStatusNum = ref(1); //视频状态
const isShowVideoStatus = ref(true);

const playerSave = ref(null);
const isShowBox = ref(false);
const vanloading = ref(true);
const saveTimeStamp = ref(null);

const onClikeVideo = () => {
  isShowBox.value = !isShowBox.value;
};

// 全屏
const onFullVideo = () => {
  videoStateObj.value.isFullscreen
    ? videoPlayerObj.value.exitFullscreen()
    : videoPlayerObj.value.requestFullscreen();

  if (!videoStateObj.value.playing) videoPlayerObj.value.play();
};

// 暂停 播放
const onIsPlay = () => {
  // 生成随机参数
  var timestamp = Date.now();

  console.log("timestamp", timestamp);
  console.log("saveTimeStamp.value", saveTimeStamp.value);

  if (!videoStateObj.value.playing) {
    console.log(
      "timestamp - saveTimeStamp.value",
      timestamp - saveTimeStamp.value
    );

    // 计算时间戳之间的毫秒数差
    var timeDiff = Math.abs(timestamp - saveTimeStamp.value);
    // 将毫秒数转换为秒数
    var secondsDiff = Math.floor(timeDiff / 1000);
    console.log("secondsDiff", secondsDiff);

    // 小于10秒不重新拉流
    if (saveTimeStamp.value && secondsDiff > 8) {
      let url = mediaConfig.value.sources.split("?")[0];
      url = url + "?timestamp=" + timestamp;

      videoStatusNum.value = 1;
      isShowVideoStatus.value = true;
      mediaConfig.value.sources = url;
    }
  } else {
    saveTimeStamp.value = timestamp;
  }

  videoStateObj.value.playing
    ? videoPlayerObj.value.pause()
    : videoPlayerObj.value.play();
};

const handleMounted = payload => {
  // 视频对象
  videoStateObj.value = payload.state;
  videoPlayerObj.value = payload.player;
  // console.log("handleMounted=====================视频对象加载完成", payload);
};

const handleEvent = log => {
  // console.log("handleEvent", log);
};

//寻找中
const handleSeeking = log => {
  // console.log("handleSeeking 寻找中*****", log);
};

const handleError = log => {
  videoStatusNum.value = 0;
  isShowVideoStatus.value = true;
  vanloading.value = false;

  console.log("handleError", log);
};
const handleReadonly = log => {
  // console.log("handleReadonly", log);
};

const handleMetaloaded = log => {
  // console.log("handleMetaloaded", log);
};

const handleStopped = log => {
  // console.log("handleStopped", log);
};
const handlePaused = log => {
  // console.log("handlePaused", log);
};

//开始播放
const handlePlaying = log => {
  // console.log("handlePlaying 开始播放", log);
  vanloading.value = false;
};
//播放
const handlePlay = log => {
  // console.log("handlePlay----播放", log);
  // isShowVideoStatus.value = false;
};

//可以播放，但中途可能因为加载而暂停; 直播画面出现了
const handleCanplay = log => {
  // console.log("handleCanplay----可以播放，但中途可能因为加载而暂停", log);
  // isShowVideoStatus.value = false;
  vanloading.value = false;
  // console.log("可以播放，但中途可能因为加载而暂停; 直播画面出现了");
  isShowVideoStatus.value = false;
  isAppOnePlay.value = true;
};

const handleLoadstart = log => {
  // console.log("handleLoadstart 视频加载中", log);

  videoStatusNum.value = 1;
  vanloading.value = true;
};

watch(
  () => props.videoOrigin.url,
  val => {
    console.log("val-----", val);

    mediaConfig.value.sources = val;
    vanloading.value = true;
  }
);
</script>

<style lang="less" scoped></style>
