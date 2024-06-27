import { titleCase } from "@/utils/utils";

export const useWidgetMoveable = () => {
  const components = import.meta.glob<true, string, any>(
    "@/components/widgets/**/*-moveable.ts",
    {
      eager: true,
    }
  );
  const result: { [key: string]: any } = {};
  Object.entries(components).forEach(([key, val]) => {
    const fileName = key.split("/").pop()!.split(".").shift()!;
    const widgetName = titleCase(fileName.replace(/-moveable$/, ""));
    result[widgetName] = val.default;
  });
  return result;
};
