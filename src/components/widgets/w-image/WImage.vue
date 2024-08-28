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
    <canvas ref="canvasRef" class="w-full h-full"></canvas>
    <!-- {{ widgetInfo.bounds }} -->
  </div>
</template>
<script lang="ts" setup>
import { getMatrix3dTransform } from "@/utils/utils";
import { WImageType } from "./w-image-type";
import { fabric } from "fabric";

type PropsType = {
  widgetInfo: WImageType;
};

const props = defineProps<PropsType>();
const canvasRef = ref<HTMLCanvasElement>();
let canvas: fabric.Canvas;
onMounted(() => {
  fabric.Image.fromURL(props.widgetInfo.url, (img) => {
    console.log("img:", img);
    console.log(props.widgetInfo.bounds.width);

    canvas = new fabric.Canvas(canvasRef.value!);
    img.selectable = false;
    // img.width = props.widgetInfo.origin.width || props.widgetInfo.bounds.width;
    // img.height =
    //   props.widgetInfo.origin.height || props.widgetInfo.bounds.width;
    canvas.add(img);
    canvas.setWidth(props.widgetInfo.origin.width);
    canvas.setHeight(props.widgetInfo.origin.height);
    canvas.setDimensions(
      {
        width: "100%",
        height: "100%",
      },
      {
        cssOnly: true,
      },
    );
  });
  watch(
    [() => props.widgetInfo.bounds.width, () => props.widgetInfo.bounds.height],
    () => {
      canvas.renderAll();
    },
  );
});
</script>
<style lang="scss" scoped></style>
