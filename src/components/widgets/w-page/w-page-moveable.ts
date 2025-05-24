import {
  getDirection,
  DirectionType,
} from "@/components/tools/moveable/moveable-utils";
import { useCanvasStore } from "@/stores/modules/design/canvas";
import { storeToRefs } from "pinia";
import { OnResizeStart, OnResize } from "vue3-moveable";
import { useMoveableStore } from "@/stores/modules/design/moveable";
import { wPageEmitter } from "./w-page-event";

export default {
  options: {
    isMultipleSelectable: false,
    renderDirections: ["n", "w", "e", "s"],
    rotatable: false,
  },
  onResizeStart(event: OnResizeStart) {
    console.log("event:", event);
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
    const { width, height } = event;
    wPageEmitter.emit("CHANGE_INPUT_FORM", {
      bounds: {
        width,
        height,
      },
    });
  },
};
