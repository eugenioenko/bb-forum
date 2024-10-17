import { useAuthStore } from "@/stores/auth.store";
import { IconLogout, IconSettings, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { Dropdown, DropdownItem } from "./dropdown";

const Trigger = ({ username }: { username: string }) => {
  if (!username) {
    return;
  }

  return (
    <div className="flex items-center gap-1">
      <IconUser />
      <div className="flex-grow font-normal">{username}</div>
    </div>
  );
};
export const UserMenu = () => {
  const router = useRouter();
  const user = useAuthStore().authUser;
  if (!user) {
    return;
  }
  return (
    <Dropdown trigger={<Trigger username={user.username} />}>
      <DropdownItem
        label="Profile"
        icon={<IconUser />}
        onClick={() => router.push(`/profile/${user.id}`)}
      />
      <DropdownItem
        label="Settings"
        icon={<IconSettings />}
        onClick={() => router.push(`/settings`)}
      />
      <DropdownItem
        label="Logout"
        icon={<IconLogout />}
        onClick={() => router.push("/auth/logout")}
      />
    </Dropdown>
  );
};
