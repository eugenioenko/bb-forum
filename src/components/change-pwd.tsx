"use client";

import { useSubmitPassword } from "@/hooks/use-submit-password";
import {
  ChangePasswordSchemaRefined,
  ChangePasswordSchemaType,
} from "@/schemas/change-pwd.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./button";

export const ChangePwdForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchemaRefined),
  });

  const { serverError, isPending, doSubmit } = useSubmitPassword();

  return (
    <form onSubmit={handleSubmit(doSubmit)} className="card">
      <div className="card-header">Change Password</div>
      <div className="px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-4">
          <div>
            <label>Current Password</label>
            <input
              className="w-full"
              placeholder="current password"
              autoComplete="off"
              type="password"
              {...register("currentPassword")}
            />
            {errors.currentPassword && (
              <span className="error">{errors.currentPassword.message}</span>
            )}
          </div>
          <div>
            <label>New Password</label>
            <input
              className="w-full"
              placeholder="new password"
              autoComplete="new-password"
              type="password"
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <span className="error">{errors.newPassword.message}</span>
            )}
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              className="w-full"
              placeholder="confirm password"
              type="password"
              autoComplete="new-password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword.message}</span>
            )}
          </div>
        </div>
        <div>
          {serverError && <span className="error">{serverError}</span>}
          <div className="flex justify-end">
            <Button type="submit" isLoading={isPending}>
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
