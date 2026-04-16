import { layout, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  layout("admin/admin.layout.tsx", [
    route("dashboard", "./dashboard/dashboard.page.tsx"),
    route("users", "./users/users.page.tsx"),
    route("roles", "./roles/roles.page.tsx"),
  ]),
  route("sign-in", "./auth/sign-in.page.tsx"),
] satisfies RouteConfig;
