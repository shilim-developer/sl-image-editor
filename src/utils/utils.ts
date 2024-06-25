import { WidgetPosition } from "@/components/widgets/types/common";
import { parseMat } from "css-to-mat";

export const getLastFolderName = (path: string) => {
  const parts = path.split("/");
  return parts[parts.length - 2];
};

export const getMatrix3dTransform = (position: WidgetPosition) => {
  const cssText = `translate(${position.x}px, ${position.y}px) rotate(${position.rotate}deg)`;
  return `matrix3d(${parseMat(cssText).join(", ")})`;
};
