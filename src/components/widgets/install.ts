import { App, Component } from "vue";

export const installWidgets = (app: App<Element>) => {
  const components = import.meta.glob<true, string, { default: Component }>(
    "@/components/widgets/**/*.vue",
    {
      eager: true,
    }
  );
  Object.entries(components).forEach(async ([key, val]) => {
    const widgetName = key.split("/").pop()!.split(".").shift()!;
    app.component(widgetName, val.default);
  });
};
