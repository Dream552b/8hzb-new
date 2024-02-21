<template>
  <div>
    <div class="c-itam relative text-[#000]">
      <!-- top part -->
      <div class="flex items-center justify-between">
        <div class="flex items-center font-bold">
          <img class="w-[14px] h-[14px]" src="@/assets/img-zuqiu.png" alt="" />
          <span class="mx-[5px]">09:30</span>
          <span>NBA</span>
        </div>
        <div class="text-[12px] font-bold">第四节 02 47</div>
        <div class="flex font-bold">
          <img
            class="w-[14px] h-[14px] mr-[4px]"
            src="@/assets/img-zuqiu.png"
            alt=""
          />
          <span>直播中</span>
        </div>
      </div>

      <div class="line h-[1px] my-[10px]"></div>

      <!-- center part -->
      <div class="flex items-center justify-center">
        <div class="flex items-center text-[12px] font-bold">
          <span>卡辛​​库古尔</span>
          <img
            class="w-[14px] h-[14px] ml-[8px]"
            src="@/assets/img-zuqiu.png"
            alt=""
          />
        </div>
        <div class="mx-[20px] text-[16px] font-bold">0 - 0</div>
        <div class="flex items-center font-bold">
          <img
            class="w-[14px] h-[14px] mr-[8px]"
            src="@/assets/img-zuqiu.png"
            alt=""
          />
          <span>伊拉试图阴阳天</span>
        </div>
      </div>

      <!-- bottom part -->
      <div class="flex items-center justify-center relative">
        <div class="flex items-center">
          <span class="mx-[5px]">0.9 0 0.9</span>
          <span>NBA</span>
        </div>
        <div class="mx-[26px]">
          半: 2-0 <span class="ml-[7px]">角: 2-0</span>
        </div>
        <div class="flex items-center">
          <span>0.9 0.5 0.9</span>
        </div>
      </div>

      <img
        class="w-[38px] h-[23px] ml-[8px] absolute right-[0px] bottom-[0px]"
        src="@/assets/icon-zhuagnshi.png"
        alt=""
      />
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.c-itam {
  width: 100%;
  height: 96px;
  border: #f7f7f7 3px solid;
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px;
  margin-bottom: 12px;
  font-size: 10px;
}

.line {
  background: #e5e5e5;
}

.card-box:nth-last-child(1) .c-itam {
  margin-bottom: 0;
}
</style>
