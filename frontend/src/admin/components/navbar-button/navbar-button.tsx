import { NavLink, type NavLinkProps } from "@mantine/core";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import NavbarButtonClasses from "./navbar-button.module.css";

interface NavbarButtonProps extends NavLinkProps {
  route: string;
}

export function NavbarButton({ route, children, ...props }: NavbarButtonProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  return (
    <NavLink
      active={location.pathname === route}
      c="white"
      classNames={NavbarButtonClasses}
      onClick={(e) => {
        const isChevron =
          (e.target as HTMLElement).closest(".mantine-NavLink-chevron") !==
          null;
        if (!(children && isChevron)) {
          navigate(route);
        }
        if (isChevron) {
          setOpened(!opened);
        }
      }}
      opened={opened}
      {...props}
    >
      {children}
    </NavLink>
  );
}
