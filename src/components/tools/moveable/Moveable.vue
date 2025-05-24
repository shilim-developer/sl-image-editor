<template>
  <Moveable
    className="moveable"
    ref="moveableRef"
    v-bind="moveableOptions"
    @dragStart="onDragStart"
    @drag="onDrag"
    @dragEnd="onDragEnd"
    @rotateStart="onRotateStart"
    @rotate="onRotate"
    @rotateEnd="onRotateEnd"
    @resizeStart="onResizeStart"
    @resize="onResize"
    @resizeEnd="onResizeEnd"
  />
  <VueSelecto v-if="selectoShow" v-bind="selectoOption" @select="onSelect" />
</template>
<script lang="ts" setup>
import Moveable, {
  OnDrag,
  OnDragEnd,
  OnDragStart,
  OnResize,
  OnResizeEnd,
  OnResizeStart,
  OnRotate,
  OnRotateEnd,
  OnRotateStart,
  getElementInfo,
} from "vue3-moveable";
import { throttle } from "lodash";
import VueSelecto from "vue3-selecto";
import { getMatrix3dTransform } from "@/utils/utils";
import { useWidgetMoveable } from "@/components/widgets/use-widget-moveable";
import { useCanvasStore } from "@/stores/modules/design/canvas";
import { storeToRefs } from "pinia";
import { pageUUid } from "@/components/widgets/w-page/w-page-utils";
import { MoveableEvent } from "./use-movaeable-event";
import { useMoveableStore } from "@/stores/modules/design/moveable";
import { getEmitter } from "@/utils/mitt";

const props = defineProps({
  scrollContainer: {
    type: Object,
  },
});

watch(
  () => props.scrollContainer,
  (value) => {
    // if (value) {
    //   console.log(
    //     "value:",
    //     document.querySelector(".design-scroll").parentElement,
    //   );
    //   moveableOptions.value.container = document.querySelector(".design-scroll");
    //   moveableOptions.value.scrollable = true;
    //   moveableOptions.value.scrollContainer =
    //     document.querySelector(".design-scroll").parentElement;
    // }
  },
);

const moveableStore = useMoveableStore();
const { moveableOptions } = storeToRefs(moveableStore);
const moveableRef = ref<InstanceType<typeof Moveable>>();
const widgetMoveable = useWidgetMoveable();

watch(
  () => moveableRef.value,
  () => {
    if (moveableRef.value) {
      moveableStore.moveableRef = moveableRef.value;
    }
  },
);

const selectoShow = ref(false);
const selectoOption = reactive<Partial<VueSelecto>>({
  selectableTargets: Object.keys(widgetMoveable)
    .map((key) =>
      widgetMoveable[key].options.isMultipleSelectable ? `.${key}` : "",
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
    if (selectedWidgetUUIDList.value[0] === pageUUid) {
      selectedWidgetUUIDList.value.splice(0, 1, el.id);
      canvasStore.setCanvasData({
        selectedWidgetUUIDList: selectedWidgetUUIDList.value.concat([el.id]),
      });
    }
  });
  e.removed.forEach((el: any) => {
    const index = selectedWidgetUUIDList.value.findIndex(
      (item) => item === el.id,
    );
    if (selectedWidgetUUIDList.value.length === 1) {
      selectedWidgetUUIDList.value.splice(index, 1, pageUUid);
    } else {
      selectedWidgetUUIDList.value.splice(index, 1);
    }
  });
};

const moveableEvent = <T extends keyof MoveableEvent>(
  eventName: T,
  event: MoveableEvent[T],
) => {
  const widget = canvasStore.selectedWidgetList[0];
  widgetMoveable[widget.type]?.[eventName]?.(event);
};
const throttleMoveableEvent = throttle(moveableEvent, 100, { trailing: false });

const onDragStart = (event: OnDragStart) => {
  moveableEvent("onDragStart", event);
};

