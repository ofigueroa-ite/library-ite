import { CloseButton, type CloseButtonProps } from "@mantine/core";
import NavbarCloseButtonClasses from "./navbar-close-button.module.css";

export interface NavbarCloseButtonProps extends CloseButtonProps {
  onClick?: () => void;
}

export function NavbarCloseButton(props: NavbarCloseButtonProps) {
  return <CloseButton classNames={NavbarCloseButtonClasses} {...props} />;
}
