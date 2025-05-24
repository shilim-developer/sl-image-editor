import { defaultMoveableOptions } from "@/components/tools/moveable/moveable-constant";
import { cloneDeep } from "lodash";
import { defineStore } from "pinia";
import Moveable, { MoveableProperties } from "vue3-moveable";

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
  },
});
