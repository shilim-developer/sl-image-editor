import { defineStore } from "pinia";
import { useCanvasListStore } from "./canvas-list";
import {
  CommonWidgetType,
  WidgetType,
  WidgetTypeMap,
} from "@/components/widgets/types/common";
import { deepAssign } from "@/utils/utils";
import { WPageType } from "@/components/widgets/w-page/w-page-type";
import { CanvasState, PowerPartial } from "./design-type";
import { CanvasData } from "@/components/tools/canvas-list/canvas-type";
// import { fabric } from "fabric";
import { WImageType } from "@/components/widgets/w-image/w-image-type";

export const useCanvasStore = defineStore("canvasStore", {
  state: (): CanvasState => ({
    activeMouseEvent: null,
    widgetRendererRef: null,
    mouseIsOutside: true,
  }),
  getters: {
    canvasData(): CanvasData {
      const canvasListStore = useCanvasListStore();
      return canvasListStore.currentCanvas;
    },
    pageWidget() {
      const canvasListStore = useCanvasListStore();
      return canvasListStore.currentCanvas.widgetList[0];
    },
    selectedWidgetIndex() {
      const canvasListStore = useCanvasListStore();
      return canvasListStore.currentCanvas.selectedWidgetUUIDList.map(
        (item) => canvasListStore.currentCanvas.widgetIndexMap[item],
      );
    },
    selectedWidgetList() {
      const canvasListStore = useCanvasListStore();
      const currentCanvas = canvasListStore.currentCanvas;
      return currentCanvas.selectedWidgetUUIDList.map(
        (item) => currentCanvas.widgetList[currentCanvas.widgetIndexMap[item]],
      );
    },
    widgetSettingList() {
      const canvasListStore = useCanvasListStore();
      const currentCanvas = canvasListStore.currentCanvas;
      if (currentCanvas.selectedWidgetUUIDList.length === 1) {
        return [
          currentCanvas.widgetList[
            currentCanvas.widgetIndexMap[
              currentCanvas.selectedWidgetUUIDList[0]
            ]
          ].type + "-setting",
        ];
      } else {
        return [];
      }
    },
  },
  actions: {
    setState(partial: Partial<CanvasState> | ((state: CanvasState) => void)) {
      if (typeof partial === "function") {
        this.$patch(partial);
      } else {
        // @ts-ignore
        this.$patch(partial);
      }
    },
    /**
     * 设置组件列表
     * @param {[WPageType, ...CommonWidgetType[]]} data 组件列表
     */
    setWidgetList(data: [WPageType, ...CommonWidgetType[]]) {
      this.canvasData.widgetList = reactive(data);
    },
    /**
     * 初始化当前画布组件索引映射
     * 这个函数会在 `canvasListStore` 的 `currentCanvas` 上创建一个 `widgetIndexMap` 对象，该对象将每个组件的 `uuid` 映射到它在 `widgetList` 中的索引。这样做可以方便后续根据 `uuid` 快速找到组件在列表中的位置。
     * 请注意，这个函数假设 `canvasListStore` 和它的属性 `currentCanvas`、`widgetIndexMap`、`widgetList` 已经被正确地定义和初始化。
     */
    initWidgetIndexMap() {
      const canvasListStore = useCanvasListStore();
      const newIndexMap: { [key: string]: number } = {};
      canvasListStore.currentCanvas.widgetList.forEach((item, index) => {
        newIndexMap[item.uuid] = index;
      });
      canvasListStore.currentCanvas.widgetIndexMap = newIndexMap;
    },
    /**
     * 设置当前选中的画布数据
     * @param {PowerPartial} data 要设置的画布数据
     */
    setCanvasData(data: PowerPartial<CanvasData>) {
      const canvasListStore = useCanvasListStore();
      deepAssign(canvasListStore.currentCanvas, data);
    },
    /**
     * 修改多个组件数据
     * @param data - 要修改的组件数据，必须包含uuid
     */
    setWidgetData<T extends keyof WidgetTypeMap>(
      data: (PowerPartial<WidgetTypeMap[T]> & { uuid: string })[],
    ) {
      const canvasListStore = useCanvasListStore();
      data.forEach((item) => {
        deepAssign(
          canvasListStore.currentCanvas.widgetList[
            canvasListStore.currentCanvas.widgetIndexMap[item.uuid]
          ],
          item,
        );
      });
    },
    /**
     * 添加组件数据
     * @param {WidgetTypeMap} data 组件数据
     */
    addWidgetData<T extends keyof WidgetTypeMap>(data: WidgetTypeMap[T]) {
      const canvasListStore = useCanvasListStore();
      canvasListStore.currentCanvas.widgetList.push(data);
      this.initWidgetIndexMap();
    },
    /**
     * 选择组件
     * @param {string} uuid
     */
    selectWidget(uuid: string) {
      const canvasListStore = useCanvasListStore();
      deepAssign(canvasListStore.currentCanvas.selectedWidgetUUIDList, [uuid]);
    },
    async exportImg() {
      const canvas = new fabric.Canvas(null);
      await Promise.all(
        this.canvasData.widgetList.map((item) => {
          if (item.type === WidgetType.WPage) {
            canvas.backgroundColor = item.background.backgroundColor;
            canvas.setWidth(item.bounds.width);
            canvas.setHeight(item.bounds.height);
            return Promise.resolve();
          } else if (item.type === WidgetType.WImage) {
            const data = item as WImageType;
            console.log("data:", data);
            return new Promise((resolve) => {
              fabric.Image.fromURL(
                data.url,
                (img) => {
                  img.scaleX = data.bounds.width / data.origin.width;
                  img.scaleY = data.bounds.height / data.origin.height;
                  img.left = data.bounds.x;
                  img.top = data.bounds.y;
                  canvas.add(img);
                  resolve(true);
                },
                {
                  crossOrigin: "anonymous",
                },
              );
            });
          }
          return Promise.resolve();
        }),
      );
      canvas.renderAll();
      nextTick(() => {
        canvas.getElement().toBlob((blob) => {
          if (blob) {
            window.open(window.URL.createObjectURL(blob));
          }
        });
      });
    },
  },
});
