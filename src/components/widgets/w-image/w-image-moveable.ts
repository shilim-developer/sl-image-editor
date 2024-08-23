import { DirectionType } from "./../../tools/moveable/moveable-utils";
import { getDirection } from "@/components/tools/moveable/moveable-utils";
import { OnResizeStart } from "vue3-moveable";

export default {
  options: {
    isMultipleSelectable: true,
    renderDirections: ["nw", "n", "ne", "w", "e", "sw", "s", "se"],
    rotatable: true,
    scalable: true,
  },
  onResizeStart(moveableOptions: any, event: OnResizeStart) {
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
      moveableOptions.keepRatio = true;
    } else {
      moveableOptions.keepRatio = false;
    }
  },
};
