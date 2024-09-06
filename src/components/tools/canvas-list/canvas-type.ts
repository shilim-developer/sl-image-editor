import {
  CommonWidgetType,
  WidgetType,
} from "@/components/widgets/types/common";
import { WPageType } from "@/components/widgets/w-page/w-page-type";

export interface CanvasData {
  designName: string;
  widgetList: [WPageType, ...CommonWidgetType[]];
  widgetIndexMap: { [key: string]: number };
  selectedWidgetUUIDList: string[];
}

export const blankCanvasData: CanvasData = {
  designName: "未命名",
  widgetList: [
    {
      type: WidgetType.WPage,
      uuid: "-1",
      parent: "",
      bounds: {
        width: 600,
        height: 800,
        x: 0,
        y: 0,
        rotate: 20,
      },
      background: {
        type: "color",
        colorType: "solid",
        backgroundColor: "rgba(255,255,2555,1)",
        backgroundImage: undefined,
      },
    },
  ],
  widgetIndexMap: { "-1": 0 },
  selectedWidgetUUIDList: ["-1"],
};
