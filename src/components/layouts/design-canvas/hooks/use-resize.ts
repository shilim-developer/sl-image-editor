import { useResizeStore } from "@/stores/modules/design/resize";
import { storeToRefs } from "pinia";
import { getScaleInfo } from "@/utils/utils";
import { useCanvasStore } from "@/stores/modules/design/canvas";
import { DesignCanvasStyle } from "../types/design-canvas-style";
import { useMoveableStore } from "@/stores/modules/design/moveable";

export const useResize = (designCanvasStyle: DesignCanvasStyle) => {
  const canvasStore = useCanvasStore();
  const resizeStore = useResizeStore();
  const { suitScale, currentScale } = storeToRefs(resizeStore);

  function handleScale(number: number) {
    resizeStore.setState({
      currentScale: number,
    });
    console.log(currentScale.value);
    countSize(currentScale.value);
  }

  const containerBound = ref({
    // 容器宽度
    containerWidth: 0,
    // 容器高度
    containerHeight: 0,
    pageLeft: 0,
    pageTop: 0,
    pageScale: 1,
  });

  // 计算缩放后的宽高
  function countSize(scale: number) {
    // 去掉间距后的可视容器宽高
    const realWidth =
      designCanvasStyle.width -
      designCanvasStyle.paddingLeft -
      designCanvasStyle.paddingRight;
    const realHeight =
      designCanvasStyle.height -
      designCanvasStyle.paddingTop -
      designCanvasStyle.paddingBottom;
    // 计算画布宽高
    const realPageWidth = canvasStore.pageWidget.bounds.width * scale;
    const realPageHeight = canvasStore.pageWidget.bounds.height * scale;
    // 真实的容器宽高
    containerBound.value.containerWidth =
      realWidth > realPageWidth
        ? designCanvasStyle.width
        : realPageWidth +
          designCanvasStyle.paddingLeft +
          designCanvasStyle.paddingRight;
    containerBound.value.containerHeight =
      realHeight > realPageHeight
        ? designCanvasStyle.height
        : realPageHeight +
          designCanvasStyle.paddingTop +
          designCanvasStyle.paddingBottom;
    containerBound.value.pageLeft =
      designCanvasStyle.paddingLeft +
      (realWidth > realPageWidth ? (realWidth - realPageWidth) / 2 : 0);
    containerBound.value.pageTop =
      designCanvasStyle.paddingTop +
      (realHeight > realPageHeight ? (realHeight - realPageHeight) / 2 : 0);
    containerBound.value.pageScale = scale;
  }

  onMounted(() => {
    watch(
      () => designCanvasStyle,
      () => {
        // 计算适配屏幕的尺寸
        const realWidth =
          designCanvasStyle.width -
          designCanvasStyle.paddingLeft -
          designCanvasStyle.paddingRight;
        const realHeight =
          designCanvasStyle.height -
          designCanvasStyle.paddingTop -
          designCanvasStyle.paddingBottom;
        const realScale = getScaleInfo(
          {
            width: realWidth,
            height: realHeight,
          },
          {
            width: canvasStore.pageWidget.bounds.width,
            height: canvasStore.pageWidget.bounds.height,
          },
        );
        resizeStore.setState({
          suitScale: realScale,
          currentScale: realScale,
        });
        countSize(realScale);
      },
      { immediate: true, deep: true },
    );

    watch(
      () => [
        canvasStore.pageWidget.bounds.width,
        canvasStore.pageWidget.bounds.height,
      ],
      () => {
        countSize(resizeStore.currentScale);
        useMoveableStore().refreshRect();
      },
    );
  });

  return {
    containerBound,
    suitScale,
    currentScale,
    handleScale,
  };
};
