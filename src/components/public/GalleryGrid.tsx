import Image from "next/image";
import { gallery } from "@/data/publicSales";

export default function GalleryGrid() {
  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      {gallery.map((item) => (
        <figure
          key={item.src}
          className="overflow-hidden border border-[var(--hairline)]"
        >
          <div className="relative aspect-[4/3] bg-[var(--bg-mid)]">
            <Image
              src={item.src}
              alt={item.caption}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          <figcaption className="border-t border-[var(--hairline)] px-4 py-3 text-sm text-ink">
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
