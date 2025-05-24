<template>
  <div
    class="position-absolute left-0 top-0 shadow-lg"
    :style="{
      width: `${widgetInfo.bounds.width}px`,
      height: `${widgetInfo.bounds.height}px`,
      background: widgetInfo.background.backgroundColor,
      transform: transform,
    }"
  ></div>
</template>
<script lang="ts" setup>
import { useWidgetTransform } from "@/hooks/use-widget-transform";
import { CommonWidgetType } from "../types/common";
import { WPageType } from "./w-page-type";
import { useMoveableStore } from "@/stores/modules/design/moveable";

type PropsType = {
  widgetInfo: WPageType;
  widgetList: CommonWidgetType[];
};

const props = defineProps<PropsType>();
const transform = useWidgetTransform(props.widgetInfo);

onMounted(() => {
  const moveableStore = useMoveableStore();
  moveableStore.targetWidgetList([props.widgetInfo]);
});
</script>
<style lang="scss" scoped></style>
