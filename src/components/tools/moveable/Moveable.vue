<template>
  <Moveable
    className="moveable"
    ref="moveableRef"
    v-bind="moveableOptions"
    @drag="onDrag"
    @dragEnd="onDragEnd"
    @rotate="onRotate"
    @rotateEnd="onRotateEnd"
    @resize="onResize"
    @resizeEnd="onResizeEnd"
  />
  <VueSelecto v-bind="selectoOption" @select="onSelect" />
</template>
<script lang="ts" setup>
import Moveable, { OnDrag, OnDragEnd, getElementInfo } from "vue3-moveable";
import { cloneDeep } from "lodash";
import VueSelecto from "vue3-selecto";
import { getMatrix3dTransform } from "@/utils/utils";
import { useWidgetMoveable } from "@/components/widgets/use-widget-moveable";
import { useCanvasStore } from "@/stores/modules/design/canvas";

const defaultConfig = {
  zoom: 0.8,
  draggable: true,
  clippable: false, // 裁剪
  clipTargetBounds: true, // 裁剪区域是否必须在边界内, default: false
  clipArea: true, // 裁剪选区是否支持drag
  // dragWithClip: true,  // 裁剪框跟随拖动框
  throttleDrag: 1,
  resizable: true,
  throttleResize: 1,
  scalable: false,
  throttleScale: 0,
  keepRatio: false,
  rotatable: true,
  throttleRotate: 0,
  renderDirections: ["nw", "ne", "sw", "se"], // ['nw', 'ne', 'sw', 'se'] // 'e'
  pinchable: true, // ["draggable", "resizable", "scalable", "rotatable"]
  origin: false,
  defaultGroupOrigin: "50% 50%",
  // 样式相关
  rotationPosition: "bottom",
  className: "zk-moveable-style",
  // -- 吸附对齐 Start --
  snappable: true,
  // 最大吸附显示距离
  maxSnapElementGuidelineDistance: 70,
  // 吸附方向
  snapDirections: {
    top: true,
    left: true,
    bottom: true,
    right: true,
    center: true,
    middle: true,
  },
  // 吸附元素
  elementGuidelines: [],
  // 吸附元素方向
  elementSnapDirections: {
    top: true,
    left: true,
    bottom: true,
    right: true,
    center: true,
    middle: true,
  },
  // 垂直吸附线
  verticalGuidelines: [],
  // 水平吸附线
  horizontalGuidelines: [],
  snapThreshold: 4,
  isDisplaySnapDigit: true,
  snapGap: false,
  snapElement: true,
  snapVertical: true,
  snapHorizontal: true,
  snapCenter: true,
  snapDigit: 0,
  triggerAblesSimultaneously: true,
};
const moveableOptions: any = reactive(cloneDeep(defaultConfig));
const moveableRef = ref<InstanceType<typeof Moveable>>();
const widgetMoveable = useWidgetMoveable();

const selectoOption = reactive<Partial<VueSelecto>>({
  selectableTargets: [".widget"],
  selectByClick: false,
  // 是否从内部目标中选择(default: true)
  selectFromInside: false,
  // 选择后，是否与所选目标一起选择下一个目标
  continueSelect: false,
  // Determines which key to continue selecting the next target via keydown and keyup.
  toggleContinueSelect: "shift",
  // 目标与要选择的拖动区域重叠的速率。(默认:100)
  hitRate: 5,
  getElementRect: getElementInfo,
});

const onSelect = (e: any) => {
  e.added.forEach((el: any) => {
    console.log(el);
    designStore.setState((state) => {
      state.selectedWidgets.push(el.id);
    });
    console.log(designStore.widgetIndexMap);
  });
  e.removed.forEach((el: any) => {
    designStore.setState((state) => {
      console.log(state.widgetIndexMap[el.id]);
      const index = state.selectedWidgets.findIndex((item) => item === el.id);
      state.selectedWidgets.splice(index, 1);
    });
  });
};

const onDrag = ({ inputEvent, target, transform }: OnDrag) => {
  inputEvent.stopPropagation();
  inputEvent.preventDefault();
  target.style.transform = getMatrix3dTransform(transform);
};
const onDragEnd = async ({ inputEvent, lastEvent }: OnDragEnd) => {
  inputEvent.stopPropagation();
  inputEvent.preventDefault();
  designStore.setState((state) => {
    const widgetIndex = designStore.selectedWidgetIndex[0];
    state.widgetList[widgetIndex].bounds.x =
      state.widgetList[widgetIndex].bounds.x + lastEvent.left;
    state.widgetList[widgetIndex].bounds.y =
      state.widgetList[widgetIndex].bounds.y + lastEvent.top;
  });
};
const onRotate = (e: any) => {
  // const { inputEvent, target, left, top } = e;
  // target!.style.transform = e.transform;
};
const onRotateEnd = async ({ inputEvent, lastEvent }: any) => {
  // inputEvent.stopPropagation();
  // inputEvent.preventDefault();
  // console.log("lastEvent:", lastEvent);
  // designStore.setState((state) => {
  //   state.widgetList[
  //     state.widgetIndexMap[state.selectedWidgets[0]]
  //   ].shape.rotate =
  //     state.widgetList[state.widgetIndexMap[state.selectedWidgets[0]]].shape
  //       .rotate + lastEvent.rotate;
  // });
};
const onResize = (e: any) => {
  const { inputEvent, target, width, height } = e;
  // console.log(e);
  // target!.style.transform = e.transform;
  // target!.style.width = `${width}px`;
  // target!.style.height = `${height}px`;
};
const onResizeEnd = ({ inputEvent, lastEvent }: any) => {
  console.log("lastEvent:", lastEvent);
  // designStore.setState((state) => {
  //   state.widgetList[state.widgetIndexMap[state.selectedWidgets[0]]].shape.x =
  //     state.widgetList[state.widgetIndexMap[state.selectedWidgets[0]]].shape.x +
  //     lastEvent.left;
  //   state.widgetList[state.widgetIndexMap[state.selectedWidgets[0]]].shape.y =
  //     state.widgetList[state.widgetIndexMap[state.selectedWidgets[0]]].shape.y +
  //     lastEvent.top;
  //   state.widgetList[
  //     state.widgetIndexMap[state.selectedWidgets[0]]
  //   ].shape.width = lastEvent.width;
  //   state.widgetList[
  //     state.widgetIndexMap[state.selectedWidgets[0]]
  //   ].shape.height = lastEvent.height;
  // });
};

const designStore = useCanvasStore();
watch(
  () => designStore.selectedWidgets,
  (value, oldValue) => {
    if (value.length > 0) {
      const selectedWidgets = value.map(
        (item) => designStore.widgetList[designStore.widgetIndexMap[item]]
      );
      console.log(widgetMoveable[selectedWidgets[0].type]);

      moveableOptions.renderDirections =
        widgetMoveable[selectedWidgets[0].type].options.renderDirections;

      moveableOptions.target =
        value.length === 1
          ? document.getElementById(value[0])
          : value.map((item) => document.getElementById(item));
      console.log(widgetMoveable, selectedWidgets[0].type);
    }
  },
  { deep: true }
);
</script>
<style lang="scss" scoped></style>
