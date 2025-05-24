<template>
  <div class="position-absolute right-20px bottom-10px z-10 bg-white">
    <n-button-group size="small">
      <n-button @click="handleScale(1)">
        <template #icon>
          <n-icon><add /></n-icon>
        </template>
      </n-button>
      <n-dropdown trigger="click" :options="options" @select="handleSelect">
        <n-button> {{ Math.floor(currentScale * 100) }}% </n-button>
      </n-dropdown>
      <n-button @click="handleScale(-1)">
        <template #icon>
          <n-icon><remove /></n-icon>
        </template>
      </n-button>
    </n-button-group>
  </div>
</template>
<script lang="ts" setup>
import { Add, Remove } from "@vicons/ionicons5";

type PropsType = {
  // 当前缩放比例
  currentScale: number;
  // 适配屏幕的缩放比例
  suitScale: number;
};
const props = defineProps<PropsType>();
const emit = defineEmits<{
  scale: [value: number];
}>();

const options = [
  {
    label: "100%",
    key: 1,
  },
  {
    label: "适合屏幕",
    key: 0,
  },
];

const handleSelect = (val: number) => {
  emit("scale", val || props.suitScale);
};

const handleScale = (val: number) => {
  emit("scale", (props.currentScale * 100 + val) / 100);
};
</script>
<style lang="scss" scoped></style>
