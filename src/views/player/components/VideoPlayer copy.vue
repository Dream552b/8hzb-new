<template>
  <video ref="videoPlayer" id="videoPlayer" class="video-js vjs-fluid w-full"></video>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import 'videojs-flvjs-es6'
import video_zhCN from 'video.js/dist/lang/zh-CN.json'
import { QualitySelectorBar } from './QualitySelectorBar'
let videoInstance = null
const props = defineProps({
  sources: {
    type: Array,
    default: () => []
  }
})

const options = {
  autoplay: true,
  controls: true,
  flvjs: {
    mediaDataSource: {
      isLive: true,
      cors: true,
      withCredentials: false
    }
  },
  sources: [],
  language: 'zh-CN',
  controlBar: {
    children: [
      'PlayToggle', // 播放
      'VolumePanel', // 音量
      'LiveDisplay', // 是否直播
      'CurrentTimeDisplay', // 当前时间
      'ProgressControl', // 进度条
      'DurationDisplay', // 时长
      'RemainingTimeDisplay',
      {
        name: 'QualitySelectorBar',
        qualityOptions: [
          //   传递给QualitySelector的选项
          {
            label: '1080p',
            value: 'high',
            selected: true,
            src: 'https://play.xshuijiu.cn/live/sd-2-3735776.flv'
          },
          {
            label: '720p',
            value: 'medium',
            src: 'https://www.w3school.com.cn/example/html5/mov_bbb.mp4'
          },
          {
            label: '480p',
            value: 'low',
            src: 'https://play.xshuijiu.cn/live/sd-2-3735776.flv'
          }
        ]
      },
      'FullscreenToggle' // 全屏/ 画质选择
    ]
  }
}

const init = (optionsData) => {
  console.log("🚀 ~ init ~ optionsData:", optionsData)
  const mergedOptions = { ...options, ...optionsData }
  console.log('🚀 ~ init ~ mergedOptions:', mergedOptions)
  videojs.addLanguage('zh-CN', video_zhCN)
  videojs.registerComponent('QualitySelectorBar', QualitySelectorBar)
  videoInstance = videojs('#videoPlayer', mergedOptions, () => {})
}

onMounted(() => {
//   const mergedOptions = {
//     ...options,
//     sources: [
//       {
//         src: 'https://play.xshuijiu.cn/live/sd-2-3736085.flv',
//         name: '高清',
//         type: 'video/flv',
//         selected: true
//       },
//       {
//         src: 'https://play.xshuijiu.cn/live/hd-zh-2-3736085.flv',
//         name: '中文蓝光',
//         type: 'video/flv',
//         selected: false
//       },
//       {
//         src: 'https://play.xshuijiu.cn/live/hd-en-2-3736085.flv',
//         name: '英文蓝光',
//         type: 'video/flv',
//         selected: false
//       }
//     ]
//   }
//   console.log('🚀 ~ init ~ mergedOptions:', mergedOptions)
//   videojs.addLanguage('zh-CN', video_zhCN)
//   videojs.registerComponent('QualitySelectorBar', QualitySelectorBar)
//   videoInstance = videojs('#videoPlayer', mergedOptions, () => {})
  //   window.flvjs = flvjs
  // window.Flvjs = Flvjs
  //   videojs.addLanguage('zh-CN', video_zhCN)
  //   videojs.registerComponent('QualitySelectorBar', QualitySelectorBar)
  // videojs.registerPlugin('flvjs', Flvjs)
})
onBeforeUnmount(() => {
  if (videoInstance) {
    videoInstance.dispose()
  }
})

defineExpose({
  init
})
</script>
