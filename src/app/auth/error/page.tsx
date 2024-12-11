import { ServerError } from "@/components/server-error";

export default function AuthErrorPage() {
  return (
    <ServerError error="An unexpected error occurred during the authentication process. Please try again later." />
  );
}
