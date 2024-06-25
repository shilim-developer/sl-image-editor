import { CommonWidgetType } from "./../../components/widgets/types/common";
import { WidgetType } from "@/components/widgets/types/common";
import { WPageType } from "@/components/widgets/w-page/w-page-type";
import { defineStore } from "pinia";

export interface DesignState {
  widgetIndexMap: {
    [key: string]: number;
  };
  widgetList: CommonWidgetType[];
  selectedWidgets: string[];
  uuid: string;
}

export const useDesignStore = defineStore("design", {
  state: (): DesignState => ({
    widgetIndexMap: {},
    widgetList: [],
    selectedWidgets: [],
    uuid: "",
  }),
  getters: {
    currentUUid(state) {
      return state.uuid;
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
    initWidgetIndexMap() {
      this.widgetIndexMap = {};
      this.widgetList.forEach((item, index) => {
        this.widgetIndexMap[item.uuid] = index;
      });
    },
  },
});
