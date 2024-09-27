"use client";

import { useAxios } from "@/contexts/axios-instance";

export default function Post() {
  const client = useAxios();
  const onSubmit = async () => {
    const { data } = await client.post("threads", {
      content: "content",
      title: "title",
      categoryId: "12ad8e87-f62a-4aff-9ab8-4bbcfd1748c4",
    });
  };
  return (
    <div>
      <div>Post</div>
      <button type="button" onClick={() => onSubmit()}>
        Create
      </button>
    </div>
  );
}
