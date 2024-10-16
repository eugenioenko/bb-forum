import { useAuthStore } from "@/stores/auth.store";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Dropdown, DropdownItem } from "./dropdown";

const Trigger = () => {
  const username = useAuthStore().authUser?.username;
  if (!username) {
    return;
  }

  return (
    <div className="flex items-center gap-1">
      <IconUser />
      <div className="flex-grow">{username}</div>
    </div>
  );
};
export const UserMenu = () => {
  const router = useRouter();
  return (
    <Dropdown trigger={<Trigger />}>
      <DropdownItem
        label="Profile"
        icon={<IconUser />}
        onClick={() => console.log("Profile")}
      />
      <DropdownItem
        label="Settings"
        icon={<IconSettings />}
        onClick={() => console.log("Settings")}
      />
      <DropdownItem
        label="Logout"
        icon={<IconLogout />}
        onClick={() => router.push("/auth/logout")}
      />
    </Dropdown>
  );
};
