import { defineConfig } from "vite";
import { resolve } from "path";
import setupVitePlugins from "./build/vite";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: /@\//, replacement: `${pathResolve("src")}/` }],
  },
  plugins: setupVitePlugins(),
});
