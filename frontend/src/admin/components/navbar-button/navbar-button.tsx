import { NavLink, type NavLinkProps } from "@mantine/core";
import { useLocation, useNavigate } from "react-router";
import { useCaslAbility } from "~/casl/casl-ability-context";
import { CaslAction } from "~/casl/interfaces/casl-action.enum";
import type { CaslSubject } from "~/casl/interfaces/casl-subject.enum";
import NavbarButtonClasses from "./navbar-button.module.css";

interface NavbarButtonProps extends NavLinkProps {
  caslSubject: CaslSubject;
  route: string;
}

export function NavbarButton({
  route,
  caslSubject,
  ...props
}: NavbarButtonProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const ability = useCaslAbility();

  return (
    <NavLink
      active={location.pathname === route}
      c="white"
      classNames={NavbarButtonClasses}
      disabled={ability?.cannot(CaslAction.READ, caslSubject)}
      onClick={() => navigate(route)}
      opened={location.pathname.startsWith(route)}
      {...props}
    />
  );
}
