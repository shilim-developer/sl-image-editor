<template>
  <div
    class="position-absolute left-0 top-0 shadow-lg"
    :style="{
      width: `${widgetInfo.bounds.width}px`,
      height: `${widgetInfo.bounds.height}px`,
      background: widgetInfo.background.backgroundColor,
      transform: getMatrix3dTransform(widgetInfo.bounds),
    }"
  ></div>
</template>
<script lang="ts" setup>
import { CommonWidgetType } from "../types/common";
import { WPageType } from "./w-page-type";
import { getMatrix3dTransform } from "@/utils/utils";

type PropsType = {
  widgetInfo: WPageType;
  widgetList: CommonWidgetType[];
};

defineProps<PropsType>();
</script>
<style lang="scss" scoped></style>
