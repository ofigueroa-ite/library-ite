import { AppShell, Burger, Divider, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconHome,
  IconLayoutDashboard,
  IconUserShield,
  IconUsers,
} from "@tabler/icons-react";
import { Outlet } from "react-router";
import { CaslAction } from "~/casl/interfaces/casl-action.enum";
import { useMeQuery } from "../auth/auth.api";
import { defineAbilityFor } from "../casl/ability";
import { CaslAbilityContext } from "../casl/casl-ability-context";
import { CaslSubject } from "../casl/interfaces/casl-subject.enum";
import AlbatrossIteSvg from "../common/components/svg/albatross-ite";
import type { User } from "../users/interfaces/user.interface";
import { authMiddleware } from "./admin.middleware";
import { NavbarButton } from "./components/navbar-button/navbar-button";
import { NavbarCloseButton } from "./components/navbar-close-button/navbar-close-button";
import { ProfileButton } from "./components/profile-button/profile-button";

export const middleware = [authMiddleware];

export default function AdminLayout() {
  const { data } = useMeQuery();
  const [opened, { toggle }] = useDisclosure();

  const caslAbility = defineAbilityFor(data ?? ({ roles: [] } as User));

  return (
    <CaslAbilityContext.Provider value={caslAbility}>
      <AppShell
        header={{ height: 60 }}
        layout="alt"
        navbar={{
          width: 200,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        withBorder={false}
      >
        <AppShell.Header>
          <div className="flex h-full items-center justify-between">
            <Burger hiddenFrom="sm" onClick={toggle} opened={opened} />
            <ProfileButton />
          </div>
        </AppShell.Header>
        <AppShell.Navbar bg="iteBlue">
          <div className="flex justify-end p-3">
            <NavbarCloseButton c="white" hiddenFrom="sm" />
          </div>
          <div className="m-5 flex flex-col items-center justify-center">
            <Text c="white" fw="bold" size="md">
              Biblioteca
            </Text>
            <Text c="white" fw="bolder" size="xl">
              ITE
            </Text>
            <AlbatrossIteSvg fill="white" height={65} />
          </div>
          <Divider className="m-5" color="white" size="sm" />
          <div>
            <NavbarButton label="Inicio" leftSection={<IconHome />} route="/" />
            <NavbarButton
              label="Panel"
              leftSection={<IconLayoutDashboard />}
              route="/dashboard"
            />
            {caslAbility.can(CaslAction.READ, CaslSubject.USERS) && (
              <NavbarButton
                label="Usuarios"
                leftSection={<IconUsers />}
                route="/users"
              >
                {caslAbility.can(CaslAction.READ, CaslSubject.USERS) && (
                  <NavbarButton
                    label="Roles"
                    leftSection={<IconUserShield />}
                    route="/users/roles"
                  />
                )}
              </NavbarButton>
            )}
          </div>
          <Divider className="m-5" color="white" size="sm" />
        </AppShell.Navbar>
        <AppShell.Main className="flex flex-col">
          <div className="p-5">{data && <Outlet />}</div>
        </AppShell.Main>
      </AppShell>
    </CaslAbilityContext.Provider>
  );
}
