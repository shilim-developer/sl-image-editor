<template>
  <div
    class="w-full h-full"
    ref="designCanvasRef"
    v-element-size="onDesignCanvasResize"
  >
    <canvas class="w-full h-full" ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { Scrollbars } from "@/utils/fabirc/scrollbars";
import { makeMouseWheel } from "@/utils/fabirc/scrollbars/util";
import { Canvas, FabricText, Rect, FabricImage } from "fabric";
import { FabricEditor } from "./fabric-editor";
import { CanvasControl } from "./fabric-editor/canvas-control";
import { widgetDragEmitter } from "@/components/tools/widget-drag/widget-drag-event";
import { useDesignStore } from "@/stores/modules/design";

const designCanvasRef = ref<HTMLDivElement>();
const canvasRef = ref<HTMLCanvasElement>();
let canvas!: Canvas;
const designStore = useDesignStore();
onMounted(async () => {
  designStore.setState({ widgetRendererRef: designCanvasRef.value });
  const fabircEditor = new FabricEditor(canvasRef.value, {
    // cssOnly: true,
  });
  designStore.fabircEditor = markRaw(fabircEditor);

  // const canvas = new Canvas(canvasRef.value, {
  //   // cssOnly: true,
  // });
  // canvas.setDimensions({
  //   width: "100%",
  //   height: "100%",
  // });
  fabircEditor.canvas.backgroundColor = "#f0f0f0";
  // canvas.setWidth(designCanvasRef.value?.clientWidth || 800);
  // canvas.width = designCanvasRef.value?.clientWidth || 800;
  // canvas.height = designCanvasRef.value?.clientHeight || 600;
  fabircEditor.canvas.setDimensions({
    width: designCanvasRef.value?.clientWidth || 800,
    height: designCanvasRef.value?.clientHeight || 600,
  });
  fabircEditor.addPlugin(
    "canvasControl",
    new CanvasControl(fabircEditor.canvas),
  );
  (fabircEditor.getPlugin("canvasControl") as CanvasControl).initPage();
  (fabircEditor.getPlugin("canvasControl") as CanvasControl).autoFitPage();
  const helloWorld = new FabricText("Hello world!");
  const page = fabircEditor.canvas
    .getObjects()
    .find((item) => item.id === "page") as Rect;
  page.selectable = false;
  // const mask = await page.clone();
  const mask = new Rect({
    fill: "rgba(255,255,255,1)",
    width: fabircEditor.canvas.width,
    height: fabircEditor.canvas.height,
  });
  const empty = await page.clone();
  empty.absolutePositioned = true;
  mask.clipPath = empty;
  fabircEditor.canvas.add(helloWorld);
  fabircEditor.canvas.add(mask);
  console.log(fabircEditor.canvas.toJSON());

  widgetDragEmitter.on("ADD_IMAGE", async (data) => {
    console.log("data:", data);
    const img = await FabricImage.fromURL(data.url);
    img.set({
      left: data.bounds.x,
      top: data.bounds.y,
      // scaleX: data.bounds.width / data.origin.width,
      // scaleY: data.bounds.height / data.origin.height,
      width: data.origin.width,
      height: data.origin.height,
    });
    img.scaleToWidth(data.bounds.width);
    fabircEditor.canvas.add(img);
    fabircEditor.canvas.renderAll();
  });

  // fabircEditor.canvas.setViewportTransform([1, 0, 0, 1, 0, 0]);
  // const dataUrl = fabircEditor.canvas.toDataURL({
  //   format: "png",
  //   quality: 1,
  //   width: 800,
  //   height: 600,
  //   left: 0,
  //   top: 0,
  //   multiplier: 1,
  // });
  // console.log(dataUrl);

  // const anchorEl = document.createElement("a");
  // anchorEl.href = dataUrl;
  // anchorEl.download = `test.png`;
  // document.body.appendChild(anchorEl); // required for firefox
  // anchorEl.click();
  // anchorEl.remove();
  // return
  // const mousewheel = makeMouseWheel(canvas, { min: 0.02, max: 256 });
  // canvas.on("mouse:wheel", mousewheel);

  // const scrollbar = new Scrollbars(canvas, {
  //   fill: "rgba(255,0,0,.5)",
  //   stroke: "rgba(0,0,255,.5)",
  //   lineWidth: 5,
  //   scrollbarSize: 8,
  // });
  // canvas.renderAll();
  // const helloWorld = new FabricText("Hello world!");
  // canvas.add(helloWorld);
  // const workspace = new Rect({
  //   fill: "rgba(255,255,255,1)",
  //   width: 800,
  //   height: 600,
  //   id: "workspace",
  //   strokeWidth: 0,
  // });
  // canvas.add(workspace);
  // const objCenter = workspace.getCenterPoint();
  // const viewportTransform = canvas.viewportTransform;
  // if (
  //   canvas.width === undefined ||
  //   canvas.height === undefined ||
  //   !viewportTransform
  // )
  //   return;
  // viewportTransform[4] = canvas.width / 2 - objCenter.x * viewportTransform[0];
  // viewportTransform[5] = canvas.height / 2 - objCenter.y * viewportTransform[3];
  // canvas.setViewportTransform(viewportTransform);
  // console.log("viewportTransform:", viewportTransform);
  // canvas.renderAll();
  // canvas.loadFromJSON(canvas.toJSON());
});

function onDesignCanvasResize({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  // canvas.setDimensions({ width, height });
}
</script>
<style lang="scss" scoped></style>
