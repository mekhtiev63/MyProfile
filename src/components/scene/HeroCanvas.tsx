"use client";

import dynamic from "next/dynamic";

const AbstractScene = dynamic(() => import("./AbstractScene"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="h-full w-full"
      style={{
        background:
          "radial-gradient(circle at 55% 40%, rgba(31,157,99,0.28), transparent 45%), #040c09",
      }}
    />
  ),
});

export default function HeroCanvas() {
  return <AbstractScene />;
}
