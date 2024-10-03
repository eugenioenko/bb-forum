import { bbfAdminEmail, bbfName } from "@/environment";
import Link from "next/link";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-center gap-4 text-sm py-1">
        <Link href="/home">Home</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href={`mailto:${bbfAdminEmail}`}>Contact</Link>
      </div>
      <div className="text-xs text-center px-2">
        <Link href="https://github.com/eugenioenko/">{bbfName}</Link> {year}.
        All rights reserved.
      </div>
    </div>
  );
};
