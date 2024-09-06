<template>
  <n-layout style="height: 360px">
    <n-layout-header style="height: 64px; padding: 24px" bordered>
      SL-IMAGE-EDITOR
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px; bottom: 30px" has-sider>
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
        content-style="height:100%; padding: 16px;overflow:hidden"
        :collapsed-width="0"
        :native-scrollbar="false"
        :width="300"
        bordered
        show-trigger="arrow-circle"
      >
        <image-panel
          class="w-full h-full overflow-visible"
          style="height: 100%"
        />
        <!-- <n-h2>海淀桥</n-h2>
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
        <n-h2>海淀桥</n-h2> -->
      </n-layout-sider>
      <n-layout-content
        ref="contentRef"
        :native-scrollbar="false"
        :scrollbar-props="{ xScrollable: true }"
        v-element-size="onContentResize"
      >
        <widget-renderer
          ref="widgetRendererRef"
          :container-size="containerSize"
          :page-margin="{
            top: 40,
            right: 40,
            bottom: 40 + canvasListHeight,
            left: 40,
          }"
        />
      </n-layout-content>
      <div
        class="flex-shrink-0 w-270px h-full b-t-0 b-r-0 b-b-0 b-l-1px b-solid border-gray-200 flex flex-col overflow-hidden"
        :collapsed-width="0"
        :native-scrollbar="false"
        bordered
        show-trigger="arrow-circle"
      >
        <n-tabs type="line" justify-content="space-evenly">
          <n-tab name="edit"> 编辑 </n-tab>
          <n-tab name="layer"> 图层 </n-tab>
        </n-tabs>
        <n-scrollbar class="flex-1">
          <component
            v-for="item in canvasStore.widgetSettingList"
            :key="item"
            :is="item"
          ></component>
        </n-scrollbar>
      </div>
      <canvas-list
        :width="containerSize.width - 20 - 20"
        :left="containerLeft + 20"
        v-element-size="onCanvasListResize"
      ></canvas-list>
    </n-layout>
    <n-layout-footer
      position="absolute"
      bordered
      class="h-30px flex justify-center items-center"
    >
      shilim@copyright
    </n-layout-footer>
    <Moveable />
  </n-layout>
</template>
<script lang="ts" setup>
import {
  CommonWidgetType,
  WidgetType,
} from "@/components/widgets/types/common";
import { WPageType } from "@/components/widgets/w-page/w-page-type";
import { useCanvasStore } from "@/stores/modules/design/canvas";
import {
  GridOutline,
  SparklesOutline,
  TextOutline,
  ImageSharp,
} from "@vicons/ionicons5";
import { vElementSize } from "@vueuse/components";
import WidgetRenderer from "@/components/layouts/widget-renderer/WidgetRenderer.vue";
import { getUUID } from "@/utils/utils";

const canvasStore = useCanvasStore();

const data: [WPageType, ...CommonWidgetType[]] = [
  {
    type: WidgetType.WPage,
    uuid: "-1",
    parent: "",
    bounds: {
      width: 600,
      height: 800,
      x: 0,
      y: 0,
      rotate: 0,
      flipX: 1,
      flipY: 1,
      scale: 1,
    },
    background: {
      type: "color",
    },
  },
  {
    type: WidgetType.WImage,
    uuid: "img1",
    parent: "-1",
    bounds: {
      width: 100,
      height: 100,
      x: 0,
      y: 0,
      rotate: 10,
      flipX: 1,
      flipY: 1,
      scale: 1,
    },
    origin: {
      width: 100,
      height: 100,
      x: 0,
      y: 0,
    },
  },
  {
    type: WidgetType.WImage,
    uuid: "img2",
    parent: "-1",
    bounds: {
      width: 100,
      height: 100,
      x: 100,
      y: 100,
      rotate: 20,
      flipX: 1,
      flipY: 1,
      scale: 1,
    },
    origin: {
      width: 100,
      height: 100,
      x: 0,
      y: 0,
    },
  },
  ...Array.from({ length: 200 }).map(() => ({
    type: WidgetType.WImage,
    uuid: getUUID(),
    parent: "-1",
    bounds: {
      width: 100,
      height: 100,
      x: 100,
      y: 100,
      rotate: 20,
      flipX: 1,
      flipY: 1,
      scale: 1,
    },
    origin: {
      width: 100,
      height: 100,
      x: 0,
      y: 0,
    },
  })),
];
canvasStore.setWidgetList(data);
canvasStore.initWidgetIndexMap();
// canvasListStore.addCanvas();
const contentRef = ref();
const containerSize = reactive({
  width: 0,
  height: 0,
});
const containerLeft = ref(0);
function onContentResize() {
  if (containerLeft.value === 365) return;
  containerSize.width = contentRef.value.$el.clientWidth;
  containerSize.height = contentRef.value.$el.clientHeight;
  containerLeft.value = contentRef.value.$el.offsetLeft;
}

const canvasListHeight = ref(0);
function onCanvasListResize({ height }: { height: number }) {
  canvasListHeight.value = height;
}

const widgetRendererRef = ref<InstanceType<typeof WidgetRenderer>>();
onMounted(() => {
  onContentResize();
  canvasStore.setState({
    widgetRendererRef: widgetRendererRef.value,
  });
  // getImageListApi();
});
</script>
<style lang="less" scoped>
a {
  color: red;
}
</style>
