<template>
  <div
    class="position-absolute left-0 top-0"
    :style="{
      width: `${widgetInfo.shape.width}px`,
      height: `${widgetInfo.shape.height}px`,
      background: '#f6f8fa',
      transform: getMatrix3dTransform(widgetInfo.shape),
    }"
  >
    图片
    {{ widgetInfo.shape }}
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
