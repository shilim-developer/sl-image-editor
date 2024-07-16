import {
  blankCanvasData,
  CanvasData,
} from "@/components/tools/canvas-list/canvas-type";
import { defineStore } from "pinia";
import { cloneDeep } from "lodash";
import { useCanvasStore } from "./canvas";

export interface CanvasListState {
  canvasList: CanvasData[];
  selectedCanvasIndex: number;
}

export const useCanvasListStore = defineStore("canvasListStore", {
  state: (): CanvasListState => ({
    canvasList: [cloneDeep(blankCanvasData)],
    selectedCanvasIndex: 0,
  }),
  getters: {
    currentCanvas(state): CanvasData {
      return state.canvasList[state.selectedCanvasIndex];
    },
  },
  actions: {
    /**
     * 新增画布
     */
    addCanvas() {
      this.canvasList.push(cloneDeep(blankCanvasData));
      this.selectedCanvasIndex = this.canvasList.length - 1;
      const canvasStore = useCanvasStore();
      canvasStore.initWidgetIndexMap();
    },
    /**
     * 选择画布
     * @param {number} index 要选择的画布的索引
     */
    selectCanvas(index: number) {
      this.selectedCanvasIndex = index;
    },
  },
});
