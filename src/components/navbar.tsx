"use client";
import { useAuthStore } from "@/stores/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactElement } from "react";
import { Logo } from "./logo";
import {
  IconHome,
  IconLogout,
  IconUser,
  IconUserPlus,
} from "@tabler/icons-react";
import { ThemeSelector } from "./theme-selector";

export const Navbar = () => {
  const path = usePathname();
  const auth = useAuthStore();

  function signupOrLogin(): ReactElement {
    if (auth.isLoggedIn) {
      return (
        <Link
          href="/auth/logout"
          className={path === "/auth/logout" ? "underline" : ""}
        >
          <IconLogout />
          Logout
        </Link>
      );
    }
    return (
      <>
        <Link
          href="/auth/login"
          className={path === "/auth/login" ? "underline" : ""}
        >
          <IconUser />
          Login
        </Link>
        <Link
          href="/auth/signup"
          className={path === "/auth/signup" ? "underline" : ""}
        >
          <IconUserPlus />
          Signup
        </Link>
      </>
    );
  }

  if (path.startsWith("/auth/")) {
    return;
  }

  return (
    <div className="card bg-white flex flex-col">
      <div className="flex items-center gap-4 p-6">
        <div className="w-32">
          <Logo />
        </div>
        <div className="flex-grow">
          <div className="text-5xl font-header">Bulletin Board</div>
          <div className="flex">
            <div className="text-lg font-thin flex-grow">
              Forum powered by Next.js
            </div>
            <ThemeSelector />
          </div>
        </div>
      </div>
      <nav className="bg-secondary text-inverse text-sm gap-4 flex px-4 py-1.5 justify-between">
        <div className="flex items-center">
          <Link href="/home" className={path === "/home" ? "underline" : ""}>
            <IconHome />
            Home
          </Link>
        </div>
        <div className="flex items-center gap-4">{signupOrLogin()}</div>
      </nav>
    </div>
  );
};
