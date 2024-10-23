export type UserRole = "guest" | "admin" | "mod";

export interface AuthUserModel {
  id: string;
  email: string;
  username: string;
  token: string;
  roles: UserRole[];
}
