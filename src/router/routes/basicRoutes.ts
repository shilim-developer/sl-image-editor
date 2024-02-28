import { RouteModuleList } from "../typings";

const basicRoutes: RouteModuleList = [
  {
    path: "/",
    name: "root",
    redirect: "/editor",
  },
];
export default basicRoutes;
