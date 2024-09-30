"use client";
import { useSubmitSignup } from "@/hooks/use-submit-signup";
import {
  SignupFormSchema,
  SignupFormSchemaType,
} from "@/schemas/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Button } from "./button";
import { Logo } from "./logo";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormSchemaType>({
    resolver: zodResolver(SignupFormSchema),
  });

  const { serverError, isPending, doSubmit } = useSubmitSignup();

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
            autoComplete="username"
            {...register("email")}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label>Username</label>
          <input
            className="w-full"
            placeholder="username"
            autoComplete="off"
            {...register("username")}
          />
          {errors.username && (
            <span className="error">{errors.username.message}</span>
          )}
        </div>
        <div>
          <label>Password</label>
          <input
            className="w-full"
            placeholder="password"
            autoComplete="new-password"
            type="password"
            {...register("password")}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            className="w-full"
            placeholder="password"
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}
        </div>
        <div className="pt-2"></div>
        {serverError && <span className="error">{serverError}</span>}
        <Button type="submit" isLoading={isPending}>
          Sign Up
        </Button>
        <div className="text-center">
          <span className="text-gray-500">Have an account?</span>

          <Link href="/auth/login" className="text-primary ml-1 underline">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
};
