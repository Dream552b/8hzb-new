<template>
  <div class="content-wrap">
    <!-- <nav-bar /> -->

    <GameWrap />

    <fixed-ad />
  </div>
</template>

<script setup name="">
import NavBar from "@/components/NavBar/index.vue";
import FixedAd from "@/components/FixedAd/index.vue";
import GameWrap from "@/components/Competition/gameWrap.vue";

import { reactive } from "vue";
</script>

<style lang="less" scope>
.content-wrap {
  background: #f7f7f7;
}
</style>
