import AutoImport from "unplugin-auto-import/vite";

import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import { VueHooksPlusResolver } from "@vue-hooks-plus/resolvers";

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
    include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
    resolvers: [VueHooksPlusResolver(), NaiveUiResolver()],
    dts: "types/auto-imports.d.ts",
  });
}
