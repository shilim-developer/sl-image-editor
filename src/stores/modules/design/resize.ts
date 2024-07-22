import { defineStore } from "pinia";

export interface ResizeState {
  currentScale: number;
  suitScale: number;
}

export const useResizeStore = defineStore("resizeStore", {
  state: (): ResizeState => ({
    currentScale: 1,
    suitScale: 1,
  }),
  actions: {
    setState(partial: Partial<ResizeState> | ((state: ResizeState) => void)) {
      if (typeof partial === "function") {
        this.$patch(partial);
      } else {
        this.$patch(partial);
      }
    },
  },
});
