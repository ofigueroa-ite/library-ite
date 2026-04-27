import { NavLink, type NavLinkProps } from "@mantine/core";
import { useLocation, useNavigate } from "react-router";
import NavbarButtonClasses from "./navbar-button.module.css";

interface NavbarButtonProps extends NavLinkProps {
  route: string;
}

export function NavbarButton({ route, ...props }: NavbarButtonProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <NavLink
      active={location.pathname === route}
      c="white"
      classNames={NavbarButtonClasses}
      onClick={() => navigate(route)}
      opened={location.pathname.startsWith(route)}
      {...props}
    />
  );
}
