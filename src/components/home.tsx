"use client";

import { useHomeSectionsQuery } from "@/graphql/generated/schema";
import { Categories } from "./categories";
import { Skeleton } from "./skeleton";

export const Home = () => {
  const { data, loading, error } = useHomeSectionsQuery();

  if (loading) {
    return <Skeleton />;
  }

  if (error || !data) {
    return "error";
  }

  return (
    <div className="pt-4 flex flex-col gap-4">
      {data.sections.map((section) => (
        <div key={section.id} className="card">
          <div className="bg-primary  font-header text-white">
            <div className="grid grid-cols-1 md:grid-cols-12 px-2 py-1.5">
              <div className="col-span-7 px-2">{section?.name}</div>
              <div className="hidden md:block col-span-2 text-center px-2">
                Threads
              </div>
              <div className="hidden md:block col-span-2 px-2">Last Post</div>
            </div>
          </div>
          <div>
            <Categories categories={section.categories} />
          </div>
        </div>
      ))}
    </div>
  );
};
