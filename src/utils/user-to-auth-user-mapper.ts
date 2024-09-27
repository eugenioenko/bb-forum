import { AuthUserModel } from "@/models/auth-user";
import { User } from "@prisma/client";

export const userToAuthUserMapper = (
  user: User,
  token: string
): AuthUserModel => ({
  id: user.id,
  email: user.email,
  token: token,
});
