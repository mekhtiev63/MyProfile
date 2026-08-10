import ExperienceTimeline from "@/components/ExperienceTimeline";
import {
  competencies,
  impactMetrics,
  recognitions,
  type RecognitionKind,
} from "@/data/publicActivity";

const kindLabel: Record<RecognitionKind, string> = {
  благодарность: "Благодарность",
  "благодарственное письмо": "Благодарственное письмо",
};

export default function PublicActivity() {
  const featured = recognitions.find((item) => item.featured) ?? recognitions[0];
  const rest = recognitions.filter((item) => item !== featured);

  return (
    <section
      id="public"
      className="relative border-t border-[var(--hairline)] px-6 py-24 md:px-10"
      style={{
        background:
          "linear-gradient(180deg, #040c09 0%, #071510 40%, #040c09 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-emerald">
            Общественная деятельность
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
            От студенческого клуба до городской повестки
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">
            Руковожу командами, провожу мероприятия, работаю с жителями и
            выстраиваю устойчивые молодёжные проекты.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-y border-[var(--hairline)] py-10 lg:grid-cols-4">
          {impactMetrics.map((metric) => (
            <div key={metric.label}>
              <p className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.4rem)] font-semibold tracking-[-0.03em] text-mint">
                {metric.value}
              </p>
              <p className="mt-2 text-sm leading-snug text-ink-faint">
                {metric.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 border-t border-[var(--hairline)] pt-16">
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.16em] text-emerald">
            {kindLabel[featured.kind]}
          </p>
          <p className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.35rem,3vw,1.85rem)] font-semibold leading-snug tracking-[-0.02em] text-ink">
            {featured.from}
          </p>
          <p className="mt-3 max-w-3xl text-ink-muted">{featured.for}</p>
          <p className="mt-4 text-sm text-ink-faint">{featured.date}</p>
        </div>

        <ExperienceTimeline />

        <div className="mt-10 border-t border-[var(--hairline)] pt-20">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
            Благодарности и благодарственные письма
          </h3>
          <ul className="mt-10 space-y-8">
            {rest.map((item) => (
              <li
                key={`${item.kind}-${item.from}-${item.date}`}
                className="grid gap-2 md:grid-cols-[160px_1fr] md:gap-12"
              >
                <p className="text-sm text-ink-faint">{item.date}</p>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald">
                    {kindLabel[item.kind]}
                  </p>
                  <p className="mt-2 font-semibold text-ink">{item.from}</p>
                  <p className="mt-2 leading-relaxed text-ink-muted">
                    {item.for}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-20 border-t border-[var(--hairline)] pt-20">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
            Компетенции
          </h3>
          <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {competencies.map((group) => (
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
      </div>
    </section>
  );
}
