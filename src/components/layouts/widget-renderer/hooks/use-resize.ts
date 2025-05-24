import { useResizeStore } from "@/stores/modules/design/resize";
import { storeToRefs } from "pinia";
import { WidgetRendererPropsType } from "../WidgetRenderer.vue";
import { getScaleInfo } from "@/utils/utils";
import { useCanvasStore } from "@/stores/modules/design/canvas";

export const useResize = (props: WidgetRendererPropsType) => {
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

  const pageBound = ref({
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
      props.containerSize.width -
      props.pageMargin.left -
      props.pageMargin.right;
    const realHeight =
      props.containerSize.height -
      props.pageMargin.top -
      props.pageMargin.bottom;
    // 计算画布宽高
    const realPageWidth = canvasStore.pageWidget.bounds.width * scale;
    const realPageHeight = canvasStore.pageWidget.bounds.height * scale;
    // 真实的容器宽高
    pageBound.value.containerWidth =
      realWidth > realPageWidth
        ? props.containerSize.width
        : realPageWidth + props.pageMargin.left + props.pageMargin.right;
    pageBound.value.containerHeight =
      realHeight > realPageHeight
        ? props.containerSize.height
        : realPageHeight + props.pageMargin.top + props.pageMargin.bottom;
    pageBound.value.pageLeft =
      props.pageMargin.left +
      (realWidth > realPageWidth
        ? (realWidth - realPageWidth) / 2 +
          (props.pageMargin.left - props.pageMargin.right)
        : 0);
    pageBound.value.pageTop =
      props.pageMargin.top +
      (realHeight > realPageHeight
        ? (realHeight - realPageHeight) / 2 +
          (props.pageMargin.top - props.pageMargin.bottom)
        : 0);
    pageBound.value.pageScale = scale;
  }

  onMounted(() => {
    watch(
      () => props,
      () => {
        // 计算适配屏幕的尺寸
        const realWidth =
          props.containerSize.width -
          props.pageMargin.left -
          props.pageMargin.right;
        const realHeight =
          props.containerSize.height -
          props.pageMargin.top -
          props.pageMargin.bottom;
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
  });

  return {
    pageBound,
    suitScale,
    currentScale,
    handleScale,
  };
};
