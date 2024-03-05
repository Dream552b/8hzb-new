<template>
  <van-tabbar
    v-model="active"
    :placeholder="true"
    :route="true"
    fixed
    active-color="#3ccac8"
    inactive-color="#000"
    @change="onChange"
  >
    <van-tabbar-item
      v-for="(item, index) in tabbarData"
      :key="index"
      :to="item.to"
    >
      <template #icon="">
        <svg-icon class="text-[24px]" :name="item.icon" />
      </template>
      <span> {{ item.title }}</span>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref, reactive } from "vue";

const emit = defineEmits(["changeTab"]);

const active = ref(0);
const tabbarData = reactive([
  {
    icon: "icon-heat",
    title: "热门",
    to: {
      name: "Home"
    }
  },
  {
    icon: "icon-football",
    title: "足球",
    to: {
      name: "Football"
    }
  },
  {
    icon: "icon-basketball",
    title: "篮球",
    to: {
      name: "Basketball"
    }
  },
  {
    icon: "icon-competition-results",
    title: "赛果",
    to: {
      name: "CompetitionResults"
    }
  },
  {
    icon: "icon-my",
    title: "我的",
    to: {
      name: "My"
    }
  }
]);

const onChange = tabbarIndex => {
  emit("changeTab", tabbarIndex);
};
</script>
