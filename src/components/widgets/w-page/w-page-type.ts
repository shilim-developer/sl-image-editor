import { CommonWidgetType, WidgetType } from "../types/common";

export interface WPageType extends CommonWidgetType {
  type: WidgetType.WPage;
  background: {
    type: "color" | "image";
    colorType?: "solid" | "gradient";
    backgroundColor?: string;
    backgroundImage?: string;
  };
}
