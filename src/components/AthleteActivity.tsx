import {
  athleteDisciplines,
  athleteExperience,
  athleteIntro,
} from "@/data/athleteActivity";

export default function AthleteActivity() {
  return (
    <section
      id="sport"
      className="relative border-t border-[var(--hairline)] px-6 py-24 md:px-10"
      style={{
        background:
          "linear-gradient(180deg, #040c09 0%, #061912 40%, #040c09 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-emerald">
            Спорт
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
            {athleteIntro.role}
          </h2>
          <p className="mt-3 text-sm text-ink-faint">
            {athleteIntro.context} · {athleteIntro.period}
          </p>
          <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">
            {athleteIntro.summary}
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
            {athleteIntro.focus}
          </p>
        </div>

        <div className="mt-16 border-t border-[var(--hairline)] pt-16">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
            Путь
          </h3>
          <ul className="mt-10 space-y-10">
            {athleteExperience.map((item) => (
              <li
                key={item.title}
                className="grid gap-2 border-l border-mint/20 pl-6 md:grid-cols-[180px_1fr] md:gap-12 md:pl-8"
              >
                <div>
                  <p className="text-sm text-ink-faint">{item.period}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-emerald">
                    {item.org}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p className="mt-2 leading-relaxed text-ink-muted">{item.summary}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 border-t border-[var(--hairline)] pt-16">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
            Дисциплины
          </h3>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {athleteDisciplines.map((group) => (
              <div key={group.title}>
                <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.14em] text-emerald">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-2 text-ink-muted">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-12 text-xs text-ink-faint">
          * Мок-данные для athlete-нити — заменим на реальные цифры и турниры.
        </p>
      </div>
    </section>
  );
}
