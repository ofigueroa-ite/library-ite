"use client";

import CaslProtectedRoute from "../../casl/components/casl-protected-route";
import { CaslAction } from "../../casl/interfaces/casl-action.enum";
import { CaslSubject } from "../../casl/interfaces/casl-subject.enum";

export default function DashboardPage() {
  return (
    <CaslProtectedRoute action={CaslAction.READ} subject={CaslSubject.ALL}>
      <h1>Dashboard</h1>
    </CaslProtectedRoute>
  );
}
