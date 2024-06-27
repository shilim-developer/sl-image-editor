import { defineStore } from "pinia";
import { useCanvasListStore } from "./canvas-list";
import { CommonWidgetType } from "@/components/widgets/types/common";
import { deepAssign } from "@/utils/utils";
import { WPageType } from "@/components/widgets/w-page/w-page-type";

export const useCanvasStore = defineStore("canvasStore", {
  state: () => ({}),
  getters: {
    canvasData() {
      const canvasListStore = useCanvasListStore();
      return canvasListStore.currentCanvas;
    },
    pageWidget() {
      const canvasListStore = useCanvasListStore();
      return canvasListStore.currentCanvas.widgetList[0];
    },
    // currentWidget()
  },
  actions: {
    setWidgetList(data: [WPageType, ...CommonWidgetType[]]) {
      this.canvasData.widgetList = reactive(data);
    },
    setWidgetData(data: CommonWidgetType[]) {
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
