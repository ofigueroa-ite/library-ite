import {
  index,
  layout,
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  index("index/index.page.tsx"),
  layout("admin/admin.layout.tsx", [
    route("dashboard", "./dashboard/dashboard.page.tsx"),
    route("genders", "./genders/genders.page.tsx"),
    route("users", "./users/users.page.tsx"),
    route("users/roles", "./roles/roles.page.tsx"),
    route("students", "./students/students.page.tsx"),
    route("/students/degrees", "./degrees/degrees.page.tsx"),
    route("staff", "./staff/staff.page.tsx"),
    route("/staff/departments", "./departments/departments.page.tsx"),
  ]),
  route("sign-in", "./auth/sign-in.page.tsx"),
] satisfies RouteConfig;
