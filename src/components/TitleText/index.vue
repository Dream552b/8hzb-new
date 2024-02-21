<template>
  <div class="w-full h-[30px] flex justify-center">
    <div class="w-[90px] h-[20px] relative text-center leading-[20px]">
      <img
        class="w-[90px] h-[20px] absolute left-0 top-0"
        src="@/assets/bg-title.png"
        alt=""
      />
      <span class="text-[#fff] font-bold text-[12px] relative">{{
        title
      }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: ""
  }
});
</script>

<style scoped></style>
