<template>
  <div class="nav-wrap w-full fixed top-0">
    <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ""
  }
});

const onClickLeft = () => {
  history.back();
};
</script>

<style lang="less"></style>
