import { lazy } from "react";

const options = [
  {
    key: Math.random(),
    path: "/",
    component: lazy(() => import("../store/List")),
    exact: true,
  },
  {
    key: Math.random(),
    path: "/category",
    component: lazy(() => import("../category/List")),
    exact: true,
  },
];
export default options;