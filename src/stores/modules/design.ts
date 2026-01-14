import { defineStore } from "pinia";
import { FabricEditor } from "@/components/layouts/design-canvas/fabric-editor";
import { type Canvas } from "fabric";

export interface DesignState {
  fabircEditor: FabricEditor;
  widgetRendererRef: InstanceType<typeof HTMLElement> | null;
}

export const useDesignStore = defineStore("design", {
  state: (): DesignState => ({
    fabircEditor: markRaw(new FabricEditor()),
    widgetRendererRef: null,
  }),
  getters: {
    currentCanvas(state): Canvas {
      return state.fabircEditor.canvas as Canvas;
    },
  },
  actions: {
    setState(partial: Partial<DesignState> | ((state: DesignState) => void)) {
      if (typeof partial === "function") {
        this.$patch(partial);
      } else {
        // @ts-ignore
        this.$patch(partial);
      }
    },
  },
});
