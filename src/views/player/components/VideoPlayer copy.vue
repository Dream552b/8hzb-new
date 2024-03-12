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
    autoplay
    :volume="0.6"
    :height="234"
    :techOrder="['html5', 'flvjs']"
    @mounted="handleMounted"
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

<script lang="ts">
import { defineComponent, defineProps, ref, watch } from "vue";
import { VideoPlayer } from "@videojs-player/vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";
//import "@videojs/themes/dist/forest/index.css";

type VideoJsPlayer = ReturnType<typeof videojs>;

export default defineComponent({
  name: "vue-flv-player-example",
  title: "FLV player (Vue)",
  url: import.meta.url,
  components: {
    VideoPlayer
  },
  props: {
    videoOrigin: String
  },

  setup(props) {
    const playerSave = ref(null);
    const handleMounted = ({ player }: { player: VideoJsPlayer }) => {
      playerSave.value = player;

      // flv.js runs only in the browser environment and does an asynchronous processing for SSR prerender.
      import("./06-flv-video-tech").then(({ FlvJsTech }) => {
        videojs.registerTech("Flvjs", FlvJsTech);

        // flv 换成 m3u8
        let disURL =
          props.videoOrigin.substring(0, props.videoOrigin.length - 4) +
          ".m3u8";
        player.src(disURL);
      });
    };
    const handleEvent = (log: any) => {
      console.log("Basic player event", log);
    };

    watch(
      () => props.videoOrigin,
      val => {
        console.log("val-----", val);
        handleMounted(playerSave.value);
      }
    );

    return { handleMounted, handleEvent };
  }
});
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
