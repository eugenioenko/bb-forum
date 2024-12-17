import { envIsProduction } from "@/environment";
import { github } from "@/services/github.client";
import { generateState } from "arctic";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
  const state = generateState();
  const url = github.createAuthorizationURL(state, ["user:email"]);

  const cookieStore = await cookies();
  cookieStore.set("github_oauth_state", state, {
    path: "/",
    httpOnly: true,
    secure: envIsProduction,
    maxAge: 60 * 10, // 10 minutes
    sameSite: "lax",
  });

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  });
}
