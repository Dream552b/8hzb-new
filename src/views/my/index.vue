<script setup>
import { ref, getCurrentInstance } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();

let username = proxy.$cache.local.getJSON("nickname");

const onLogin = () => {
  router.push({
    path: "/login/index"
  });
};
</script>

<template>
  <div class="text-[14px] text-[#000]">
    <div>
      <div
        class="flex items-center bg-[#fff] mb-[5px] py-[12px] px-[18px]"
        @click="username ? '' : onLogin()"
      >
        <img
          class="w-[50px] h-[50px] mr-[10px]"
          src="@/assets/img-tou.png"
          alt=""
        />
        <span class="custom-title font-bold text-[16px]">{{
          username ? username : "点击登录"
        }}</span>
      </div>
    </div>
    <van-cell-group>
      <van-cell>
        <template #title>
          <div class="flex items-center">
            <img
              class="w-[40px] h-[40px] mr-[10px]"
              src="@/assets/img-msg.png"
              alt=""
            />
            <span class="custom-title">消息中心</span>
          </div>
        </template>
        <template #left-icon>
          <van-icon name="search" class="search-icon" />
        </template>
      </van-cell>

      <van-cell>
        <template #title>
          <div class="flex items-center">
            <img
              class="w-[40px] h-[40px] mr-[8px]"
              src="@/assets/img-fan.png"
              alt=""
            />
            <span class="custom-title">意见反馈</span>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<style scoped></style>
