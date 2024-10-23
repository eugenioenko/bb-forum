import { AuthUserModel } from "@/models/auth-user";
import { HttpException } from "@/models/http-exception";
import { IdSchema, IdSchemaType } from "@/schemas/id-schema";
import { LoginSchemaType } from "@/schemas/login-schema";
import { SignupSchemaType } from "@/schemas/signup-schema";
import { userToAuthUserMapper } from "@/utils/user-to-auth-user-mapper";
import { validateSchemaOrThrow } from "@/utils/validate-request";
import { compare, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import prisma from "./prisma.client";
import { ChangePasswordSchemaType } from "@/schemas/change-pwd.schema";
import {
  queryAuthUserByEmail,
  queryAuthUserById,
} from "@/queries/server/auth-user.prisma";

export async function loginUserOrThrow(
  credentials: LoginSchemaType
): Promise<AuthUserModel> {
  const user = await queryAuthUserByEmail(credentials.email);
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

export async function signupUserOrThrow(
  credentials: SignupSchemaType
): Promise<AuthUserModel> {
  const findUser = await queryAuthUserByEmail(credentials.email);
  if (findUser) {
    throw new HttpException(409, `Email "${credentials.email}" already in use`);
  }

  const hashedPassword = await hash(credentials.password, 10);
  const user = await prisma.user.create({
    data: { ...credentials, password: hashedPassword },
  });

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

  const foundUser = await queryAuthUserById(token.id);
  if (!foundUser) {
    throw new HttpException(409, "User does not match records");
  }

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

export function authUserOrThrow(request: NextRequest): IdSchemaType {
  const authorization = request.headers.get("authorization");
  if (!authorization) {
    throw new Error("Authorization required");
  }
  const token = authorization.split("Bearer ")[1];
  if (!token) {
    throw new Error("Authorization required");
  }
  const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET_KEY || "");
  return validateSchemaOrThrow(IdSchema, decoded);
}

export async function changePasswordOrThrow(
  userId: string,
  credentials: ChangePasswordSchemaType
): Promise<boolean> {
  const user = await queryAuthUserById(userId);

  if (!user) {
    throw new HttpException(409, "User does not match records");
  }

  const isPasswordMatching = await compare(
    credentials.currentPassword,
    user.password
  );

  if (!isPasswordMatching) {
    throw new HttpException(409, "Password does not match records");
  }

  const hashedPassword = await hash(credentials.newPassword, 10);

  await prisma.user.update({
    data: {
      password: hashedPassword,
    },
    where: { id: user.id },
  });

  return true;
}
