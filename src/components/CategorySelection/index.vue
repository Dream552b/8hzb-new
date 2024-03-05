<template>
  <div class="category">
    <van-dropdown-menu ref="menuRef">
      <van-dropdown-item
        title=""
        ref="itemRef"
        @open="openDropdown"
        @close="closeDropdown"
      >
        <div class="pt-[20px] pl-[18px] flex flex-wrap rounded-[20px]">
          <div
            class="s-item mr-[20px] mb-[10px]"
            :class="{ 'active-item': index === activeIndex }"
            v-for="(item, index) in tabsData"
            :key="index"
            @click="onConfirm(item, index)"
          >
            {{ item.shortNameZh }}
          </div>
        </div>
      </van-dropdown-item>
    </van-dropdown-menu>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  tabsData: {
    type: Array,
    default: () => []
  },
  activeIndex: {
    type: Number,
    default: 0
  }
});
const menuRef = ref(null);
const itemRef = ref(null);
const options = [
  { text: "热门", value: 0 },
  { text: "篮球", value: 1 },
  { text: "足球", value: 2 },
  { text: "尹超", value: 2 },
  { text: "发夹", value: 2 },
  { text: "NBA", value: 2 },
  { text: "CBA", value: 2 },
  { text: "德甲", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 },
  { text: "偶记", value: 2 }
];

const emit = defineEmits(["changeOpen", "changeActiveIndex"]);

const onConfirm = (item, index) => {
  itemRef.value.toggle();
  emit("changeActiveIndex", { name: index });
};

const openDropdown = () => {
  emit("changeOpen", true);
};
const closeDropdown = () => {
  emit("changeOpen", false);
};
</script>

<style lang="less">
.category .van-dropdown-menu {
  position: absolute;
  right: 18px;
  top: 8px;
}

.category .van-dropdown-menu__bar {
  width: 28px;
  height: 28px !important;
  background: rgba(0, 0, 0, 0);
  box-shadow: none;
}

.category .van-dropdown-menu__title:after {
  content: " ";
  border: none !important;
}

.category .van-popup {
  border-radius: 0 0 14px 14px;
}
</style>

<style lang="less" scope>
.s-item {
  background: rgba(60, 202, 200, 0.1);
  border-radius: 22px;

  font-size: 12px;

  font-weight: bold;
  color: #58c6c6;
  box-sizing: border-box;
  padding: 4px 18px;
}

// .s-item:nth-child(5) {
//   margin-left: 30px;
// }
// .s-item:nth-child(13) {
//   margin-left: 10px;
// }

// .s-item:nth-child(21) {
//   margin-left: 30px;
// }

// .s-item:nth-child(29) {
//   margin-left: 30px;
// }
// .s-item:nth-child(37) {
//   margin-left: 30px;
// }
// .s-item:nth-child(45) {
//   margin-left: 30px;
// }
// .s-item:nth-child(53) {
//   margin-left: 30px;
// }

.active-item {
  background: linear-gradient(180deg, #82dddc 0%, #34cecc 100%);
  opacity: 1;

  color: #fff;
}
</style>
