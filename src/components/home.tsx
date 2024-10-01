"use client";

import { HomePageModel } from "@/queries/server/home.prisma";
import { Categories } from "./categories";

interface Props {
  sections: HomePageModel;
}
export const Home = ({ sections }: Props) => {
  return (
    <div className="pt-4 flex flex-col gap-4">
      {sections.map((section) => (
        <div key={section.id} className="card">
          <div className="bg-secondary font-header text-inverse">
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
