import { WImageType } from "../w-image/w-image-type";
import { WPageType } from "../w-page/w-page-type";

export enum WidgetType {
  "WPage" = "WPage",
  "WImage" = "WImage",
}

export enum FlipType {
  "HORIZONTAL" = "HORIZONTAL",
  "VERTICAL" = "VERTICAL",
}

export interface WidgetBounds {
  width: number;
  height: number;
  x: number;
  y: number;
  rotate: number;
  scale: number;
}

export interface CommonWidgetType {
  type: WidgetType;
  uuid: string;
  parent: string;
  bounds: WidgetBounds;
  attribute: {
    transparency: number;
    flip: FlipType | null;
    lock: boolean;
  };
}

export type WidgetTypeMap = {
  [WidgetType.WPage]: WPageType;
  [WidgetType.WImage]: WImageType;
};
