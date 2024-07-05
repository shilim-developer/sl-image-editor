import { CommonWidgetType, WidgetType } from "../types/common";

export interface WPageType extends CommonWidgetType {
  type: WidgetType.WPage;
  background: {
    type: "color" | "image";
    colorType?: "linear" | "gradient";
    linear?: any;
    gradient?: any;
    gradientDeg?: number;
    image?: string;
  };
}
