import { queryAuthUserByEmail } from "@/queries/server/auth-user.prisma";
import { GoogleClaimSchema } from "@/schemas/google-claim.schema";
import {
  loginUserByEmailOrThrow,
  signupUserOrThrow,
} from "@/services/auth.service";
import { google } from "@/services/google.client";
import { validateSchemaOrThrow } from "@/utils/validate-request";
import { randPassword } from "@ngneat/falso";
import { decodeIdToken } from "arctic";
import { cookies } from "next/headers";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookieStore = await cookies();
  const storedState = cookieStore.get("google_oauth_state")?.value ?? null;
  const codeVerifier = cookieStore.get("google_code_verifier")?.value ?? null;
  cookieStore.delete("google_oauth_state");
  cookieStore.delete("google_code_verifier");

  try {
    if (
      code === null ||
      state === null ||
      storedState === null ||
      codeVerifier === null ||
      state !== storedState
    ) {
      throw new Error("auth state error");
    }

    const tokens = await google.validateAuthorizationCode(code, codeVerifier);
    const unverifiedClaims = decodeIdToken(tokens.idToken());
    const claims = validateSchemaOrThrow(GoogleClaimSchema, unverifiedClaims);
    if (!claims.email_verified) {
      throw new Error("auth unverified email");
    }

    const foundUser = await queryAuthUserByEmail(claims.email);
    if (!foundUser) {
      await signupUserOrThrow({
        email: claims.email,
        username: claims.name || claims.email,
        password: randPassword(),
      });
    } else {
      await loginUserByEmailOrThrow(claims.email);
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/auth/error",
      },
    });
  }
}
