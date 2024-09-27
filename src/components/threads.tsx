import Link from "next/link";

interface Props {
  threads?: ThreadModel[];
}

export const Threads = ({ threads }: Props) => {
  if (!threads?.length) {
    return;
  }
  return threads.map((thread) => (
    <div
      className="grid grid-cols-1 md:grid-cols-12 border-b border-gray-300 px-2 py-1.5 items-center"
      key={thread.id}
    >
      <div className="col-span-7 px-2">
        <div className="text-primary">
          <Link href={`/thread/${thread.id}`}>{thread.title}</Link>
        </div>
      </div>
      <div className="hidden md:block col-span-2 text-center px-2 ">
        {thread.posts?.length}
      </div>
      <div className="hidden md:block col-span-3 px-2">todo</div>
    </div>
  ));
};
