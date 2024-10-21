"use client";

import { HomeStatsModel } from "@/models/home-stats";
import { usePrefetchedQuery } from "@/utils/use-prefetched-query";
import { UserLink } from "./user-link";

export const Statistics = () => {
  const { data } = usePrefetchedQuery<HomeStatsModel>(`/api/stats/home`);

  const stats = data?.data;
  return (
    <div className="card">
      <div className="card-header">Statistics</div>
      <div className="px-4 py-2 flex flex-wrap gap-1">
        <div>
          Posts <b>{stats?.posts}</b>
        </div>
        <div>•</div>
        <div>
          Topics <b>{stats?.threads}</b>
        </div>
        <div>•</div>
        <div>
          Members <b>{stats?.users}</b>
        </div>
        <div>•</div>
        <div>
          Latest member <UserLink user={stats?.lastUser} />
        </div>
      </div>
    </div>
  );
};
