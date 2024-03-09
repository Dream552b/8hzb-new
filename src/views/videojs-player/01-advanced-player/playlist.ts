// https://github.com/videojs/videojs.com/blob/main/src/components/HomeComponents/AdvancedExample/playlist.js
export const playlist = [
  {
    name: "mp4/webm/ogv",
    description: "Disney's Oceans",
    duration: 45,
    poster: "/images/poster/oceans.png",
    sources: [
      { src: "//vjs.zencdn.net/v/oceans.mp4", type: "video/mp4" },
      { src: "//vjs.zencdn.net/v/oceans.webm", type: "video/webm" },
      { src: "//vjs.zencdn.net/v/oceans.ogv", type: "video/ogg" }
    ]
  },
  {
    name: "m3u8/mp4",
    description: "Sintel",
    duration: 888,
    poster: "//d2zihajmogu5jn.cloudfront.net/sintel/poster.png",
    sources: [
      {
        src: "//d2zihajmogu5jn.cloudfront.net/sintel/master.m3u8",
        type: "application/x-mpegurl"
      },
      {
        src: "//d2zihajmogu5jn.cloudfront.net/sintel/sintel.mp4",
        type: "video/mp4"
      }
    ]
  },
  {
    name: "m3u8 HLS stream",
    description: "Apple's test HLS stream",
    duration: 1800,
    poster: "//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/poster.png",
    sources: [
      {
        src: "//d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
        type: "application/x-mpegurl"
      }
    ]
  },
  {
    name: "HLS/captions/description/chapters",
    description: `Elephant's Dream (HLS with captions, audio description and chapters)`,
    duration: 653,
    poster: "//d2zihajmogu5jn.cloudfront.net/elephantsdream/poster.png",
    sources: [
      {
        src: "//d2zihajmogu5jn.cloudfront.net/elephantsdream/hls/ed_hd.m3u8",
        type: "application/x-mpegurl"
      }
    ],
    textTracks: [
      {
        src: "//d2zihajmogu5jn.cloudfront.net/elephantsdream/chapters.en.vtt",
        kind: "chapters",
        srclang: "en",
        label: "English"
      }
    ]
  },
  {
    name: "mp4/captions/description/chapters",
    description:
      "Elephant's Dream (mp4 with separate text track audio description, captions, and chapters)",
    duration: 653,
    poster: "//d2zihajmogu5jn.cloudfront.net/elephantsdream/poster.png",
    sources: [
      {
        src: "https://play.xshuijiu.cn/live/sd-1-4092318.flv",
        type: " /flv"
      }
    ]
  },
  {
    name: "HLS Live stream",
    description: "",
    poster: "/images/example/4.jpg",
    sources: [
      {
        src: "https://play.xshuijiu.cn/live/sd-1-4048744.flv",
        type: "application/x-mpegURL"
      }
    ]
  }
];
