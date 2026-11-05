"use client";

import { useEffect, useState } from "react";
import { contact } from "@/data/publicActivity";
import dynamic from "next/dynamic";
import { useSectionId } from "@/lib/site-mode";
import { useThread } from "@/lib/threads/use-thread";

const ThreadCanvas = dynamic(() => import("@/components/thread/ThreadCanvas"), {
  ssr: false,
});
const ThreadWeaver = dynamic(() => import("@/components/thread/ThreadWeaver"), {
  ssr: false,
});

export default function Hero() {
  const { mode, thread } = useThread();
  const hero = thread.hero;
  const isPublic = mode === "public";
  const sectionId = useSectionId("top");
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setShowCanvas(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section
      id={sectionId}
      data-sid="top"
      className="site-atmosphere relative overflow-hidden pt-12 sm:pt-14"
    >
      {!isPublic && showCanvas && (
        <div className="pointer-events-none absolute inset-0">
          <ThreadCanvas />
        </div>
      )}

      <div className="relative mx-auto grid w-full max-w-[var(--container)] items-center gap-6 px-[var(--gutter)] pb-10 pt-6 sm:gap-8 sm:pb-12 sm:pt-8 md:min-h-[calc(100dvh-3.5rem)] md:grid-cols-12 md:gap-10 md:pb-16 md:pt-10">
        <div className="relative z-[2] flex flex-col justify-center md:col-span-5">
          <p
            className={`text-sm font-medium ${
              isPublic
                ? "text-[color-mix(in_oklab,var(--color-field-ink)_70%,transparent)]"
                : "text-[var(--color-accent)]"
            }`}
          >
            {isPublic ? "Общество" : "Разработка"}
          </p>

          <h1
            className={`mt-3 font-[family-name:var(--font-display)] text-[clamp(2.1rem,7vw,4rem)] font-bold leading-[0.92] tracking-[var(--tracking-display)] sm:mt-4 ${
              isPublic ? "text-[var(--color-field-ink)]" : "text-[var(--color-ink)]"
            }`}
          >
            Мехтиев Руслан
          </h1>

          <p
            className={`mt-4 max-w-[22ch] font-[family-name:var(--font-display)] text-[clamp(1rem,2.2vw,1.35rem)] font-semibold leading-snug tracking-[-0.02em] sm:mt-5 ${
              isPublic ? "text-[var(--color-field-ink)]" : "text-[var(--color-accent)]"
            }`}
          >
            {hero.title}
          </p>

          <p
            className={`mt-3 max-w-[34ch] text-[0.95rem] leading-relaxed sm:mt-4 sm:text-base ${
              isPublic
                ? "text-[color-mix(in_oklab,var(--color-field-ink)_78%,transparent)]"
                : "text-[var(--color-muted)]"
            }`}
          >
            {hero.lead}
          </p>

          <div className="mt-6 sm:mt-8">
            <a
              href={contact.telegram}
              target="_blank"
              rel="noreferrer"
              className={
                isPublic
                  ? "civic-cta inline-flex min-h-12 w-full cursor-pointer items-center justify-center px-6 py-3.5 text-sm font-semibold transition duration-200 sm:w-auto focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  : "cta-accent inline-flex min-h-12 w-full cursor-pointer items-center justify-center px-6 py-3.5 text-sm font-semibold transition duration-200 sm:w-auto active:translate-y-px"
              }
            >
              {hero.cta}
            </a>
          </div>
        </div>

        <div className="hero-stage relative z-[2] md:col-span-7">
          {isPublic ? (
            <div className="hero-panel hero-panel-portrait is-active">
              <div className="hero-portrait">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="/portrait-560.webp 560w, /portrait.webp 706w"
                    sizes="(max-width: 768px) 350px, 380px"
                  />
                  <img
                    src="/portrait-560.jpg"
                    srcSet="/portrait-560.jpg 560w, /portrait.jpg 706w"
                    sizes="(max-width: 768px) 350px, 380px"
                    alt="Мехтиев Руслан"
                    width={560}
                    height={812}
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>
              </div>
            </div>
          ) : (
            <div className="hero-panel hero-panel-weaver is-active">
              <div className="weaver-slot flex items-center justify-center">
                <ThreadWeaver />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
