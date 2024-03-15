<script setup>
const props = defineProps({
  lineNum: {
    type: String || Number,
    default: 0
  }
});
</script>

<template>
  <div
    class="online-wrap absolute top-[40px] right-[10px] z-[101] px-[4px] py-[2px] flex justify-center items-center"
  >
    <img
      class="w-[11px] h-[9px] mr-[4px] mt-[-2px]"
      src="@/assets/icon-online.png"
      alt=""
    />
    {{ props.lineNum }}
  </div>
</template>

<style lang="less" scoped>
.online-wrap {
  // background: rgba(31, 203, 202, 0.2);
  background: rgba(0, 0, 0, 0.4);
  border-radius: 20px 20px 20px 20px;

  font-weight: bold;
  font-size: 10px;
  color: #50d4d2;
}
</style>
