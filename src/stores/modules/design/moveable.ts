import { defaultMoveableOptions } from "@/components/tools/moveable/moveable-constant";
import {
  CommonWidgetType,
  WidgetType,
} from "@/components/widgets/types/common";
import { useWidgetMoveable } from "@/components/widgets/use-widget-moveable";
import { WPageType } from "@/components/widgets/w-page/w-page-type";
import { cloneDeep } from "lodash";
import { defineStore } from "pinia";
import Moveable, { MoveableProperties } from "vue3-moveable";
import { useCanvasStore } from "./canvas";

export interface MoveableState {
  moveableOptions: Partial<MoveableProperties>;
  moveableRef: InstanceType<typeof Moveable> | null;
}

export const useMoveableStore = defineStore("moveableStore", {
  state: (): MoveableState => ({
    moveableOptions: cloneDeep(defaultMoveableOptions),
    moveableRef: null,
  }),
  actions: {
    refreshRect() {
      nextTick(() => {
        if (this.moveableRef) {
          this.moveableRef.updateRect();
        }
      });
    },
    targetWidgetList(widgetList: (WPageType | CommonWidgetType)[]) {
      const widgetMoveable = useWidgetMoveable();
      const canvasStore = useCanvasStore();
      // 只选择一个
      if (widgetList.length === 1) {
        const currentWidget = widgetList[0];
        const widgetType = currentWidget.type;
        const widgetMoveableOptions = widgetMoveable[widgetType].options;
        this.moveableOptions.target = document.getElementById(
          currentWidget.uuid,
        );
        Object.assign(this.moveableOptions, widgetMoveableOptions);
        if (currentWidget.type === WidgetType.WPage) {
          this.moveableOptions.draggable = false;
        } else {
          if (canvasStore.activeMouseEvent) {
            const tempActiveMouseEvent = canvasStore.activeMouseEvent;
            nextTick(() => {
              this.moveableRef?.dragStart(tempActiveMouseEvent);
            });
          }
        }
      } else if (widgetList.length > 1) {
        // 多选
        const widgetMoveableOptions = widgetMoveable["WMultipleSelect"].options;
        Object.assign(this.moveableOptions, widgetMoveableOptions);
        this.moveableOptions.target = widgetList.map((item) =>
          document.getElementById(item.uuid),
        );
      }
    },
  },
});
