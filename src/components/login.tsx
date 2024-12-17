"use client";
import { useSubmitLogin } from "@/hooks/use-submit-login";
import { LoginSchema, LoginSchemaType } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "./button";
import { Logo } from "./logo";
import {
  IconBrandGit,
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandGoogleFilled,
  IconBrandTwitter,
} from "@tabler/icons-react";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const { serverError, isPending, doSubmit } = useSubmitLogin();

  return (
    <div className="flex-grow flex-center">
      <form
        onSubmit={handleSubmit(doSubmit)}
        className="card flex flex-col gap-4 p-4 w-80"
      >
        <div className="flex-center py-8">
          <div className="w-32">
            <Logo />
          </div>
        </div>
        <div>
          <label>Email</label>
          <input
            className="w-full"
            placeholder="email"
            autoComplete="email"
            {...register("email")}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <div className="pb-4">
          <label>Password</label>
          <input
            className="w-full"
            placeholder="password"
            autoComplete="current-password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>
        {serverError && <span className="error pt-2">{serverError}</span>}
        <Button type="submit" isLoading={isPending}>
          Login
        </Button>
        <div className="flex py-2 items-center gap-4 opacity-75">
          <div className="flex-grow">
            <div className="border-t border-border"></div>
          </div>
          <div>Or</div>
          <div className="flex-grow">
            <div className="border-t border-border"></div>
          </div>
        </div>
        <LoginWith />
        <NotAMember />
      </form>
    </div>
  );
};

export const NotAMember = () => {
  return (
    <div className="text-center py-2">
      <span>Not a member?</span>
      <Link href="/auth/signup" className="text-primary ml-1 underline">
        Create account
      </Link>
    </div>
  );
};

export const LoginWith = () => {
  return (
    <div className="text-center flex flex-col gap-4 justify-center">
      <Link className="button w-full flex" href="/api/auth/google">
        <IconBrandGoogleFilled />
        <span className="flex-grow">Login with Google</span>
      </Link>
      <Link className="button w-full flex" href="/api/auth/github">
        <IconBrandGithub />
        <span className="flex-grow">Login with Github</span>
      </Link>
    </div>
  );
};
