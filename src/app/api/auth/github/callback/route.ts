import { queryAuthUserByEmail } from "@/queries/server/auth-user.prisma";
import { GithubClaimSchema } from "@/schemas/github-clam.schema";
import {
  loginUserByIdOrThrow,
  signupUserOrThrow,
} from "@/services/auth.service";
import { github } from "@/services/github.client";
import { validateSchemaOrThrow } from "@/utils/validate-request";
import { randPassword } from "@ngneat/falso";
import { cookies } from "next/headers";

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookieStore = await cookies();
  const storedState = cookieStore.get("github_oauth_state")?.value ?? null;

  cookieStore.delete("github_oauth_state");

  try {
    if (
      code === null ||
      state === null ||
      storedState === null ||
      state !== storedState
    ) {
      throw new Error("auth state error");
    }

    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`,
      },
    });
    const githubUser = await githubUserResponse.json();

    const claims = validateSchemaOrThrow(GithubClaimSchema, githubUser);

    const foundUser = await queryAuthUserByEmail(claims.email);
    if (!foundUser) {
      await signupUserOrThrow({
        email: claims.email,
        username: claims.name || claims.email,
        password: randPassword(),
      });
    } else {
      await loginUserByIdOrThrow(foundUser.id);
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
