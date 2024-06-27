import Components from "unplugin-vue-components/vite";
import {
  NaiveUiResolver,
  VueUseComponentsResolver,
} from "unplugin-vue-components/resolvers";

export default function setupVueComponents() {
  return Components({
    dirs: ["src/components"],
    extensions: ["vue"],
    include: [/\.vue$/, /\.vue\?vue/],
    dts: "types/components.d.ts",
    resolvers: [NaiveUiResolver(), VueUseComponentsResolver()],
  });
}
