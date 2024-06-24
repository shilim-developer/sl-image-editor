<template>
  <n-layout style="height: 360px">
    <n-layout-header style="height: 64px; padding: 24px" bordered>
      SL-IMAGE-EDITOR
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px; bottom: 24px" has-sider>
      <n-tabs
        type="bar"
        animated
        placement="left"
        style="width: 65px; background: #fff; z-index: 2"
        class="border-r-gray-200 border-r-1 border-r-solid"
        tab-style="width: 64px;padding:10px"
        tab-class="flex flex-col justify-center"
      >
        <n-tab name="幸福">
          <div class="flex flex-col justify-center items-center font-size-12">
            <n-icon size="20">
              <GridOutline />
            </n-icon>
            <span class="mt-1"> 模板 </span>
          </div>
        </n-tab>
        <n-tab name="幸福1">
          <div class="flex flex-col justify-center items-center font-size-12">
            <n-icon size="20">
              <SparklesOutline />
            </n-icon>
            <span class="mt-1"> 素材 </span>
          </div>
        </n-tab>
        <n-tab name="幸福1">
          <div class="flex flex-col justify-center items-center font-size-12">
            <n-icon size="20">
              <TextOutline />
            </n-icon>
            <span class="mt-1"> 文字 </span>
          </div>
        </n-tab>
        <n-tab name="幸福2">
          <div class="flex flex-col justify-center items-center font-size-12">
            <n-icon size="20">
              <ImageSharp />
            </n-icon>
            <span class="mt-1"> 图片 </span>
          </div>
        </n-tab>
      </n-tabs>
      <!-- <n-layout-sider
        width="80px"
        style="background: #fff; z-index: 2"
        :content-style="{ background: '#fff', zIndex: 2 }"
        :native-scrollbar="false"
        bordered
      >
        <div class="flex flex-col justify-center items-center p-4 font-14">
          <n-icon size="24">
            <GridOutline />
          </n-icon>
          <n-text type="primary"> 模板 </n-text>
        </div>
        <div class="flex flex-col justify-center items-center p-4 font-14">
          <n-icon size="30">
            <SparklesOutline />
          </n-icon>
          <n-text type="primary"> 素材 </n-text>
        </div>
        <div class="flex flex-col justify-center items-center p-4 font-size-12">
          <n-icon size="30">
            <ImageSharp />
          </n-icon>
          <n-text type="primary">图片 </n-text>
        </div>
      </n-layout-sider> -->
      <n-layout-sider
        content-style="padding: 24px;"
        :collapsed-width="0"
        :native-scrollbar="false"
        bordered
        show-trigger="arrow-circle"
      >
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
      </n-layout-sider>
      <n-layout content-style="padding: 24px;" :native-scrollbar="false">
        <!-- <canvas
          ref="fontCanvas"
          :style="{
            width: '200px',
            height: '100px',
          }"
        ></canvas> -->
        <widget-renderer v-bind="data" />
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" style="height: 24px" bordered>
      城府路
    </n-layout-footer>
    <Moveable />
  </n-layout>
</template>
<script lang="ts" setup>
import { WidgetType } from "@/components/widgets/types/common";
import { WPageType } from "@/components/widgets/w-page/w-page-type";
import {
  GridOutline,
  SparklesOutline,
  TextOutline,
  ImageSharp,
} from "@vicons/ionicons5";
import { fabric } from "fabric";
const fontCanvas = ref(null);

const data: WPageType = {
  type: WidgetType.WPage,
  uuid: "",
  width: 600,
  height: 800,
  children: [
    {
      type: WidgetType.WImage,
      uuid: "",
      width: 200,
      height: 100,
    },
  ],
};

onMounted(() => {
  // const screenCanvas = new fabric.Canvas(fontCanvas.value);
  // screenCanvas.setDimensions({
  //   width: 200,
  //   height: 100,
  // });
  // var rect = new fabric.Textbox("props.params.text", {
  //   left: 0,
  //   top: 0,
  //   width: 200,
  //   height: 16,
  //   fill: "red",
  //   fontSize: 14,
  //   lineHeight: 1.6,
  // });
  // screenCanvas.on("after:render", () => {
  //   if (rect.height! > screenCanvas.getHeight()) {
  //     screenCanvas.setHeight(rect.height!);
  //   }
  // });
  // screenCanvas.add(rect);
});
</script>
<style lang="less" scoped>
a {
  color: red;
}
</style>
