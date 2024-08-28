<template>
  <slot @mousedown.catch="handleMouseDown" @dragstart="() => false"></slot>
</template>
<script lang="ts" setup>
import { WidgetType } from "@/components/widgets/types/common";
import { useCanvasStore } from "@/stores/modules/design/canvas";
import { useResizeStore } from "@/stores/modules/design/resize";
import {
  decimalEvaluate,
  decimalEvaluateToNumber,
  infixToPostfix,
} from "@/utils/decimal";
import { v4 as uuidV4 } from "uuid";

const props = defineProps<{
  data: {
    record: {
      url: string;
      width: number;
      height: number;
    };
  };
}>();

let tempTarget: HTMLElement;
let tempOriginTarget: HTMLElement;
const position = {
  x: 0,
  y: 0,
};
const handleMouseDown = (e: MouseEvent) => {
  e.stopPropagation();
  e.preventDefault();
  if (!e.target) return;
  tempOriginTarget = e.target as HTMLElement;
  const copyElement: HTMLElement = tempOriginTarget.cloneNode(
    true,
  ) as HTMLElement;
  copyElement.style.width = tempOriginTarget.offsetWidth + "px";
  copyElement.style.height = tempOriginTarget.offsetHeight + "px";
  copyElement.style.position = "fixed";
  copyElement.style.zIndex = "9999";
  copyElement.style.left = tempOriginTarget.getBoundingClientRect().left + "px";
  copyElement.style.top = tempOriginTarget.getBoundingClientRect().top + "px";
  document.body.appendChild(copyElement);
  tempTarget = copyElement;
  position.x = e.clientX;
  position.y = e.clientY;
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);
};

const handleMouseMove = (e: MouseEvent) => {
  const diffX = e.clientX - position.x;
  const maxWidth = canvasStore.canvasData.widgetList[0].bounds.width / 2;
  console.log(tempOriginTarget.clientWidth, maxWidth);
  if (
    tempTarget.clientWidth < maxWidth &&
    tempTarget.clientWidth > tempOriginTarget.clientWidth
  ) {
    tempTarget.style.width = `${tempOriginTarget.clientWidth + diffX}px`;
  }
  tempTarget.style.transform =
    "translate(" +
    (e.clientX - position.x) +
    "px, " +
    (e.clientY - position.y) +
    "px)";
};

const canvasStore = useCanvasStore();
const resizeStore = useResizeStore();
const handleMouseUp = (e: MouseEvent) => {
  canvasStore.canvasData.designName = "tets";
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("mouseup", handleMouseUp);
  const renderContainer = canvasStore.widgetRendererRef.containerRef!;
  const canvasContainer = canvasStore.widgetRendererRef.canvasRef!;
  const d_left = renderContainer.getBoundingClientRect().left;
  const d_top = renderContainer.getBoundingClientRect().top;
  const d_right = renderContainer.getBoundingClientRect().right;
  const d_bottom = renderContainer.getBoundingClientRect().bottom;
  const half_canvas_width =
    canvasStore.canvasData.widgetList[0].bounds.width / 2;
  console.log("half_canvas_width:", canvasContainer);
  const half_canvas_height =
    canvasStore.canvasData.widgetList[0].bounds.height / 2;
  if (
    e.clientX < d_left ||
    e.clientY < d_top ||
    e.clientX > d_right ||
    e.clientY > d_bottom
  ) {
    // 不在范围内
    tempTarget.style.transition = "transform 0.5s ease";
    tempTarget.style.transform = "translate(0px, 0px)";
    setTimeout(() => {
      tempTarget.remove();
    }, 500);
  } else {
    console.log(e.clientX, d_left, e.offsetX);
    let iWidth = Math.min(props.data.record.width, half_canvas_width);
    let iHeight = (iWidth * props.data.record.height) / props.data.record.width;
    if (iHeight > half_canvas_height * 2) {
      iHeight = half_canvas_height;
      iWidth = (iHeight * props.data.record.width) / props.data.record.height;
    }
    const uuid = uuidV4();
    canvasStore.addWidgetData({
      uuid,
      type: WidgetType.WImage,
      bounds: {
        width: parseInt(iWidth.toFixed(0)),
        height: parseInt(iHeight.toFixed(0)),
        x: decimalEvaluateToNumber(
          `(${e.clientX} - ${canvasContainer.getBoundingClientRect().left} - ${e.offsetX}) / ${resizeStore.currentScale}`,
        ),
        // (e.clientX -
        //   canvasContainer.getBoundingClientRect().left -
        //   e.offsetX) /
        // resizeStore.currentScale,
        y: decimalEvaluateToNumber(
          `(${e.clientY} - ${canvasContainer.getBoundingClientRect().top} - ${e.offsetY}) / ${resizeStore.currentScale}`,
        ),
        rotate: 0,
      },
      url: props.data.record.url,
      origin: {
        width: props.data.record.width,
        height: props.data.record.height,
        x: 0,
        y: 0,
      },
      cropBounds: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      },
      parent: "-1",
    });
    canvasStore.selectWidget(uuid);
    tempTarget.remove();
  }
};
</script>
<style lang="scss" scoped></style>
