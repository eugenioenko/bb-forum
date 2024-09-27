import { HttpException } from "@/models/http-exception";
import { SignupSchemaType } from "@/schemas/login-schema";
import { userToAuthUserMapper } from "@/utils/user-to-auth-user-mapper";
import { compare } from "bcrypt";
import { cookies } from "next/headers";
import prisma from "./prisma.client";
import { AuthUserModel } from "@/models/auth-user";
import { sign, verify } from "jsonwebtoken";
import { validateSchemaOrThrow } from "@/utils/validate-request";
import { IdSchema, IdSchemaType } from "@/schemas/id-schema";

export async function loginUserOrThrow(
  credentials: SignupSchemaType
): Promise<AuthUserModel> {
  const user = await prisma.user.findUnique({
    where: { email: credentials.email },
  });
  if (!user) {
    throw new HttpException(409, "Email or password does not match");
  }

  const isPasswordMatching = await compare(credentials.password, user.password);
  if (!isPasswordMatching) {
    throw new HttpException(409, "Email or password does not match");
  }

  const accessToken = createAccessToken(user.id);
  const refreshToken = createRefreshToken(user.id);
  const authUser = userToAuthUserMapper(user, accessToken);

  const cookieStore = cookies();
  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
  });

  return authUser;
}

export async function refreshUser(): Promise<AuthUserModel> {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken");
  const decoded = verify(
    refreshToken?.value || "",
    process.env.REFRESH_TOKEN_SECRET_KEY || ""
  );
  const token = validateSchemaOrThrow(IdSchema, decoded);
  const foundUser = await prisma.user.findUniqueOrThrow({
    where: { id: token.id },
  });
  const accessToken = createAccessToken(token.id);
  const authUser = userToAuthUserMapper(foundUser, accessToken);
  return authUser;
}

export async function logoutUser(): Promise<void> {
  cookies().delete("refreshToken");
}

function createAccessToken(userId: string): string {
  const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY || "";
  const expiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN || "1d";

  return sign({ id: userId }, secretKey, { expiresIn });
}

function createRefreshToken(userId: string): string {
  const secretKey = process.env.REFRESH_TOKEN_SECRET_KEY || "";
  const expiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN || "1d";

  return sign({ id: userId }, secretKey, { expiresIn });
}

export function userIdFromToken(token: string): IdSchemaType | null {
  try {
    if (token) {
      const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET_KEY || "");
      return validateSchemaOrThrow(IdSchema, decoded);
    }
    return null;
  } catch (err) {
    console.error("Invalid token:", err);
    return null;
  }
}
