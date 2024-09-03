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
}

export interface WidgetTransform {
  rotate: number;
  scale: number;
  flipX: 1 | -1;
  flipY: 1 | -1;
}

export interface CommonWidgetType {
  type: WidgetType;
  uuid: string;
  parent: string;
  bounds: WidgetBounds;
  transform: WidgetTransform;
  opacity: number;
  lock: boolean;
}

export type WidgetTypeMap = {
  [WidgetType.WPage]: WPageType;
  [WidgetType.WImage]: WImageType;
};
