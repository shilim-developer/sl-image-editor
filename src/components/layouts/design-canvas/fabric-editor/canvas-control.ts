import { Canvas, Rect, Shadow } from "fabric";

export class CanvasControl {
  canvas: Canvas;
  page!: Rect;
  constructor(canvas: Canvas) {
    this.canvas = canvas;
    // this.page = new Rect({
    //   fill: "rgba(255,255,255,1)",
    //   width: 800,
    //   height: 600,
    //   id: "page",
    //   strokeWidth: 0,
    // });
    // this.canvas.add(this.page);
  }
  initPage() {
    this.page = new Rect({
      fill: "rgba(255,255,255,1)",
      width: 800,
      height: 600,
      id: "page",
      strokeWidth: 0,
      shadow: new Shadow({
        color: "rgba(0,0,0,0.3)",
        blur: 20,
        offsetX: 0,
        offsetY: 4,
      }),
    });
    console.log("initPage");

    this.canvas.add(this.page);
    this.canvas.renderAll();
  }

  autoFitPage() {
    const objCenter = this.page.getCenterPoint();
    const viewportTransform = this.canvas.viewportTransform;
    if (
      this.canvas.width === undefined ||
      this.canvas.height === undefined ||
      !viewportTransform
    )
      return;
    viewportTransform[4] =
      this.canvas.width / 2 - objCenter.x * viewportTransform[0];
    viewportTransform[5] =
      this.canvas.height / 2 - objCenter.y * viewportTransform[3];
    this.canvas.setViewportTransform(viewportTransform);
    console.log("viewportTransform:", viewportTransform);
    this.canvas.renderAll();
  }
}
