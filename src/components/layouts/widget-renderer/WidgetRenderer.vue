<template>
  <div
    class="position-relative overflow-hidden bg-gray-1"
    :style="{
      width: pageBound.containerWidth + 'px',
      height: pageBound.containerHeight + 'px',
    }"
  >
    <div
      class="position-absolute left-0 top-0"
      :style="{
        transformOrigin: 'left top',
        transform: `translate(${pageBound.pageLeft}px, ${pageBound.pageTop}px) scale(${pageBound.pageScale}) `,
        boxSizing: 'border-box',
      }"
      @click="handleClick"
    >
      <component
        class="widget"
        v-for="item in canvasListStore.currentCanvas.widgetList"
        :key="item.uuid"
        :is="item.type"
        :id="item.uuid"
        :widget-info="item"
      ></component>
    </div>
    <div class="position-fixed right-40px bottom-40px">
      <n-button-group>
        <n-button @click="handleScale(1)">
          <template #icon>
            <n-icon><add /></n-icon>
          </template>
        </n-button>
        <n-dropdown trigger="click" :options="options" @select="handleSelect">
          <n-button> {{ Math.floor(pageBound.pageScale * 100) }}% </n-button>
        </n-dropdown>
        <n-button @click="handleScale(-1)">
          <template #icon>
            <n-icon><remove /></n-icon>
          </template>
        </n-button>
      </n-button-group>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useCanvasListStore } from "@/stores/modules/design/canvas-list";
import { useCanvasStore } from "@/stores/modules/design/canvas";
import { getScaleInfo } from "@/utils/utils";
import { Add, Remove } from "@vicons/ionicons5";
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

const options = [
  {
    label: "100%",
    key: 1,
  },
  {
    label: "适合屏幕",
    key: 0,
  },
];
const suitScale = ref(0);
const handleSelect = (val: number) => {
  countSize(val || suitScale.value);
};
function handleScale(number: number) {
  suitScale.value = suitScale.value + number / 100;
  countSize(suitScale.value);
}

const pageBound = ref({
  containerWidth: 0,
  containerHeight: 0,
  pageLeft: 0,
  pageTop: 0,
  pageScale: 1,
});

const countSize = (scale: number) => {
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
    (realWidth > realPageWidth ? (realWidth - realPageWidth) / 2 : 0);
  pageBound.value.pageTop =
    props.pageMargin.top +
    (realHeight > realPageHeight ? (realHeight - realPageHeight) / 2 : 0);
  pageBound.value.pageScale = scale;
};

const canvasListStore = useCanvasListStore();
const canvasStore = useCanvasStore();
const handleClick = (event: MouseEvent) => {
  const x = event.clientX;
  const y = event.clientY;
  const elements = document.elementsFromPoint(x, y);
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    if (element.id && element.className.includes("widget")) {
      // canvasStore.setState({
      //   selectedWidgets: [element.id],
      // });
      // console.log("element:", canvasStore.selectedWidgets);
      break;
    }
  }
};

onMounted(() => {
  watch(
    () => props.containerSize,
    () => {
      const realWidth = props.containerSize.width - 80;
      const realHeight = props.containerSize.height - 80;
      suitScale.value = getScaleInfo(
        {
          width: realWidth,
          height: realHeight,
        },
        {
          width: canvasStore.pageWidget.bounds.width,
          height: canvasStore.pageWidget.bounds.height,
        }
      );
      countSize(suitScale.value);
    },
    { immediate: true, deep: true }
  );
});
</script>
<style lang="scss" scoped></style>
