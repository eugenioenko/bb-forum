import Link from "next/link";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="flex flex-col pt-4">
      <div className="text-xs text-center px-2">
        {year} <Link href="https://github.com/eugenioenko/">@eugenioenko</Link>.
        All rights reserved.
      </div>
      <div className="flex justify-center gap-2 text-sm py-1">
        <Link href="/privacy">Privacy</Link> | <Link href="/terms">Terms</Link>{" "}
        |<Link href="/contact">Contact</Link>
      </div>
    </div>
  );
};
