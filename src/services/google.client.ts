import { envIsProduction } from "@/environment";
import { Google } from "arctic";

export const google = new Google(
  process.env.GOOGLE_CLIENT_ID || "",
  process.env.GOOGLE_CLIENT_SECRET || "",
  envIsProduction
    ? "https://bbofurm.yy-dev.top/api/auth/google/callback"
    : "http://localhost:4200/api/auth/google/callback"
);
