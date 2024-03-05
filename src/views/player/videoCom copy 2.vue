<template>
  <div class="preview">
    <div class="videoArea">
      <video
        id="videoElement"
        crossOrigin="anonymous"
        controls
        autoplay
        muted
        width="100%"
        height="800px"
      ></video>
    </div>
  </div>
</template>
<script>
import flvjs from "flv.js";
export default {
  data() {
    return {
      isPlay: false,
      player: null
    };
  },
  methods: {
    // 设置视频配置(注意：createVideo应放在异步函数里或mounted之后，不可在created里直接加载，否则不生效)
    createVideo() {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById("videoElement");
        this.player = flvjs.createPlayer(
          {
            type: "flv",
            isLive: true,
            hasAudio: false,
            url: "https://play.xshuijiu.cn/live/sd-1-4093930.flv" // 自己的flv视频流
          },
          {
            cors: true, // 是否跨域
            // enableWorker: true, // 是否多线程工作
            enableStashBuffer: false, // 是否启用缓存
            stashInitialSize: 128, // 缓存大小(kb)  默认384kb
            autoCleanupSourceBuffer: true // 是否自动清理缓存
          }
        );
        this.player.attachMediaElement(videoElement); //挂载元素
        this.player.load(); //加载流
        this.player.play(); //播放流
      }
      // 报错重连
      this.player.on(flvjs.Events.ERROR, (err, errdet) => {
        // 参数 err 是一级异常，errdet 是二级异常
        if (err == flvjs.ErrorTypes.MEDIA_ERROR) {
          console.log("媒体错误");
          if (errdet == flvjs.ErrorDetails.MEDIA_FORMAT_UNSUPPORTED) {
            console.log("媒体格式不支持");
          }
        }
        if (err == flvjs.ErrorTypes.NETWORK_ERROR) {
          console.log("网络错误");
          if (errdet == flvjs.ErrorDetails.NETWORK_STATUS_CODE_INVALID) {
            console.log("http状态码异常");
          }
        }
        if (err == flvjs.ErrorTypes.OTHER_ERROR) {
          console.log("其他异常：", errdet);
        }
        if (this.player) {
          this.destoryVideo();
          this.createVideo();
        }
      });
    },
    destoryVideo() {
      if (this.player) {
        this.player.pause(); // 暂停播放数据流
        this.player.unload(); // 取消数据流加载
        this.player.detachMediaElement(); // 将播放实例从节点中取出
        this.player.destroy(); // 销毁播放实例
        this.player = null;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.createVideo();
    });
  },
  beforeDestroy() {
    this.destoryVideo();
  }
};
</script>
<style lang="scss" scoped></style>
