<script setup></script>

<template>
  <div class="text-[14px] text-[#000]">
    <van-cell-group>
      <van-cell>
        <template #title>
          <div class="flex items-center">
            <img
              class="w-[18px] h-[18px] mr-[8px]"
              src="@/assets/img-zuqiu.png"
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
              class="w-[18px] h-[18px] mr-[8px]"
              src="@/assets/img-zuqiu.png"
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
