export const Skeleton = () => {
  return (
    <div className="py-4 flex flex-col gap-4">
      <div className="rounded-md shadow h-32 bg-muted animate-pulse"></div>
      <div className="rounded-md shadow h-48 bg-muted animate-pulse"></div>
      <div className="rounded-md shadow h-32 bg-muted animate-pulse"></div>
      <div className="rounded-md shadow h-32 bg-muted animate-pulse"></div>
      <div className="rounded-md shadow h-48 bg-muted animate-pulse"></div>
    </div>
  );
};
