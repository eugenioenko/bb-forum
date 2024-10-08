import { bbfAdminEmail, bbfName } from "@/environment";
import Link from "next/link";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-center items-center gap-2 text-sm py-1">
        <Link href="/home">Home</Link>
        <span className="text-xs">|</span>
        <Link href="/privacy">Privacy</Link>
        <span className="text-xs">|</span>
        <Link href="/terms">Terms</Link>
        <span className="text-xs">|</span>
        <Link href={`mailto:${bbfAdminEmail}`}>Contact</Link>
      </div>
      <div className="text-xs text-center px-2">
        <Link href="https://github.com/eugenioenko/">{bbfName}</Link> {year}.
        All rights reserved.
      </div>
    </div>
  );
};
