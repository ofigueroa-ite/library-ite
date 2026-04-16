import { Avatar, Button, Menu } from "@mantine/core";
import { IconLogout } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { useMeQuery, useSignOutMutation } from "../../../auth/auth.api";

export function ProfileButton() {
  const { data, isSuccess } = useMeQuery();
  const [signOut] = useSignOutMutation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(null);
    navigate("/sign-in");
  };

  return (
    <Menu>
      <Menu.Target>
        <Button size="md" variant="transparent">
          <div className="flex items-center gap-3">
            <Avatar
              color="initials"
              name={isSuccess ? `${data.name} ${data.surname}` : "Profile"}
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
  );
}
