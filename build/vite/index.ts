import Unocss from "unocss/vite";
import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";
import setupAutoImport from "./auto-import";
import setupVueComponents from "./vue-components";
// import mkcert from "vite-plugin-mkcert";
// import setupRequire from "./require";
// import { testPlugin } from "./test";

export default function setupVitePlugins() {
  // const { VITE_USE_MOCK } = viteEnv;

  // console.log(proxy());

  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), Unocss()];

  // unplugin-auto-import
  vitePlugins.push(setupAutoImport());

  // unplugin-vue-components
  vitePlugins.push(setupVueComponents());

  // vite-plugin-style-import
  // vitePlugins.push(setupRequire());

  // vitePlugins.push(testPlugin());

  // unplugin-icons
  // vitePlugins.push(setupIcons());

  // vite-plugin-mock
  // VITE_USE_MOCK && vitePlugins.push(setupMockServer(isBuild));

  return vitePlugins;
}
