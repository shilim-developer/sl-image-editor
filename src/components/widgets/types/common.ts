import { WImageType } from "../w-image/w-image-type";
import { WPageType } from "../w-page/w-page-type";

export enum WidgetType {
  "WPage" = "WPage",
  "WImage" = "WImage",
}

export interface WidgetPosition {
  x: number;
  y: number;
  rotate: number;
}

export const pageUUid = "-1";

export interface CommonWidgetType {
  type: WidgetType;
  uuid: string;
  parent: string;
  bounds: {
    width: number;
    height: number;
  } & WidgetPosition;
}

export type WidgetTypeMap = {
  [WidgetType.WPage]: WPageType;
  [WidgetType.WImage]: WImageType;
};
