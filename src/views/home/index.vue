<template>
  <div class="content-wrap">
    <!-- <nav-bar @refreshListData="refreshListData" /> -->

    <GameWrap class="pt-[44px]" ref="childComponentRef" />

    <fixed-ad />
  </div>
</template>

<script setup name="">
import NavBar from "@/components/NavBar/index.vue";
import FixedAd from "@/components/FixedAd/index.vue";
import GameWrap from "@/components/Competition/gameWrap.vue";

import { reactive, ref } from "vue";

const childComponentRef = ref(null);

const refreshListData = tabObj => {
  childComponentRef.value?.refreshListData(tabObj);
};

defineExpose({ refreshListData });
</script>

<style lang="less" scope>
.content-wrap {
  background: #f7f7f7;
}
</style>
