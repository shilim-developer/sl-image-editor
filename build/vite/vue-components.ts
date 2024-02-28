import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

export default function setupVueComponents() {
  return Components({
    dirs: [],
    extensions: ["vue"],
    include: [/\.vue$/, /\.vue\?vue/],
    dts: "types/components.d.ts",
    resolvers: [NaiveUiResolver()],
  });
}
