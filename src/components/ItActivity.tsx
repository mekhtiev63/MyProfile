import {
  itEducation,
  itExperience,
  itIntro,
  itSkills,
} from "@/data/itActivity";
import { contact } from "@/data/publicActivity";

export default function ItActivity() {
  const main = itExperience[0];
  const side = itExperience.slice(1);

  return (
    <section
      id="it"
      className="relative border-t border-[var(--hairline)] bg-[var(--bg-deep)] px-6 py-24 md:px-10"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="font-[family-name:var(--font-display)] text-sm font-semibold uppercase tracking-[0.18em] text-emerald">
            IT
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,2.75rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
            {itIntro.role} · {itIntro.company}
          </h2>
          <p className="mt-3 text-sm text-ink-faint">{itIntro.period}</p>
          <p className="mt-5 text-base leading-relaxed text-ink-muted md:text-lg">
            {itIntro.summary}
          </p>
          <p className="mt-4 text-base leading-relaxed text-ink-muted md:text-lg">
            {itIntro.goal}
          </p>
        </div>

        <div className="mt-12 grid gap-6 text-sm text-ink-muted md:grid-cols-2">
          <div>
            <p className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.14em] text-emerald">
              Нагрузка
            </p>
            <p className="mt-2">{itIntro.load}</p>
          </div>
          <div>
            <p className="font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.14em] text-emerald">
              Команда
            </p>
            <p className="mt-2">{itIntro.team}</p>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
            Стек
          </h3>
          <div className="mt-8 space-y-6">
            {itSkills.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">
                  {group.title}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-[var(--hairline)] px-3 py-1.5 text-sm text-ink"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-[var(--hairline)] pt-16">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
            Что сделал
          </h3>
          <p className="mt-3 text-lg font-semibold text-ink">{main.org}</p>
          <ul className="mt-6 space-y-3 text-ink-muted">
            {main.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald"
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        {side.length > 0 && (
          <div className="mt-16 border-t border-[var(--hairline)] pt-12">
            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-ink">
              Дополнительно
            </h3>
            {side.map((item) => (
              <div key={item.title} className="mt-6">
                <p className="font-semibold text-emerald">{item.title}</p>
                <p className="mt-1 text-sm text-ink-faint">{item.org}</p>
                <p className="mt-2 text-ink-muted">{item.summary}</p>
              </div>
            ))}
          </div>
        )}

        <p className="mt-12 text-sm text-ink-faint">
          {itEducation.status} · {itEducation.place}
        </p>

        <div className="mt-8">
          <a
            href={contact.telegram}
            target="_blank"
            rel="noreferrer"
            className="inline-flex cursor-pointer items-center justify-center rounded-md bg-emerald px-5 py-3 text-sm font-semibold text-[#04110c] transition duration-200 hover:bg-mint"
          >
            {contact.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
