import { MoveableProperties } from "vue3-moveable";

export const defaultMoveableOptions: Partial<MoveableProperties> = {
  zoom: 0.8,
  draggable: true,
  clippable: false, // 裁剪
  clipTargetBounds: true, // 裁剪区域是否必须在边界内, default: false
  clipArea: true, // 裁剪选区是否支持drag
  // dragWithClip: true,  // 裁剪框跟随拖动框
  throttleDrag: 1,
  resizable: true,
  throttleResize: 1,
  scalable: false,
  throttleScale: 0,
  keepRatio: false,
  rotatable: true,
  throttleRotate: 0,
  renderDirections: ["nw", "ne", "sw", "se"], // ['nw', 'ne', 'sw', 'se'] // 'e'
  pinchable: true, // ["draggable", "resizable", "scalable", "rotatable"]
  origin: false,
  defaultGroupOrigin: "50% 50%",
  // 样式相关
  rotationPosition: "bottom",
  className: "zk-moveable-style",
  // -- 吸附对齐 Start --
  snappable: true,
  // 最大吸附显示距离
  maxSnapElementGuidelineDistance: 70,
  // 吸附方向
  snapDirections: {
    top: true,
    left: true,
    bottom: true,
    right: true,
    center: true,
    middle: true,
  },
  // 吸附元素
  elementGuidelines: [],
  // 吸附元素方向
  elementSnapDirections: {
    top: true,
    left: true,
    bottom: true,
    right: true,
    center: true,
    middle: true,
  },
  // 垂直吸附线
  verticalGuidelines: [],
  // 水平吸附线
  horizontalGuidelines: [],
  snapThreshold: 4,
  isDisplaySnapDigit: true,
  snapGap: false,
  snapDigit: 0,
  triggerAblesSimultaneously: true,
};
