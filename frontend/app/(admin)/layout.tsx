"use client";

import { AppShell, Avatar, Button, Menu } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useMeQuery, useSignOutMutation } from "../(auth)/api";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isSuccess } = useMeQuery();
  const [signOut] = useSignOutMutation();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(null);
    router.push("/sign-in");
  };

  return (
    <AppShell
      header={{ height: 60 }}
      layout="alt"
      navbar={{ width: 200, breakpoint: "sm" }}
      withBorder={false}
    >
      <AppShell.Header>
        <div className="flex h-full items-center justify-end shadow-md">
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
      <AppShell.Navbar />
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
