import { RouteModuleList } from "../typings";

const defaultRoutes: RouteModuleList = [
  {
    path: "/editor",
    name: "editor",
    component: () => import("@/views/editor/Editor.vue"),
  },
];

export default defaultRoutes;
