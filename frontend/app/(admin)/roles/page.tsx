"use client";

import CaslProtectedRoute from "../../casl/components/casl-protected-route";
import { CaslAction } from "../../casl/interfaces/casl-action.enum";
import { CaslSubject } from "../../casl/interfaces/casl-subject.enum";

export default function RolesPage() {
  return (
    <CaslProtectedRoute action={CaslAction.READ} subject={CaslSubject.ROLES}>
      <h1>Roles</h1>
    </CaslProtectedRoute>
  );
}
