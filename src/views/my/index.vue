<script setup>
import { ref, getCurrentInstance, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getUserInfo } from "@/api/login";
import deTou from "@/assets/img-tou.png";
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
import { showToast } from "vant";

let userInfo = ref(proxy.$cache.local.getJSON("user") || {});

const getToken = ref(proxy.$cache.local.get("token") || "");

const onLogin = () => {
  router.push({
    path: "/login/index"
  });
};

const onGetUserInfo = async () => {
  let { code, data } = await getUserInfo();

  proxy.$cache.local.setJSON("user", data);

  userInfo.value = data;
};

onGetUserInfo();

const onOutLogin = () => {
  proxy.$cache.local.remove("token");
  proxy.$cache.local.remove("nickname");
  getToken.value = "";
  userInfo.value = {};
  showToast("退出成功");
};
</script>

<template>
  <div class="text-[14px] h-full text-[#000]">
    <div class="flex items-center justify-between px-[18px]">
      <div
        class="flex items-center bg-[#fff] mb-[5px] py-[12px]"
        @click="userInfo.nickname ? '' : onLogin()"
      >
        <img
          class="w-[50px] h-[50px] mr-[10px] rounded-[50%]"
          :src="userInfo.headerImg ? userInfo.headerImg : deTou"
          alt=""
        />
        <span class="custom-title font-bold text-[16px] text-my">{{
          userInfo.nickname ? userInfo.nickname : "点击登录"
        }}</span>
      </div>

      <img
        class="w-[18px] h-[18px] mr-[10px]"
        src="@/assets/icon-out.png "
        alt=""
        @click="onOutLogin"
        v-if="getToken"
      />
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

    <!-- <div class="px-[24px] absolute bottom-[100px] w-full" v-if="getToken">
      <van-button
        round
        type="success"
        class="w-full btn"
        color="linear-gradient(to right, #f56c6c, #f56c6c)"
        @click="onOutLogin"
        >退出登录</van-button
      >
    </div> -->
  </div>
</template>

<style scoped>
.text-my {
  vertical-align: middle;
  line-height: inherit;
}
</style>
