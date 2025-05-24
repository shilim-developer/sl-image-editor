import { DirectionType } from "./../../tools/moveable/moveable-utils";
import { getDirection } from "@/components/tools/moveable/moveable-utils";
import { useCanvasStore } from "@/stores/modules/design/canvas";
import { OnDrag, OnResize, OnResizeStart } from "vue3-moveable";
import { wImageEmitter } from "./w-image-event";
import { storeToRefs } from "pinia";
import { useMoveableStore } from "@/stores/modules/design/moveable";

export default {
  options: {
    isMultipleSelectable: true,
    renderDirections: ["nw", "n", "ne", "w", "e", "sw", "s", "se"],
    rotatable: true,
    scalable: true,
    draggable: true,
  },
  onDrag(event: OnDrag) {
    const { left, top } = event;
    const selectWidget = useCanvasStore().selectedWidgetList[0];
    console.log(selectWidget.bounds.x, left);
    wImageEmitter.emit("CHANGE_INPUT_FORM", {
      bounds: {
        x: selectWidget.bounds.x + left,
        y: selectWidget.bounds.y + top,
      },
    });
  },
  onResizeStart(event: OnResizeStart) {
    const moveableStore = useMoveableStore();
    const { moveableOptions } = storeToRefs(moveableStore);
    const { direction } = event;

    const directionType = getDirection(direction);
    if (
      directionType &&
      [
        DirectionType.se,
        DirectionType.sw,
        DirectionType.ne,
        DirectionType.nw,
      ].includes(directionType)
    ) {
      moveableOptions.value.keepRatio = true;
    } else {
      moveableOptions.value.keepRatio = false;
    }
  },
  onResize(event: OnResize) {
    const { width, height, drag } = event;
    const selectWidget = useCanvasStore().selectedWidgetList[0];
    wImageEmitter.emit("CHANGE_INPUT_FORM", {
      bounds: {
        width,
        height,
        x: selectWidget.bounds.x + drag.translate[0],
        y: selectWidget.bounds.y + drag.translate[1],
      },
    });
  },
};
