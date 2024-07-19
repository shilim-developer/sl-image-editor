import { CommonWidgetType, WidgetType } from "../types/common";

export interface WImageType extends CommonWidgetType {
  type: WidgetType.WImage;
  url: string;
  cropBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  origin: {
    x: number;
    y: number;
  };
}
