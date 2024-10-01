"use client";
import { useSubmitLogin } from "@/hooks/use-submit-login";
import { LoginSchema, LoginSchemaType } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "./button";
import { Logo } from "./logo";

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
    <div className="min-h-dvh flex-center">
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
        <div>
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
        <div className="pt-2"></div>
        {serverError && <span className="error">{serverError}</span>}
        <Button type="submit" isLoading={isPending}>
          Login
        </Button>
        <div className="text-center">
          <span>Not a member?</span>

          <Link href="/auth/signup" className="text-primary ml-1 underline">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};
