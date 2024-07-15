import WidgetRenderer from "@/components/layouts/widget-renderer/WidgetRenderer.vue";

export interface CanvasState {
  activeMouseEvent: MouseEvent | null;
  widgetRendererRef: InstanceType<typeof WidgetRenderer>;
  mouseIsOutside: boolean;
}

/**
 * 递归Partial类型
 */
export type PowerPartial<T> = {
  // 如果是 object，则递归类型
  [U in keyof T]?: T[U] extends object ? PowerPartial<T[U]> : T[U];
};
