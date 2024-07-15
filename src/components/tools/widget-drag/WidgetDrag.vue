<template>
  <slot @mousedown.catch="handleMouseDown" @dragstart="() => false"></slot>
</template>
<script lang="ts" setup>
import { WidgetType } from "@/components/widgets/types/common";
import { WImageType } from "@/components/widgets/w-image/w-image-type";
import { useCanvasStore } from "@/stores/modules/design/canvas";
import { v4 as uuidV4 } from "uuid";

const props = defineProps<{
  data: {
    width: number;
    height: number;
    url: string;
  };
}>();

let target: HTMLElement;
const position = {
  x: 0,
  y: 0,
};
const handleMouseDown = (e) => {
  e.stopPropagation();
  e.preventDefault();
  const copyElement = e.target.cloneNode(true);
  copyElement.style.width = e.target.offsetWidth + "px";
  copyElement.style.height = e.target.offsetHeight + "px";
  copyElement.style.position = "fixed";
  copyElement.style.zIndex = 9999;
  copyElement.style.left = e.target.getBoundingClientRect().left + "px";
  copyElement.style.top = e.target.getBoundingClientRect().top + "px";
  document.body.appendChild(copyElement);
  target = copyElement;
  position.x = e.clientX;
  position.y = e.clientY;
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);
  //   copyElement.addEventListener("mouseleave", handleMouseMove);
};

const handleMouseMove = (e) => {
  target.style.transform =
    "translate(" +
    (e.clientX - position.x) +
    "px, " +
    (e.clientY - position.y) +
    "px)";
  //   console.log("handleMouseMove", e);
};

const canvasStore = useCanvasStore();
const handleMouseUp = (e) => {
  console.log("e:", e);
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("mouseup", handleMouseUp);

  const renderContainer = canvasStore.widgetRendererRef.containerRef!;
  const d_left = renderContainer.getBoundingClientRect().left;
  const d_top = renderContainer.getBoundingClientRect().top;
  const d_right = renderContainer.getBoundingClientRect().right;
  const d_bottom = renderContainer.getBoundingClientRect().bottom;
  if (
    e.clientX < d_left ||
    e.clientY < d_top ||
    e.clientX > d_right ||
    e.clientY > d_bottom
  ) {
    // 不在范围内
    target.style.transition = "transform 0.5s ease";
    target.style.transform = "translate(0px, 0px)";
    setTimeout(() => {
      target.remove();
    }, 500);
  } else {
    canvasStore.addWidgetData({
      uuid: uuidV4(),
      type: WidgetType.WImage,
      bounds: {
        width: props.data.width,
        height: props.data.height,
        x: e.clientX - d_left - e.offsetX,
        y: e.clientY - d_top - e.offsetY,
        rotate: 0,
      },
      url: props.data.url,
      parent: "-1",
    });
    target.remove();
  }
};
</script>
<style lang="scss" scoped></style>
