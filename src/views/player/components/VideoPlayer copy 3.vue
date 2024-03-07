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

  <video-player
    class="video-player vjs-big-play-centered"
    crossorigin="anonymous"
    playsinline
    controls
    :volume="0.6"
    :height="234"
    :techOrder="['html5', 'flvjs']"
    @mounted="handleMounted()"
    @ready="handleEvent($event)"
    @play="handleEvent($event)"
    @pause="handleEvent($event)"
    @ended="handleEvent($event)"
    @loadeddata="handleEvent($event)"
    @waiting="handleEvent($event)"
    @playing="handleEvent($event)"
    @canplay="handleEvent($event)"
    @canplaythrough="handleEvent($event)"
    @timeupdate="handleEvent(player?.currentTime())"
  />
</template>

<script setup>
import { defineComponent, defineProps } from "vue";
import VideoPlayer from "@videojs-player/vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/themes/dist/forest/index.css";

const props = defineProps({
  videoOrigin: {
    type: String,
    defalut: ""
  }
});

const handleMounted = ({ player }) => {
  console.log("来了么");

  // flv.js runs only in the browser environment and does an asynchronous processing for SSR prerender.
  import("./06-flv-video-tech").then(({ FlvJsTech }) => {
    videojs.registerTech("Flvjs", FlvJsTech);
    // player.src("https://play.xshuijiu.cn/live/sd-2-3736673.flv");
    player.src(props.videoOrigin);
  });
};
const handleEvent = log => {
  console.log("Basic player event", log);
};
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
