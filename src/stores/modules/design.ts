import {
  blankCanvasInfo,
  CanvasStoreInfo,
} from "@/components/tools/canvas-list/canvas-type";
import { CommonWidgetType } from "./../../components/widgets/types/common";
import { WidgetType } from "@/components/widgets/types/common";
import { WPageType } from "@/components/widgets/w-page/w-page-type";
import { defineStore } from "pinia";
import { cloneDeep } from "lodash";

export interface DesignState {
  canvasList: CanvasStoreInfo[];
  selectedCanvasIndex: number;
}

export const useDesignStore = defineStore("design", {
  state: (): DesignState => ({
    canvasList: [cloneDeep(blankCanvasInfo)],
    selectedCanvasIndex: 0,
  }),
  getters: {
    currentCanvas(state): CanvasStoreInfo {
      return state.canvasList[state.selectedCanvasIndex];
    },
    pageWidget(): WPageType {
      return this.currentCanvas.widgetList[0];
    },
    selectedWidgetIndex() {
      return this.currentCanvas.selectedWidgets.map(
        (item) => this.currentCanvas.widgetIndexMap[item]
      );
    },
  },
  actions: {
    setState(partial: Partial<DesignState> | ((state: DesignState) => void)) {
      if (typeof partial === "function") {
        this.$patch(partial);
      } else {
        this.$patch(partial);
      }
    },
    // canvas相关
    addCanvas() {
      this.canvasList.push(cloneDeep(blankCanvasInfo));
      this.selectedCanvasIndex = this.canvasList.length - 1;
    },
    selectCanvas(index: number) {
      this.selectedCanvasIndex = index;
    },
    setWidgetList(data: [WPageType, ...CommonWidgetType[]]) {
      this.currentCanvas.widgetList = reactive(data);
    },
    setWidgetData() {},
    initWidgetIndexMap() {
      this.currentCanvas.widgetIndexMap = {};
      this.currentCanvas.widgetList.forEach((item, index) => {
        this.currentCanvas.widgetIndexMap[item.uuid] = index;
      });
    },
  },
});
