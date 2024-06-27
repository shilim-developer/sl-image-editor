<template>
  <div
    class="position-absolute left-0 top-0"
    :style="{
      width: `${widgetInfo.bounds.width}px`,
      height: `${widgetInfo.bounds.height}px`,
      background: '#f6f8fa',
      transform: getMatrix3dTransform(widgetInfo.bounds),
    }"
  >
    图片
    {{ widgetInfo.bounds }}
  </div>
</template>
<script lang="ts" setup>
import { getMatrix3dTransform } from "@/utils/utils";
import { WImageType } from "./w-image-type";

type PropsType = {
  widgetInfo: WImageType;
};

defineProps<PropsType>();
</script>
<style lang="scss" scoped></style>
