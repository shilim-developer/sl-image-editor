import { viteMockServe } from "vite-plugin-mock";

export default function setupMockServer() {
  return viteMockServe({
    mockPath: "./src/mock",
  });
}
