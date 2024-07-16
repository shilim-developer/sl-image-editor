import { PowerPartial } from "@/stores/modules/design/design-type";
import { WPageType } from "./w-page-type";
import { deepAssign } from "@/utils/utils";
import { WidgetType } from "../types/common";

export const pageUUid = "-1";

export const createPageWidget = (widgetData: PowerPartial<WPageType>) => {
  const blankPage: WPageType = {
    uuid: pageUUid,
    type: WidgetType.WPage,
    bounds: {
      width: 1920,
      height: 1080,
      x: 0,
      y: 0,
      rotate: 0,
    },
    background: {
      type: "color",
      colorType: "solid",
      backgroundColor: "rgba(255,255,2555,1)",
      backgroundImage: undefined,
    },
    parent: "",
  };
  return deepAssign(blankPage, widgetData);
};
