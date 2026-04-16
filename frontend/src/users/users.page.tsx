"use client";

import CaslProtectedRoute from "../casl/components/casl-protected-route";
import { CaslAction } from "../casl/interfaces/casl-action.enum";
import { CaslSubject } from "../casl/interfaces/casl-subject.enum";

export default function UsersPage() {
  return (
    <CaslProtectedRoute action={CaslAction.MANAGE} subject={CaslSubject.USERS}>
      <h1 className="bg-blue">Users</h1>
    </CaslProtectedRoute>
  );
}
