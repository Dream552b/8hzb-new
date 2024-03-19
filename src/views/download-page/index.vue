<template>
  <div>
    <TopNavBar title="8号直播" />

    <div class="px-[24px] pt-[44px]">
      <div class="flex flex-col justify-center mt-[20px]">
        <div class="flex justify-center">
          <img
            class="w-[50px] h-[50px] mr-[10px]"
            src="@/assets/img-xia-logo.png"
            alt=""
          />
          <div class="text-[#000000] flex flex-col justify-center">
            <p class="font-bold text-[12px]">千万体育用户的共同选择</p>
            <p class="text-[10px]">体验抢先看球</p>
          </div>
        </div>
        <div class="mt-[12px] flex items-center justify-center">
          <div class="flex">
            <img
              class="w-[10px] h-[10px] mr-[6px]"
              src="@/assets/img-xing.png"
              alt=""
              v-for="index in 5"
              :key="index"
            />
          </div>
          <span>6978万次安装</span>
        </div>
      </div>
      <div
        class="mt-[20px] w-full bg-[#fff] rounded-[20px] flex flex-col justify-center items-center box-show"
      >
        <img
          class="w-[90px] h-[24px] mr-[6px]"
          src="@/assets/img-jieshao.png"
          alt=""
        />
        <div class="text-[ #333333] px-[14px] text-[11px]">
          <div class="mb-[16px] mt-[12px]">
            8号直播为广大球迷提供精准的赛事信息、赛事即时比分、高清视频直播、动画直播、赛事数据分析、赛事资讯，免费为您提供专业赛事，数据支持，赛程数据实时更新。我们有的都给您。
          </div>
          <div class="mb-[16px]">
            【即时比分】足球篮球网球比分实时更新，无需守在视频直播前，即可快速了解多场足球篮球比赛的实时赛况、比赛结果等信息。
          </div>
          <div class="mb-[16px]">
            【全球体育赛事】覆盖全球2600+足球篮球网球不同赛事，包含:欧洲杯、欧冠杯、亚冠杯、中超、英超、西甲、德甲、意甲、法甲、日职联、韩K联、澳超、NBA.CBA等赛事资讯战报实时推送，满足不同类型体育爱好者
          </div>
          <div class="mb-[16px]">
            【比赛】足球赛事全搜罗,赛前分析、图文直播、赛况数据、阵容评分、比赛集锦,帮助你了解比赛的方方面面
          </div>
          <div class="mb-[16px]">
            【足篮资料库】为您查询全球联赛、杯赛积分榜,看群雄逐鹿;各类球队、球员、射手榜、助攻榜,观足坛英豪。
          </div>
          <div class="mb-[16px]">
            【数据】专业赛事,赛程数据实时更新，从进球时间分布交锋记录、近期战绩、联赛积分等多维度数据为您分析。
          </div>
        </div>
      </div>

      <div class="mt-[28px]" v-if="isShow">
        <van-button
          type="primary"
          color="#1FCBCA"
          round
          block
          @click="onDownload"
          >立即下载</van-button
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import TopNavBar from "@/components/TopNavBar/index.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();

const isShow = ref(true);

if (route.query.from == "app") {
  isShow.value = false;
}

const onDownload = () => {
  // App 下载链接
  const appDownloadUrl =
    "https://shuqian.wangcaishuqian.com/webclip/single/b59809d1";
  location.href = appDownloadUrl;
};
</script>

<style lang="less" scoped>
.box-show {
  box-shadow: 0px 13px 28px -27px rgba(0, 0, 0, 0.54);
}
</style>
