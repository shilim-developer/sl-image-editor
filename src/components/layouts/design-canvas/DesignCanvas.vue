<template>
  <div class="w-full h-full">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { StaticCanvas, FabricText } from "fabric";

const canvasRef = ref<HTMLCanvasElement>();
onMounted(() => {
  const canvas = new StaticCanvas(canvasRef.value);
  const helloWorld = new FabricText("Hello world!");
  canvas.add(helloWorld);
  canvas.loadFromJSON(canvas.toJSON());
});
</script>
<style lang="scss" scoped></style>
