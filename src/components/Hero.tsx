import HeroCanvas from "@/components/scene/HeroCanvas";
import { contact } from "@/data/publicActivity";

const paths = [
  {
    href: "#public",
    title: "Как общественника",
    desc: "СПК, МГД, форумы, награды",
    primary: true,
  },
  {
    href: "#it",
    title: "Как разработчика",
    desc: "Go в МТС, метрики, стек",
    primary: false,
  },
];

export default function Hero() {
  return (
    <section className="site-atmosphere relative isolate min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 -z-10 md:left-[28%]">
        <HeroCanvas />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5] bg-[linear-gradient(90deg,var(--bg-deep)_0%,rgba(4,12,9,0.92)_34%,rgba(4,12,9,0.35)_62%,transparent_82%)] md:bg-[linear-gradient(90deg,var(--bg-deep)_0%,rgba(4,12,9,0.88)_28%,rgba(4,12,9,0.25)_55%,transparent_78%)]"
      />

      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute left-[12%] top-[18%] h-56 w-56 rounded-full blur-3xl md:left-[18%]"
        style={{ background: "var(--glow)" }}
      />

      <div className="site-grain" aria-hidden />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-end px-6 pb-14 pt-28 md:justify-center md:px-10 md:pb-20 md:pt-24">
        <div className="max-w-xl md:max-w-lg">
          <p className="anim-rise text-sm font-semibold uppercase tracking-[0.16em] text-emerald">
            {contact.openTo}
          </p>

          <p className="anim-rise anim-rise-delay-1 mt-4 font-[family-name:var(--font-display)] text-[clamp(2.6rem,8vw,5.4rem)] font-bold leading-[0.92] tracking-[-0.04em] text-ink">
            Мехтиев
            <br />
            Руслан
          </p>

          <h1 className="anim-rise anim-rise-delay-2 mt-6 max-w-md font-[family-name:var(--font-display)] text-[clamp(1.35rem,3.4vw,2rem)] font-semibold leading-snug tracking-[-0.02em] text-mint">
            Код и общественная работа — два трека одного пути
          </h1>

          <p className="anim-rise anim-rise-delay-2 mt-4 max-w-md text-base leading-relaxed text-ink-muted md:text-[1.05rem]">
            Go-разработчик в МТС и председатель СПК. Выберите, с какой стороны
            смотреть.
          </p>

          <div className="anim-rise anim-rise-delay-3 mt-8 grid gap-3 sm:grid-cols-2">
            {paths.map((path) => (
              <a
                key={path.href}
                href={path.href}
                className={`cursor-pointer rounded-md border px-4 py-4 transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint ${
                  path.primary
                    ? "border-emerald/50 bg-emerald/10 hover:bg-emerald/20"
                    : "border-[var(--hairline)] hover:border-mint/40"
                }`}
              >
                <p className="font-[family-name:var(--font-display)] text-sm font-semibold text-ink">
                  {path.title}
                </p>
                <p className="mt-1 text-xs text-ink-faint">{path.desc}</p>
              </a>
            ))}
          </div>

          <div className="anim-rise anim-rise-delay-3 mt-6 flex flex-wrap items-center gap-3">
            <a
              href={contact.telegram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex cursor-pointer items-center justify-center rounded-md bg-emerald px-5 py-3 text-sm font-semibold text-[#04110c] transition duration-200 hover:bg-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
            >
              {contact.ctaLabel}
            </a>
            <a
              href="#contact"
              className="inline-flex cursor-pointer items-center justify-center rounded-md border border-[var(--hairline)] px-5 py-3 text-sm font-semibold text-ink transition duration-200 hover:border-mint/50 hover:text-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
            >
              Контакты
            </a>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--bg-deep)] to-transparent"
      />
    </section>
  );
}
