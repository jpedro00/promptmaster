"use client";

import dynamic from "next/dynamic";

const PromptScene = dynamic(() => import("./PromptScene"), {
  ssr: false,
  loading: () => null,
});

export default function SceneClient() {
  return <PromptScene />;
}
