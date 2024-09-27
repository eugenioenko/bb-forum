import { Thread } from "@/components/thread";

export default function ThreadPage({
  params,
}: {
  params: { threadId: string };
}) {
  return <Thread id={params.threadId} />;
}
