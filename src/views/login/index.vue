<template>
  <div>
    <div class="w-full h-[58px] flex items-center px-[18px]">
      <van-icon name="arrow-left" size="24" @click="onClickLeft" />
      <div class="flex-1 flex justify-center">
        <img
          class="w-[67px] h-[20px]"
          alt="logo"
          src="@/assets/img-logo-bg.png"
        />
      </div>
    </div>

    <div class="px-[18px] mt-[30px]">
      <van-form @submit="onLogin">
        <van-field
          v-model="username"
          placeholder="请输入用户号1"
          class="myField rounded-[20px]"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="password"
          placeholder="请输入密码"
          class="myField rounded-[20px] mt-[24px]"
          :rules="[{ required: true, message: '请输入密码' }]"
        />

        <van-button
          round
          :loading="loading"
          loading-text="登录中..."
          type="success"
          class="w-full btn"
          color="linear-gradient(to right, #3CCAC8, #3CCAC8)"
          native-type="onLogin"
          >立即登录</van-button
        >
      </van-form>

      <div class="flex justify-center items-center text-[10px] mt-[20px]">
        <div
          class="flex relative items-center"
          @click.stop.prevent="onClickRadio"
        >
          <van-radio-group
            v-model="checked"
            icon-size="15px"
            checked-color="#0BB1AF"
          >
            <van-radio name="1"></van-radio>
          </van-radio-group>
          <div class="w-[16px] h-[16px] absolute left-[0px] top-[0px]"></div>
          <span class="ml-[7px]"> 我已阅读并同意</span>
        </div>
        <span class="text-[#0BB1AF] mx-[4px]" @click="toAgreement(1)"
          >用户协议</span
        >
        和
        <span class="text-[#0BB1AF] mx-[4px]" @click="toAgreement(2)"
          >隐私政策</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import { showToast } from "vant";
import { login } from "@/api/login/index";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();

const appElement = document.getElementById("app");
if (appElement) {
  appElement.style.backgroundColor = "#fff"; // 设置背景颜色为红色
}
const loading = ref(false);

let checked = ref("0");
let username = ref("");
let password = ref("");

const toAgreement = val => {
  if (val === 1) {
    router.push("/user-agreement/index");
  } else {
    router.push("/privacy-agreement/index");
  }
};

const onClickRadio = () => {
  if (checked.value === "1") {
    checked.value = "0";
  } else {
    checked.value = "1";
  }
};

const onClickLeft = () => {
  history.back();
};

const onLogin = async () => {
  if (checked.value !== "1") {
    showToast("请勾选协议");
    return;
  }
  let params = {
    username: username.value,
    password: password.value
  };
  loading.value = true;
  const { data, code } = await login(params);
  loading.value = false;

  if (code !== 200) return showToast(data);
  proxy.$cache.local.set("token", data.token);
  proxy.$cache.local.setJSON("nickname", data.nickname);
  showToast("登录成功");
  router.replace("/my");
};
</script>

<style lang="less" scoped>
/* CSS文件 */
.myField {
  background-color: #f9f9f9; /* 设置红色作为示例 */
}
.btn {
  margin-top: 24px;
}
</style>
