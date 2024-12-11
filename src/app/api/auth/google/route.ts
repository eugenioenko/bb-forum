import { envIsProduction } from "@/environment";
import { google } from "@/services/google.client";
import { generateState, generateCodeVerifier } from "arctic";
import { cookies } from "next/headers";

export async function GET(): Promise<Response> {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();
  const url = google.createAuthorizationURL(state, codeVerifier, [
    "email",
    "profile",
  ]);

  const cookieStore = await cookies();
  cookieStore.set("google_oauth_state", state, {
    path: "/",
    httpOnly: true,
    secure: envIsProduction,
    maxAge: 60 * 10, // 10 minutes
    sameSite: "lax",
  });
  cookieStore.set("google_code_verifier", codeVerifier, {
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
