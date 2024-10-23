import type { AuthUserModel, UserRole } from "@/models/auth-user";
import { AuthUserQueryModel } from "@/queries/server/auth-user.prisma";
import { User } from "@prisma/client";

export const userToAuthUserMapper = (
  user: AuthUserQueryModel | User,
  token: string
): AuthUserModel => ({
  id: user?.id || "",
  email: user?.email || "",
  username: user?.username || "",
  token: token,
  roles: ((user as AuthUserQueryModel)?.userRoles || []).map(
    (role) => role.roleId as UserRole
  ),
});
