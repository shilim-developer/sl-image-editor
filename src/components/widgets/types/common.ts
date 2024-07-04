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
