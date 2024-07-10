import { defineStore } from "pinia";
import { useCanvasListStore } from "./canvas-list";
import {
  CommonWidgetType,
  WidgetTypeMap,
} from "@/components/widgets/types/common";
import { deepAssign } from "@/utils/utils";
import { WPageType } from "@/components/widgets/w-page/w-page-type";
import { CanvasState, PowerPartial } from "./design-type";
import { CanvasData } from "@/components/tools/canvas-list/canvas-type";

export const useCanvasStore = defineStore("canvasStore", {
  state: (): CanvasState => ({
    activeMouseEvent: null,
    widgetRendererRef: null,
  }),
  getters: {
    canvasData(): CanvasData {
      const canvasListStore = useCanvasListStore();
      return canvasListStore.currentCanvas;
    },
    pageWidget() {
      const canvasListStore = useCanvasListStore();
      return canvasListStore.currentCanvas.widgetList[0];
    },
    selectedWidgetIndex() {
      const canvasListStore = useCanvasListStore();
      return canvasListStore.currentCanvas.selectedWidgets.map(
        (item) => canvasListStore.currentCanvas.widgetIndexMap[item]
      );
    },
    selectedWidgetList() {
      const canvasListStore = useCanvasListStore();
      const currentCanvas = canvasListStore.currentCanvas;
      return currentCanvas.selectedWidgets.map(
        (item) => currentCanvas.widgetList[currentCanvas.widgetIndexMap[item]]
      );
    },
    widgetSettingList() {
      const canvasListStore = useCanvasListStore();
      const currentCanvas = canvasListStore.currentCanvas;
      if (currentCanvas.selectedWidgets.length === 1) {
        return [
          currentCanvas.widgetList[
            currentCanvas.widgetIndexMap[currentCanvas.selectedWidgets[0]]
          ].type + "-setting",
        ];
      } else {
        return [];
      }
    },
  },
  actions: {
    setState(partial: Partial<CanvasState> | ((state: CanvasState) => void)) {
      if (typeof partial === "function") {
        this.$patch(partial);
      } else {
        // @ts-ignore
        this.$patch(partial);
      }
    },
    setWidgetList(data: [WPageType, ...CommonWidgetType[]]) {
      this.canvasData.widgetList = reactive(data);
    },
    setCanvasData(data: PowerPartial<CanvasData>) {
      const canvasListStore = useCanvasListStore();
      deepAssign(canvasListStore.currentCanvas, data);
    },
    setWidgetData<T extends keyof WidgetTypeMap>(
      data: (PowerPartial<WidgetTypeMap[T]> & { uuid: string })[]
    ) {
      const canvasListStore = useCanvasListStore();
      data.forEach((item) => {
        deepAssign(
          canvasListStore.currentCanvas.widgetList[
            canvasListStore.currentCanvas.widgetIndexMap[item.uuid]
          ],
          item
        );
      });
    },
    initWidgetIndexMap() {
      const canvasListStore = useCanvasListStore();
      canvasListStore.currentCanvas.widgetIndexMap = {};
      canvasListStore.currentCanvas.widgetList.forEach((item, index) => {
        canvasListStore.currentCanvas.widgetIndexMap[item.uuid] = index;
      });
    },
  },
});
