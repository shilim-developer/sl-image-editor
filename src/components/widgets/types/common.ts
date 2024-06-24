export enum WidgetType {
  "WPage" = "WPage",
  "WImage" = "WImage",
}

export interface CommonWidgetType {
  type: WidgetType;
  uuid: string;
  width: number;
  height: number;
  children?: CommonWidgetType[];
}
