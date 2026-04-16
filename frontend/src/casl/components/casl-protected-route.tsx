import { Loader, Text } from "@mantine/core";
import { useNavigate } from "react-router";
import { useMeQuery } from "../../auth/auth.api";
import { useCaslAbility } from "../casl-ability-context";
import { CaslAction } from "../interfaces/casl-action.enum";
import { CaslSubject } from "../interfaces/casl-subject.enum";

export interface CaslProtectedRouteProps {
  action: CaslAction;
  children: React.ReactNode;
  subject: CaslSubject;
}

export default function CaslProtectedRoute({
  action,
  subject,
  children,
}: CaslProtectedRouteProps) {
  const navigate = useNavigate();
  const { isLoading } = useMeQuery();
  const caslAbility = useCaslAbility();

  if (isLoading) {
    return (
      <div className="jutify-center flex h-full w-full flex-col items-center gap-10">
        <Text>Obteniendo permisos</Text>
        <Loader />
      </div>
    );
  }

  if (caslAbility?.can(action, subject)) {
    return children;
  }

  navigate("/");
}
