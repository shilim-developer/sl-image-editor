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
    <resize-tool
      :current-scale="currentScale"
      :suit-scale="suitScale"
      @scale="handleScale"
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

type PropsType = {
  containerSize: { width: number; height: number };
  pageMargin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};
const props = defineProps<PropsType>();

const resizeStore = useResizeStore();
const { suitScale, currentScale } = storeToRefs(resizeStore);

function handleScale(number: number) {
  resizeStore.setState({
    currentScale: number,
  });
  console.log(currentScale.value);
  countSize(currentScale.value);
}

const pageBound = ref({
  // 容器宽度
  containerWidth: 0,
  // 容器高度
  containerHeight: 0,
  pageLeft: 0,
  pageTop: 0,
  pageScale: 1,
});

// 计算缩放后的宽高
function countSize(scale: number) {
  // 去掉间距后的可视容器宽高
  const realWidth =
    props.containerSize.width - props.pageMargin.left - props.pageMargin.right;
  const realHeight =
    props.containerSize.height - props.pageMargin.top - props.pageMargin.bottom;
  // 计算画布宽高
  const realPageWidth = canvasStore.pageWidget.bounds.width * scale;
  const realPageHeight = canvasStore.pageWidget.bounds.height * scale;
  // 真实的容器宽高
  pageBound.value.containerWidth =
    realWidth > realPageWidth
      ? props.containerSize.width
      : realPageWidth + props.pageMargin.left + props.pageMargin.right;
  pageBound.value.containerHeight =
    realHeight > realPageHeight
      ? props.containerSize.height
      : realPageHeight + props.pageMargin.top + props.pageMargin.bottom;
  pageBound.value.pageLeft =
    props.pageMargin.left +
    (realWidth > realPageWidth
      ? (realWidth - realPageWidth) / 2 +
        (props.pageMargin.left - props.pageMargin.right)
      : 0);
  pageBound.value.pageTop =
    props.pageMargin.top +
    (realHeight > realPageHeight
      ? (realHeight - realPageHeight) / 2 +
        (props.pageMargin.top - props.pageMargin.bottom)
      : 0);
  pageBound.value.pageScale = scale;
}

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

onMounted(() => {
  watch(
    () => props,
    () => {
      // 计算适配屏幕的尺寸
      const realWidth =
        props.containerSize.width -
        props.pageMargin.left -
        props.pageMargin.right;
      const realHeight =
        props.containerSize.height -
        props.pageMargin.top -
        props.pageMargin.bottom;
      const realScale = getScaleInfo(
        {
          width: realWidth,
          height: realHeight,
        },
        {
          width: canvasStore.pageWidget.bounds.width,
          height: canvasStore.pageWidget.bounds.height,
        },
      );
      resizeStore.setState({
        suitScale: realScale,
        currentScale: realScale,
      });
      countSize(realScale);

      // ruler.scroll(-pageBound.value.pageLeft / 0.82);
    },
    { immediate: true, deep: true },
  );
});

const containerRef = ref<HTMLDivElement>();
const canvasRef = ref<HTMLDivElement>();
defineExpose({
  containerRef,
  canvasRef,
});
</script>
<style lang="scss" scoped></style>
