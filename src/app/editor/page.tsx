"use client";

import { Editor } from "@/components/editor";

export default function EditorPage() {
  console.log("render");
  return (
    <div className="pt-4">
      <Editor />
    </div>
  );
}
