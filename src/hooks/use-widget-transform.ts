import { CommonWidgetType } from "@/components/widgets/types/common";
import { getMatrix3dTransform } from "@/utils/utils";
import { computed } from "vue";

export const useWidgetTransform = <T extends CommonWidgetType>(
  widgetInfo: T,
) => {
  return computed(() =>
    getMatrix3dTransform({
      ...widgetInfo.bounds,
      ...widgetInfo.transform,
    }),
  );
};
