import { WidgetPosition } from "@/components/widgets/types/common";
import { parseMat } from "css-to-mat";
import { v4 as uuidV4 } from "uuid";

export const getLastFolderName = (path: string) => {
  const parts = path.split("/");
  return parts[parts.length - 2];
};

export const getMatrix3dTransform = (position: WidgetPosition | string) => {
  let cssText = "";
  if (typeof position === "string") {
    cssText = position;
  } else {
    cssText = `translate(${position.x}px, ${position.y}px) rotate(${position.rotate}deg)`;
  }
  return `matrix3d(${parseMat(cssText).join(", ")})`;
};

export const getScaleInfo = (
  containerRect: {
    width: number;
    height: number;
  },
  elementRect: {
    width: number;
    height: number;
  },
) => {
  const containerRatio = containerRect.width / containerRect.height;
  const elementRatio = elementRect.width / elementRect.height;
  let scale = 1;
  if (containerRatio > elementRatio) {
    // 取容器高度
    scale = containerRect.height / elementRect.height;
  } else {
    // 取容器宽度
    scale = containerRect.width / elementRect.width;
  }
  return scale;
};

export const titleCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/(\-|^)[a-z]/g, (L) => L.toUpperCase())
    .replace(/\-/g, "");
};

export const deepAssign = (target: any, sources: any) => {
  if (target === undefined || target === null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  for (const key of Object.keys(sources)) {
    if (sources[key] instanceof Object) {
      deepAssign(target[key], sources[key]);
    } else {
      target[key] = sources[key];
    }
  }
};

export const getColorModeFromStr = (val: string): "gradient" | "solid" => {
  if (
    val &&
    (val.includes("radial-gradient") || val.includes("linear-gradient"))
  ) {
    return "gradient";
  } else {
    return "solid";
  }
};

/**
 * 获取一个uuid
 */
export const getUUID = () => {
  return uuidV4();
};