/**
 * 处理元素的拖拽事件
 * @param {OnDrag} obj - 包含事件对象、目标元素和转换信息的对象
 */
const onDrag = (event: OnDrag) => {
  const { inputEvent, target, transform } = event;
  inputEvent.stopPropagation();
  inputEvent.preventDefault();
  target.style.transform = getMatrix3dTransform(transform);
  moveableEvent("onDrag", event);
};

const onDragEnd = async (event: OnDragEnd) => {
  const { inputEvent, lastEvent } = event;
  if (!lastEvent) return;
  inputEvent.stopPropagation();
  inputEvent.preventDefault();
  const widgetIndex = canvasStore.selectedWidgetIndex[0];
  const bounds = widgetList.value[widgetIndex].bounds;
  canvasStore.setWidgetData([
    {
      uuid: selectedWidgetUUIDList.value[0],
      bounds: {
        x: bounds.x + lastEvent.left,
        y: bounds.y + lastEvent.top,
      },
    },
  ]);
  moveableEvent("onDragEnd", event);
};

const onRotateStart = (event: OnRotateStart) => {
  moveableEvent("onRotateStart", event);
};

const onRotate = (event: OnRotate) => {
  const { target } = event;
  target!.style.transform = event.transform;
  throttleMoveableEvent("onRotate", event);
};

const onRotateEnd = async (event: OnRotateEnd) => {
  const { inputEvent, lastEvent } = event;
  if (!lastEvent) return;
  inputEvent.stopPropagation();
  inputEvent.preventDefault();
  console.log("lastEvent:", lastEvent);
  const widgetIndex = canvasStore.selectedWidgetIndex[0];
  const transform = widgetList.value[widgetIndex].transform;
  canvasStore.setWidgetData([
    {
      uuid: selectedWidgetUUIDList.value[0],
      transform: {
        rotate: transform.rotate + lastEvent.rotate,
      },
    },
  ]);
  moveableEvent("onRotateEnd", event);
};

const onResizeStart = (event: OnResizeStart) => {
  moveableEvent("onResizeStart", event);
};

const emitter = getEmitter();
const onResize = (event: OnResize) => {
  const { transform, target, width, height } = event;
  target!.style.transform = transform;
  target!.style.width = `${width}px`;
  target!.style.height = `${height}px`;
  throttleMoveableEvent("onResize", event);
  emitter.emit("onResize", width - selectedWidgetList.value[0].bounds.width);
};

const onResizeEnd = (event: OnResizeEnd) => {
  const { lastEvent } = event;
  if (!lastEvent) return;
  const widgetIndex = canvasStore.selectedWidgetIndex[0];
  const bounds = widgetList.value[widgetIndex].bounds;
  canvasStore.setWidgetData([
    {
      uuid: selectedWidgetUUIDList.value[0],
      bounds: {
        width: lastEvent.width,
        height: lastEvent.height,
        x: bounds.x + lastEvent.drag.translate[0],
        y: bounds.y + lastEvent.drag.translate[1],
      },
    },
  ]);
  moveableEvent("onResizeEnd", event);
};

const canvasStore = useCanvasStore();
const { canvasData, selectedWidgetList } = storeToRefs(canvasStore);
const { selectedWidgetUUIDList, widgetList } = toRefs(canvasData.value);
console.log(selectedWidgetList.value);

watch(
  () => selectedWidgetList.value,
  (value) => {
    console.log(moveableStore);

    moveableStore.targetWidgetList(value);
  },
  { deep: true },
);

watch(
  () => canvasStore.widgetRendererRef,
  (value) => {
    if (value) {
      console.log("value:", value);
      selectoOption.container = value.containerRef;
      selectoOption.dragContainer = value.containerRef;
      selectoOption.keyContainer = value.containerRef;
      // selectoShow.value = true;
    }
  },
  { immediate: true },
);
</script>
<style lang="scss" scoped></style>
