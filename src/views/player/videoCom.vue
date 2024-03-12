<template>
  <!-- m3u8格式视频展示 -->
  <div
    class="relative w-full h-[234px] bg-[#000] truncate"
    @click="onClikeVideo"
  >
    <!-- <img
      class="w-[125px] h-[30px] z-10 absolute left-0 top-0 bottom-0 right-0 m-auto"
      src="@/assets/img-video-logo.png"
      alt=""
      @click="onIsPlay"
    /> -->

    <!-- 暂停 播放按钮 -->
    <div
      class="play-btn w-[50px] h-[40px] flex justify-center items-center rounded-[6px] z-10 absolute left-0 top-0 bottom-0 right-0 m-auto"
      v-show="isShowBox"
      @click.stop="onIsPlay"
    >
      <svg-icon
        class="text-[#fff] text-[20px]"
        name="icon-play"
        v-show="!playing"
      />

      <svg-icon
        v-show="playing"
        class="text-[#fff] text-[20px]"
        name="icon-stop-play"
      />
    </div>
    <div
      class="flex justify-center items-center rounded-[6px] z-1 absolute left-0 top-0 bottom-0 right-0 m-auto"
    >
      <van-loading v-if="videoOrigin.length" type="spinner" size="24px" />
      <span v-if="!videoOrigin.length" class="text-[#fff] text-[10px]"
        >没有找到直播源...</span
      >
    </div>

    <video
      ref="videoM3u8"
      class="videoElement"
      id="videobox"
      preload="auto"
      webkit-playsinline="true"
      playsinline="true"
      x-webkit-airplay="true"
      x5-video-player-type="h5"
      x5-video-player-fullscreen="true"
      x5-video-orientation="portraint"
      v-show="flag === true"
    ></video>

    <!-- flv格式视频展示 -->
    <video
      ref="videoRef"
      v-show="flag === false"
      autoplay
      class="videoElement"
      webkit-playsinline="true"
      playsinline="true"
      x5-video-player-type="h5-page"
    ></video>

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
        <span>标清</span>
        <svg-icon
          class="text-[#fff] text-[16px] ml-[10px]"
          name="full-icon"
          @click="onFullVideo"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Hls from "hls.js";
import flvjs from "flv.js";
import { ref, onUnmounted, nextTick, onMounted, watch } from "vue";

const props = defineProps({
  videoOrigin: {
    type: String,
    default: ""
  }
});
// m3u8格式视频使用变量
const player = ref(null);
const videoM3u8 = ref(null);
// flv格式视频使用
const videoRef = ref(null);
let flvPlayer = null;
// 这个变量用来判断是哪个格式视频就进入哪个(默认m3u8)
let flag = ref(true);

const isShowBox = ref(false);
const showFull = ref(true);
const playing = ref(false); // 是否播放中

const onClikeVideo = () => {
  isShowBox.value = !isShowBox.value;
};

const onFullVideo = () => {
  let video = flag.value ? videoM3u8.value : videoRef.value;

  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  } else if (video.webkitEnterFullscreen) {
    video.webkitEnterFullscreen();
  } else if (video.webkitExitFullscreen) {
    video.webkitExitFullscreen();
  }
};

const onIsPlay = () => {
  let elVideo = flag.value ? videoM3u8.value : videoRef.value;

  if (playing.value) {
    elVideo.pause();
    playing.value = false;
  } else {
    elVideo.play();
    playing.value = true;
  }
};

const initVideo = () => {
  // 固定链接
  // let videosrc = ref("https://8hzb.xyz/8hzb/1709609814031.flv");
  // let videosrc = ref("https://demo.m3u8play.com/m3u8/out/demo.m3u8");

  let videosrc = ref(props.videoOrigin);
  // 下面是通过请求获得的链接(动态显示)
  // 截取链接,判断是什么格式的视频(判断格式让对应显示)
  flag.value = videosrc.value.includes(".m3u8"); // 只能返回true或者false
  console.log("flag.value", flag.value);

  if (flag.value) {
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videosrc.value);
      hls.attachMedia(videoM3u8.value);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        videoM3u8.value.play(); // 视频加载完成后自动播放
      });

      // 添加视频播放事件
      videoM3u8.value.addEventListener("play", () => {
        console.log("视频开始播放");
        // 在视频播放时执行相应操作
      });

      // 添加视频暂停事件
      videoM3u8.value.addEventListener("pause", () => {
        console.log("视频已暂停");
        // 在视频暂停时执行相应操作
      });

      // 添加视频暂停事件
      videoM3u8.value.addEventListener("fullScreen", () => {
        console.log("视频全屏");
      });
    }
    // else if (videoM3u8.canPlayType("application/vnd.apple.mpegurl")) {
    //   videoM3u8.value.src = videosrc.value;
    //   videoM3u8.addEventListener("loadedmetadata", function () {
    //     videoM3u8.value.play();
    //   });
    // }
    // console.log("video.value", videoM3u8.value);
    // console.log("video", videoM3u8);
    // console.log("videoM3u8.value", videoM3u8.value);
  } else {
    // 创建 FLV 播放器实例
    flvPlayer = flvjs.createPlayer(
      {
        type: "flv",
        isLive: true,
        url: videosrc.value // 替换为实际的 FLV 视频 URL
      },
      {
        enableWorker: true, // 启用分离的线程进行转换
        enableStashBuffer: false, // 关闭IO隐藏缓冲区
        stashInitialSize: 128 // 减少首帧显示等待时长
      }
    );
    console.log("flvPlayer", flvPlayer);
    // 绑定 FLV 播放器到 <video> 标签
    flvPlayer.attachMediaElement(videoRef.value);
    // 初始化 FLV 播放器
    flvPlayer.load();
    flvPlayer.play();
    console.log("flvPlayer", flvPlayer);
  }
};

watch(
  () => props.videoOrigin,
  val => {
    console.log("val", val);
    initVideo();
  }
);

onMounted(() => {});
</script>

<style lang="less" scoped>
.videoElement {
  width: 100%;
  height: 234px;
}

.gradient-box {
  height: 30px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));

  transition: transform 0.5s ease; /* 过渡效果 */
  transform: translateY(40px);
}
.translated {
  transform: translateY(0);
}
.play-btn {
  background: rgba(255, 255, 255, 0.1);
}
</style>
