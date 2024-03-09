<template>
  <video-player
    class="video-player vjs-theme-forest"
    crossorigin="anonymous"
    playsinline
    controls
    src=""
    :volume="0.6"
    :height="320"
    :techOrder="['html5', 'flvjs']"
    @mounted="handleMounted"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VideoPlayer } from "@videojs-player/vue";
import videojs from "video.js";
import "video.js/dist/video-js.css";

type VideoJsPlayer = ReturnType<typeof videojs>;

export default defineComponent({
  name: "vue-flv-player-example",
  title: "FLV player (Vue)",
  url: import.meta.url,
  components: {
    VideoPlayer
  },
  setup() {
    const handleMounted = ({ player }: { player: VideoJsPlayer }) => {
      // flv.js runs only in the browser environment and does an asynchronous processing for SSR prerender.
      console.log("加载来了么");

      import("./06-flv-video-tech").then(({ FlvJsTech }) => {
        videojs.registerTech("Flvjs", FlvJsTech);
        player.src("https://play.xshuijiu.cn/live/sd-1-4053959.flv");
      });
    };

    return { handleMounted };
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

.video-player {
  background-color: $black;
  width: 100%;
}
</style>
