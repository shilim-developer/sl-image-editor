import { getEmitter } from "@/utils/mitt";

export type WidgetDragEvent = {
  ADD_IMAGE: any;
};
export const widgetDragEmitter = getEmitter<WidgetDragEvent>();
