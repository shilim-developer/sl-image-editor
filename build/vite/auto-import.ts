import AutoImport from "unplugin-auto-import/vite";

import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

export default function setupAutoImport() {
  return AutoImport({
    imports: [
      "vue",
      "vue-router",
      "@vueuse/core",
      {
        "naive-ui": [
          "useDialog",
          "useMessage",
          "useNotification",
          "useLoadingBar",
        ],
      },
    ],
    resolvers: [NaiveUiResolver()],
    dts: "types/auto-imports.d.ts",
  });
}
