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
import { storeToRefs } from "pinia";
import { WidgetType, pageUUid } from "@/components/widgets/types/common";

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
  selectableTargets: Object.keys(widgetMoveable)
    .map((key) =>
      widgetMoveable[key].options.isMultipleSelectable ? `.${key}` : ""
    )
    .filter((item) => item),
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
    if (selectedWidgets.value[0] === pageUUid) {
      selectedWidgets.value.splice(0, 1, el.id);
      // canvasStore.setCanvasData({
      //   selectedWidgets: selectedWidgets.value,
      // });
    } else {
      canvasStore.setCanvasData({
        selectedWidgets: selectedWidgets.value.concat([el.id]),
      });
    }
  });
  e.removed.forEach((el: any) => {
    const index = selectedWidgets.value.findIndex((item) => item === el.id);
    if (selectedWidgets.value.length === 1) {
      selectedWidgets.value.splice(index, 1, pageUUid);
    } else {
      selectedWidgets.value.splice(index, 1);
    }

    // canvasStore.setCanvasData({
    //   selectedWidgets: selectedWidgets.value,
    // });
  });
};

/**
 * 处理元素的拖拽事件
 * @param {OnDrag} obj - 包含事件对象、目标元素和转换信息的对象
 */
const onDrag = ({ inputEvent, target, transform }: OnDrag) => {
  inputEvent.stopPropagation();
  inputEvent.preventDefault();
  target.style.transform = getMatrix3dTransform(transform);
};

const onDragEnd = async ({ target, inputEvent, lastEvent }: OnDragEnd) => {
  if (!lastEvent) return;
  console.log("target:", target);
  inputEvent.stopPropagation();
  inputEvent.preventDefault();
  console.log("lastEvent:", lastEvent);
  const widgetIndex = canvasStore.selectedWidgetIndex[0];
  const bounds = widgetList.value[widgetIndex].bounds;
  canvasStore.setWidgetData([
    {
      uuid: selectedWidgets.value[0],
      bounds: {
        x: bounds.x + lastEvent.left,
        y: bounds.y + lastEvent.top,
      },
    },
  ]);
};
const onRotate = (e: any) => {
  const { inputEvent, target, left, top } = e;
  target!.style.transform = e.transform;
};
const onRotateEnd = async ({ inputEvent, lastEvent }: any) => {
  inputEvent.stopPropagation();
  inputEvent.preventDefault();
  console.log("lastEvent:", lastEvent);
  const widgetIndex = canvasStore.selectedWidgetIndex[0];
  const bounds = widgetList.value[widgetIndex].bounds;
  canvasStore.setWidgetData([
    {
      uuid: selectedWidgets.value[0],
      bounds: {
        rotate: bounds.rotate + lastEvent.rotate,
      },
    },
  ]);
};
const onResize = (e: any) => {
  const { inputEvent, target, width, height } = e;
  // console.log(e);
  target!.style.transform = e.transform;
  target!.style.width = `${width}px`;
  target!.style.height = `${height}px`;
};
const onResizeEnd = ({ inputEvent, lastEvent }: any) => {
  console.log("lastEvent:", lastEvent);
  const widgetIndex = canvasStore.selectedWidgetIndex[0];
  const bounds = widgetList.value[widgetIndex].bounds;
  canvasStore.setWidgetData([
    {
      uuid: selectedWidgets.value[0],
      bounds: {
        width: lastEvent.width,
        height: lastEvent.height,
        x: bounds.x + lastEvent.left,
        y: bounds.y + lastEvent.top,
      },
    },
  ]);
};

const canvasStore = useCanvasStore();
const { canvasData } = storeToRefs(canvasStore);
const { selectedWidgets, widgetList, widgetIndexMap } = toRefs(
  canvasData.value
);
watch(
  () => selectedWidgets.value,
  (value) => {
    if (value.length > 0) {
      const selectedWidgets = value.map(
        (item) => widgetList.value[widgetIndexMap.value[item]]
      );
      const widgetMoveableOptions =
        widgetMoveable[selectedWidgets[0].type].options;
      moveableOptions.renderDirections = widgetMoveableOptions.renderDirections;
      moveableOptions.target =
        value.length === 1
          ? document.getElementById(value[0])
          : value.map((item) => document.getElementById(item));
      moveableOptions.rotatable = widgetMoveableOptions.rotatable;
      if (selectedWidgets[0].type === WidgetType.WPage) {
        moveableOptions.draggable = false;
      } else {
        moveableOptions.draggable = true;
        if (canvasStore.activeMouseEvent) {
          const tempActiveMouseEvent = canvasStore.activeMouseEvent;
          console.log("tempActiveMouseEvent:", tempActiveMouseEvent);
          nextTick(() => {
            moveableRef.value?.dragStart(tempActiveMouseEvent);
          });
        }
      }
    }
  },
  { deep: true }
);
</script>
<style lang="scss" scoped></style>
