<template>
  <div
    ref="containerRef"
    class="position-relative overflow-hidden bg-gray-1"
    :style="{
      width: pageBound.containerWidth + 'px',
      height: pageBound.containerHeight + 'px',
    }"
  >
    <div
      ref="canvasRef"
      class="position-absolute left-0 top-0"
      :style="{
        transformOrigin: 'left top',
        transform: `translate(${pageBound.pageLeft}px, ${pageBound.pageTop}px) scale(${pageBound.pageScale}) `,
        boxSizing: 'border-box',
      }"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
    >
      <component
        v-for="item in canvasListStore.currentCanvas.widgetList"
        class="widget cursor-default"
        :class="[item.type]"
        :key="item.uuid"
        :is="item.type"
        :id="item.uuid"
        :widget-info="item"
      ></component>
    </div>
    <canvas-list
      :width="containerSize.width - 20 - 20"
      :left="containerPosition.left + 20"
    ></canvas-list>
    <resize-tool
      :current-scale="currentScale"
      :suit-scale="suitScale"
      @scale="handleScale"
      style="right: 290px"
    />
    <ruler-tool
      :left="pageBound.pageLeft"
      :top="pageBound.pageTop"
      :zoom="currentScale"
    />
  </div>
</template>
<script lang="ts" setup>
import { useCanvasListStore } from "@/stores/modules/design/canvas-list";
import { useCanvasStore } from "@/stores/modules/design/canvas";
import { getScaleInfo } from "@/utils/utils";
import { pageUUid } from "@/components/widgets/w-page/w-page-utils";
import { useResizeStore } from "@/stores/modules/design/resize";
import { storeToRefs } from "pinia";
import { useResize } from "./hooks/use-resize";

export type WidgetRendererPropsType = {
  containerSize: { width: number; height: number };
  containerPosition: { left: number; right: number };
  pageMargin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};
const props = defineProps<WidgetRendererPropsType>();

const canvasListStore = useCanvasListStore();
const canvasStore = useCanvasStore();
function handleMouseDown(event: MouseEvent) {
  const x = event.clientX;
  const y = event.clientY;
  const elements = document.elementsFromPoint(x, y);
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.id && element.className.includes("widget")) {
      console.log("elements:", i);
      if (element.id !== pageUUid) {
        canvasStore.setState({
          activeMouseEvent: event,
        });
      }
      const selectedWidgetUUIDList =
        canvasStore.canvasData.selectedWidgetUUIDList;
      if (
        selectedWidgetUUIDList.length > 1 ||
        (selectedWidgetUUIDList.length === 1 &&
          canvasStore.canvasData.selectedWidgetUUIDList[0] !== element.id)
      )
        canvasStore.setCanvasData({
          selectedWidgetUUIDList: [element.id],
        });
      break;
    }
  }
}
function handleMouseUp() {
  canvasStore.setState({
    activeMouseEvent: null,
  });
}

const { pageBound, currentScale, suitScale, handleScale } = useResize(props);

const containerRef = ref<HTMLDivElement>();
const canvasRef = ref<HTMLDivElement>();

defineExpose({
  containerRef,
  canvasRef,
});

const rulerShow = ref(false);
</script>
<style lang="scss" scoped></style>
