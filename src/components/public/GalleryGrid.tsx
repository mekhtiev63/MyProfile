"use client";

import { useState } from "react";
import { gallery } from "@/data/publicSales";

function GalleryItem({
  src,
  caption,
  placeholder,
}: {
  src: string;
  caption: string;
  placeholder: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="group overflow-hidden border border-[var(--hairline)]">
      <div className="relative aspect-[4/3] bg-[var(--bg-mid)]">
        {!failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={caption}
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col justify-end bg-[linear-gradient(180deg,rgba(13,59,42,0.35),rgba(4,12,9,0.95))] p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-ink-faint">
              {placeholder}
            </p>
            <p className="mt-2 text-sm text-ink-muted">
              Добавьте файл в <code className="text-mint">public{src}</code>
            </p>
          </div>
        )}
      </div>
      <figcaption className="border-t border-[var(--hairline)] px-4 py-3 text-sm text-ink">
        {caption}
      </figcaption>
    </figure>
  );
}

export default function GalleryGrid() {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      {gallery.map((item) => (
        <GalleryItem key={item.src} {...item} />
      ))}
    </div>
  );
}
