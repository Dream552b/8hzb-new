<template>
  <!-- <video-player
    class="video-player vjs-theme-forest"
    poster=""
    crossorigin="anonymous"
    playsinline
    controls
    autoplay
    :volume="0.6"
    :height="234"
    :techOrder="['html5', 'flvjs']"
    @mounted="handleMounted"
  /> -->

  <!-- v-model:height="config.height" -->
  <div class="w-full h-[234px]">
    <video-player
      class="w-full h-full"
      :class="['video-player', 'vjs-big-play-centered', { loading: !state }]"
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
      @seeking="handleSeeking"
    >
    </video-player>
  </div>
</template>

<script setup>
import { defineComponent, defineProps, ref, watch } from "vue";
import { VideoPlayer } from "@videojs-player/vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import video_zhCN from "./zh-CN.json";
import "videojs-flvjs-es6";
videojs.addLanguage("zh-CN", video_zhCN);

const props = defineProps({ videoOrigin: String });

const mediaConfig = ref({
  sources: props.videoOrigin,
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
  controls: true,
  fluid: false,
  muted: false,
  loop: false
});

const playerSave = ref(null);
const handleMounted = ({ player }) => {
  console.log("playerplayer", player);
};
const handleEvent = log => {
  console.log("Basic player event", log);
};

const handleSeeking = log => {
  console.log("log", log);
};

watch(
  () => props.videoOrigin,
  val => {
    console.log("val-----", val);

    console.log("mediaConfig.value.sources", mediaConfig.value.sources);

    mediaConfig.value.sources = val;
    // handleMounted(playerSave.value);
  }
);
</script>

<style lang="less" scoped>
.video-player {
  width: 100%;
  :deep(.vjs-big-play-button) {
    width: 84px !important;
    // height: 44px !important;
  }
}
</style>
