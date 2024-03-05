<!-- <template>
  <div>
    <div>
      <video autoplay controls width="100%" height="234" id="myVideo"></video>
    </div>
  </div>
</template> -->

<template>
  <!-- m3u8格式视频展示 -->
  <video
    ref="video"
    class="videoElement"
    autoplay
    controls
    muted
    v-show="flag === true"
  ></video>
  <!-- flv格式视频展示 -->
  <video
    ref="videoRef"
    v-show="flag === false"
    autoplay
    muted
    class="videoElement"
    controls
  ></video>
</template>

<script setup>
import Hls from "hls.js";
import flvjs from "flv.js";
import { ref, onUnmounted, nextTick, onMounted } from "vue";

// m3u8格式视频使用变量
const player = ref(null);
const video = ref(null);
// flv格式视频使用
const videoRef = ref(null);
let flvPlayer = null;
// 这个变量用来判断是哪个格式视频就进入哪个(默认m3u8)
let flag = ref(true);
onMounted(() => {
  console.log("12312---31");

  // 在页面刚加载就显示视频
  // 这个是视频链接
  // m3u8地址:https://gc2ksc.v.kcdnvip.com/gc/zsslsjjfsd_1/index.m3u8?BR=md&region=shanghai
  // flv地址:http://video.epaper.pybtv.cn:8080/live/rtmp_live_demo.flv

  // 固定链接
  let videosrc = ref("https://play.xshuijiu.cn/live/sd-1-4093930.flv");
  // 下面是通过请求获得的链接(动态显示)
  // let videosrc = ref(gameScreenList.gameInfo.live_event)
  // 截取链接,判断是什么格式的视频(判断格式让对应显示)
  flag.value = videosrc.value.includes(".m3u8"); // 只能返回true或者false
  //   gameScreenList.gameLivePlayFlag = false;
  if (flag.value) {
    console.log("123123123");

    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videosrc.value);
      hls.attachMedia(video.value);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        video.value.play();
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.value.src = videosrc.value;
      video.addEventListener("loadedmetadata", function () {
        video.value.play();
      });
    }
  } else {
    console.log("1231231888823");

    // 创建 FLV 播放器实例
    flvPlayer = flvjs.createPlayer({
      type: "flv",
      url: videosrc.value // 替换为实际的 FLV 视频 URL
    });
    console.log("flvPlayer", flvPlayer);
    // 绑定 FLV 播放器到 <video> 标签
    flvPlayer.attachMediaElement(videoRef.value);
    // 初始化 FLV 播放器
    flvPlayer.load();
    flvPlayer.play();
  }
});
</script>

<style scoped></style>
