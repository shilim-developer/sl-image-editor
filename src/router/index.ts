import { createRouter, createWebHistory } from "vue-router";
import defaultRoutes from "./routes/defaultRoutes";
// import { setupDynamicRoutes } from "./plugins/dynamicRoutes";
import { App } from "vue";
import basicRoutes from "./routes/basicRoutes";

export const router = createRouter({
  routes: [...basicRoutes, ...defaultRoutes],
  history: createWebHistory(),
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
  app.use(router);
  // setupDynamicRoutes(defaultRoutes);
}
