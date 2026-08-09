import HeroCanvas from "@/components/scene/HeroCanvas";

const links = [
  { label: "Telegram", href: "https://t.me/meruslano77" },
  { label: "GitHub", href: "https://github.com/mekhtiev63" },
  { label: "VK", href: "https://vk.com/meruslano" },
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
          <p className="anim-rise font-[family-name:var(--font-display)] text-[clamp(2.6rem,8vw,5.4rem)] font-bold leading-[0.92] tracking-[-0.04em] text-ink">
            Мехтиев
            <br />
            Руслан
          </p>

          <h1 className="anim-rise anim-rise-delay-1 mt-6 max-w-md font-[family-name:var(--font-display)] text-[clamp(1.35rem,3.4vw,2rem)] font-semibold leading-snug tracking-[-0.02em] text-mint">
            На стыке кода, общества и спорта
          </h1>

          <p className="anim-rise anim-rise-delay-2 mt-4 max-w-md text-base leading-relaxed text-ink-muted md:text-[1.05rem]">
            Go-разработчик в МТС · молодёжная политика · спорт
          </p>

          <div className="anim-rise anim-rise-delay-3 mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#public"
              className="inline-flex cursor-pointer items-center justify-center rounded-md bg-emerald px-5 py-3 text-sm font-semibold text-[#04110c] transition duration-200 hover:bg-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
            >
              Общественная деятельность
            </a>
            <a
              href="#it"
              className="inline-flex cursor-pointer items-center justify-center rounded-md border border-[var(--hairline)] bg-transparent px-5 py-3 text-sm font-semibold text-ink transition duration-200 hover:border-mint/50 hover:text-mint focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint"
            >
              IT
            </a>
          </div>

          <nav
            aria-label="Соцсети"
            className="anim-rise anim-rise-delay-3 mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-faint"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer transition duration-200 hover:text-mint"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[var(--bg-deep)] to-transparent"
      />
    </section>
  );
}
