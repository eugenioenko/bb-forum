"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Logo } from "./logo";
import Link from "next/link";
import { Button } from "./button";
import { useSubmitLogin } from "@/hooks/use-submit-login";
import { SignupSchemaType, SignupSchema } from "@/schemas/login-schema";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: { email: "user@mail.com", password: "password" },
  });

  const { serverError, isPending, doSubmitLogin } = useSubmitLogin();

  return (
    <div className="min-h-dvh flex-center">
      <form
        onSubmit={handleSubmit(doSubmitLogin)}
        className="card flex flex-col gap-4 p-4 w-80"
      >
        <div className="flex-center py-8">
          <div className="w-32">
            <Logo />
          </div>
        </div>
        <div>
          <input
            className="w-full"
            placeholder="email"
            {...register("email")}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <div>
          <input
            className="w-full"
            placeholder="password"
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
          <span className="text-gray-500">Not a member?</span>

          <Link href="/signup" className="text-primary ml-1 underline">
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};
