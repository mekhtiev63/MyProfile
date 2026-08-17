"use client";

import { contact } from "@/data/publicActivity";
import ThreadCanvas from "@/components/thread/ThreadCanvas";
import ThreadWeaver from "@/components/thread/ThreadWeaver";
import { useThread } from "@/lib/threads/use-thread";

export default function Hero() {
  const { mode, thread } = useThread();
  const hero = thread.hero;
  const isPublic = mode === "public";

  return (
    <section
      id="top"
      className="site-atmosphere relative overflow-hidden pt-14 md:min-h-[100svh]"
    >
      {isPublic ? <div className="civic-motion" aria-hidden /> : <ThreadCanvas />}

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pb-12 pt-8 md:min-h-[calc(100svh-3.5rem)] md:grid-cols-[minmax(0,1fr)_minmax(240px,0.9fr)] md:px-10 md:py-20">
        <div className="relative z-[2] flex max-w-xl flex-col justify-center md:min-h-[calc(100svh-8rem)]">
          <div className="transition-opacity duration-500" key={thread.id}>
            <p className={`anim-rise text-sm font-semibold uppercase tracking-[0.16em] ${isPublic ? "text-sky-200" : "text-emerald"}`}>
              {hero.eyebrow}
            </p>

            <h1 className={`anim-rise anim-rise-delay-1 mt-5 font-[family-name:var(--font-display)] text-[clamp(2.4rem,7vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.04em] ${isPublic ? "text-white" : "text-ink"}`}>
              Мехтиев Руслан
            </h1>

            <p className={`anim-rise anim-rise-delay-2 mt-6 max-w-lg font-[family-name:var(--font-display)] text-[clamp(1.2rem,2.8vw,1.65rem)] font-semibold leading-snug tracking-[-0.02em] ${isPublic ? "text-sky-100" : "text-mint"}`}>
              {hero.title}
            </p>

            <p className={`anim-rise anim-rise-delay-2 mt-4 max-w-md text-base leading-relaxed md:text-[1.05rem] ${isPublic ? "text-slate-200" : "text-ink-muted"}`}>
              {hero.lead}
            </p>

            <div className="anim-rise anim-rise-delay-3 mt-9">
              <a
                href={contact.telegram}
                target="_blank"
                rel="noreferrer"
                className={
                  isPublic
                    ? "civic-cta inline-flex cursor-pointer items-center justify-center rounded-md px-6 py-3.5 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
                    : "inline-flex cursor-pointer items-center justify-center rounded-md bg-emerald px-6 py-3.5 text-sm font-semibold text-[#04110c] transition duration-200 hover:bg-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
                }
              >
                {hero.cta}
              </a>
            </div>
          </div>
        </div>

        <div className={isPublic ? "hero-portrait-slot" : "weaver-slot"}>
          {isPublic ? (
            <div className="hero-portrait">
              <img
                src="/portrait.jpg?v=zoom"
                alt="Мехтиев Руслан"
                width={706}
                height={1024}
              />
            </div>
          ) : (
            <ThreadWeaver />
          )}
        </div>
      </div>
    </section>
  );
}
