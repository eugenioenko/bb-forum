"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./button";
import { ProfileSchemaType, ProfileSchema } from "@/schemas/profile-schema";
import { useSubmitProfile } from "@/hooks/use-submit-profile";
import { usePrefetchedQuery } from "@/utils/use-prefetched-query";
import { ProfileModel } from "@/queries/server/profile.prisma";
import { useAuthStore } from "@/stores/auth.store";
import { Skeleton } from "./skeleton";
import { useEffect } from "react";

export const UpdateProfile = () => {
  const userId = useAuthStore().authUser?.id;
  const { data, isLoading } = usePrefetchedQuery<ProfileModel>(
    `/api/profile/${userId}`
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
  });

  useEffect(() => {
    if (data?.data.profile?.bio) {
      setValue("bio", data?.data.profile?.bio);
    }
  }, [data, setValue]);

  const { serverError, isPending, doSubmit } = useSubmitProfile();

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <form onSubmit={handleSubmit(doSubmit)} className="card">
      <div className="card-header">Update Profile</div>
      <div className="px-4 py-4">
        <label>Bio</label>
        <textarea className="w-full min-h-32" {...register("bio")}></textarea>
        {errors.bio && <span className="error">{errors.bio.message}</span>}
        {serverError && <span className="error">{serverError}</span>}
        <div className="pt-4 flex justify-end">
          <Button type="submit" isLoading={isPending}>
            Update Profile
          </Button>
        </div>
      </div>
    </form>
  );
};
