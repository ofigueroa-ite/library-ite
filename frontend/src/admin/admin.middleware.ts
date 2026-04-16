import { parse } from "cookie";
import { redirect } from "react-router";
import type { Route } from "./+types/admin.layout";

export const authMiddleware: Route.MiddlewareFunction = ({ request }) => {
  const cookies = parse(request.headers.get("cookie") ?? "");
  const token = cookies.token;

  if (!token) {
    throw redirect("/sign-in");
  }
};
