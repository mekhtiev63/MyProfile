"use client";

import { contact } from "@/data/publicActivity";
import ThreadCanvas from "@/components/thread/ThreadCanvas";
import { useThread } from "@/lib/threads/use-thread";
import dynamic from "next/dynamic";

const ThreadCharacter = dynamic(() => import("@/components/thread/ThreadCharacter"), {
  ssr: false,
  loading: () => (
    <div
      aria-hidden
      className="mx-auto aspect-[4/5] w-[min(100%,18rem)] animate-pulse rounded-3xl bg-[rgba(94,224,160,0.06)] sm:w-72 md:mx-0 md:w-80"
    />
  ),
});

export default function Hero() {
  const { thread } = useThread();
  const hero = thread.hero;

  return (
    <section
      id="top"
      className="site-atmosphere relative isolate overflow-hidden pt-14 md:min-h-[100svh]"
    >
      <ThreadCanvas />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-12 pt-8 md:min-h-[calc(100svh-3.5rem)] md:flex-row md:items-center md:justify-between md:gap-8 md:px-10 md:py-20">
        <div className="max-w-xl transition-opacity duration-500" key={thread.id}>
          <p className="anim-rise text-sm font-semibold uppercase tracking-[0.16em] text-emerald">
            {hero.eyebrow}
          </p>

          <h1 className="anim-rise anim-rise-delay-1 mt-5 font-[family-name:var(--font-display)] text-[clamp(2.4rem,7vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.04em] text-ink">
            Мехтиев Руслан
          </h1>

          <p className="anim-rise anim-rise-delay-2 mt-6 max-w-lg font-[family-name:var(--font-display)] text-[clamp(1.2rem,2.8vw,1.65rem)] font-semibold leading-snug tracking-[-0.02em] text-mint">
            {hero.title}
          </p>

          <p className="anim-rise anim-rise-delay-2 mt-4 max-w-md text-base leading-relaxed text-ink-muted md:text-[1.05rem]">
            {hero.lead}
          </p>

          <div className="anim-rise anim-rise-delay-3 mt-9">
            <a
              href={contact.telegram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer items-center justify-center rounded-md bg-emerald px-6 py-3.5 text-sm font-semibold text-[#04110c] transition duration-200 hover:bg-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
            >
              {hero.cta}
            </a>
          </div>
        </div>

        <div className="anim-rise anim-rise-delay-2 shrink-0 md:max-w-[42%]">
          <ThreadCharacter />
        </div>
      </div>
    </section>
  );
}
