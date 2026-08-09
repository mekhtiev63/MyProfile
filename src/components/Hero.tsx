"use client";

import HeroBackdrop from "@/components/HeroBackdrop";
import HeroCanvas from "@/components/scene/HeroCanvas";
import { contact } from "@/data/publicActivity";
import { useSiteMode } from "@/lib/site-mode";

const copy = {
  public: {
    eyebrow: "Общественный трек",
    title: "Строю молодёжные проекты и работаю с городской повесткой",
    lead: "Председатель СПК Тимирязевки, помощник депутата МГД на общественных началах.",
    cta: "Написать в Telegram",
  },
  dev: {
    eyebrow: "Dev-трек",
    title: "Golang-разработчик платформы инцидентов в МТС",
    lead: "Микросервисы, высокая нагрузка, автоматизация поддержки: Go, Kafka, PostgreSQL, gRPC.",
    cta: "Написать в Telegram",
  },
} as const;

export default function Hero() {
  const { mode } = useSiteMode();
  const content = copy[mode];

  return (
    <section
      id="top"
      className="site-atmosphere relative isolate overflow-hidden pt-14 md:min-h-[100svh]"
    >
      <HeroBackdrop />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden opacity-80 md:block md:w-[62%]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to left, black 55%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          maskImage:
            "linear-gradient(to left, black 55%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%)",
          WebkitMaskComposite: "source-in",
          maskComposite: "intersect",
        }}
      >
        <HeroCanvas />
      </div>

      <div className="relative mx-auto flex w-full max-w-6xl flex-col justify-start px-6 pb-12 pt-8 md:min-h-[calc(100svh-3.5rem)] md:justify-center md:px-10 md:py-20">
        <div className="max-w-xl">
          <p className="anim-rise text-sm font-semibold uppercase tracking-[0.16em] text-emerald">
            {content.eyebrow}
          </p>

          <h1 className="anim-rise anim-rise-delay-1 mt-5 font-[family-name:var(--font-display)] text-[clamp(2.4rem,7vw,4.6rem)] font-bold leading-[0.95] tracking-[-0.04em] text-ink">
            Мехтиев Руслан
          </h1>

          <p className="anim-rise anim-rise-delay-2 mt-6 max-w-lg font-[family-name:var(--font-display)] text-[clamp(1.2rem,2.8vw,1.65rem)] font-semibold leading-snug tracking-[-0.02em] text-mint">
            {content.title}
          </p>

          <p className="anim-rise anim-rise-delay-2 mt-4 max-w-md text-base leading-relaxed text-ink-muted md:text-[1.05rem]">
            {content.lead}
          </p>

          <div className="anim-rise anim-rise-delay-3 mt-9">
            <a
              href={contact.telegram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer items-center justify-center rounded-md bg-emerald px-6 py-3.5 text-sm font-semibold text-[#04110c] transition duration-200 hover:bg-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
            >
              {content.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
