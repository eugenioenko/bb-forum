import { IconCoffee } from "@tabler/icons-react";

export const NoResults = () => {
  return (
    <div className="flex gap-4 items-center p-4">
      <div>
        <IconCoffee size={32} />
      </div>
      <div className="flex-grow">
        No results found. Be the first to post or try a different search query
      </div>
    </div>
  );
};
