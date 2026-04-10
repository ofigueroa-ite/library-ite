"use client";

import {
  AppShell,
  Avatar,
  Burger,
  Button,
  CloseButton,
  Divider,
  Menu,
  NavLink,
  NavLinkProps,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLayoutDashboard,
  IconLogout,
  IconUserShield,
  IconUsers,
} from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useMeQuery, useSignOutMutation } from "../(auth)/api";
import { defineAbilityFor } from "../casl/ability";
import {
  CaslAbilityContext,
  useCaslAbility,
} from "../casl/casl-ability-context";
import { CaslAction } from "../casl/interfaces/casl-action.enum";
import { CaslSubject } from "../casl/interfaces/casl-subject.enum";
import AlbatrossIteSvg from "../components/svg/albatross-ite";
import CloseButtonClasses from "./close-button.module.css";
import NavLinkClasses from "./navlink.module.css";
import { User } from "./users/interfaces/user.interface";

interface NavbarButtonProps extends NavLinkProps {
  caslSubject: CaslSubject;
  route: string;
}

function NavbarButton({ route, caslSubject, ...props }: NavbarButtonProps) {
  const pathname = usePathname();
  const router = useRouter();
  const ability = useCaslAbility();

  return (
    <NavLink
      active={pathname.startsWith(route)}
      c="white"
      classNames={NavLinkClasses}
      disabled={ability?.cannot(CaslAction.READ, caslSubject)}
      onClick={() => router.push(route)}
      {...props}
    />
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isSuccess } = useMeQuery();
  const [signOut] = useSignOutMutation();
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure();

  const handleSignOut = async () => {
    await signOut(null);
    router.push("/sign-in");
  };
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
            <Menu>
              <Menu.Target>
                <Button size="md" variant="transparent">
                  <div className="flex items-center gap-3">
                    <Avatar
                      color="initials"
                      name={
                        isSuccess ? `${data.name} ${data.surname}` : "Profile"
                      }
                    />
                    {isSuccess ? `${data.name} ${data.surname}` : "Profile"}
                  </div>
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  color="red"
                  leftSection={<IconLogout />}
                  onClick={handleSignOut}
                >
                  Cerrar sesión
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </AppShell.Header>
        <AppShell.Navbar bg="iteBlue">
          <div className="flex justify-end p-3">
            <CloseButton
              c="white"
              classNames={CloseButtonClasses}
              hiddenFrom="sm"
              onClick={toggle}
            />
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
            <NavbarButton
              caslSubject={CaslSubject.ALL}
              label="Panel"
              leftSection={<IconLayoutDashboard />}
              route="/dashboard"
            />
            <NavbarButton
              caslSubject={CaslSubject.USERS}
              label="Usuarios"
              leftSection={<IconUsers />}
              route="/users"
            />
            <NavbarButton
              caslSubject={CaslSubject.ROLES}
              label="Roles"
              leftSection={<IconUserShield />}
              route="/roles"
            />
          </div>
          <Divider className="m-5" color="white" size="sm" />
        </AppShell.Navbar>
        <AppShell.Main className="flex flex-col">
          <div className="p-5">{children}</div>
        </AppShell.Main>
      </AppShell>
    </CaslAbilityContext.Provider>
  );
}
