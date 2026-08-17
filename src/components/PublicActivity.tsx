import ExperienceTimeline from "@/components/ExperienceTimeline";
import SectionIndex from "@/components/SectionIndex";
import {
  competencies,
  recognitions,
  type RecognitionItem,
  type RecognitionKind,
} from "@/data/publicActivity";

const kindLabel: Record<RecognitionKind, string> = {
  "благодарственное письмо": "Благодарственное письмо",
};

function FeaturedRecognition({ item }: { item: RecognitionItem }) {
  return (
    <article className="recognition-featured civic-tile">
      {item.image && (
        <div className="recognition-featured-media">
          <img src={item.image} alt={item.imageAlt ?? item.from} width={960} height={640} />
        </div>
      )}
      <div className="recognition-featured-body">
        <p className="recognition-featured-badge">{kindLabel[item.kind]}</p>
        <h3 className="recognition-featured-from">{item.from}</h3>
        <p className="recognition-featured-for">{item.for}</p>
        <p className="recognition-featured-date">{item.date}</p>
      </div>
    </article>
  );
}

export default function PublicActivity() {
  const featured = recognitions.find((item) => item.featured) ?? recognitions[0];
  const rest = recognitions.filter((item) => item !== featured);

  return (
    <section
      id="public"
      className="public-civic relative border-t border-[var(--hairline)] px-6 py-20 md:px-10 md:py-28"
    >
      <SectionIndex n="03" />
      <div className="civic-panel mx-auto max-w-6xl">
        <header className="grid gap-6 border-b border-[var(--hairline)] pb-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-end md:gap-16">
          <div>
            <span className="civic-kicker-bar" aria-hidden />
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
              Общественная деятельность
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(1.85rem,4vw,2.85rem)] font-semibold leading-[1.15] tracking-[-0.03em] text-ink">
              От студенческого клуба до городской повестки
            </h2>
          </div>
          <p className="max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
            Руковожу командами, провожу мероприятия, работаю с жителями и
            выстраиваю устойчивые молодёжные проекты.
          </p>
        </header>

        <ExperienceTimeline />

        <div className="mt-16 border-t border-[var(--hairline)] pt-16 md:mt-20 md:pt-20">
          <span className="civic-kicker-bar" aria-hidden />
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
            Благодарственные письма
          </h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">
            Официальные письма за работу с молодёжным парламентаризмом и развитие
            студенческих инициатив в Москве.
          </p>

          <FeaturedRecognition item={featured} />

          <ul className="mt-10">
            {rest.map((item) => (
              <li
                key={`${item.kind}-${item.from}-${item.date}`}
                className="grid gap-2 border-t border-[var(--hairline)] py-8 md:grid-cols-[160px_1fr] md:gap-12"
              >
                <p className="text-base text-ink-faint">{item.date}</p>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                    {kindLabel[item.kind]}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-ink">{item.from}</p>
                  <p className="mt-2 text-base leading-relaxed text-ink-muted">
                    {item.for}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 border-t border-[var(--hairline)] pt-16 md:pt-20">
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-[-0.02em] text-ink md:text-2xl">
            Компетенции
          </h3>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {competencies.map((group) => (
              <div key={group.title} className="civic-tile px-4 py-5">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-primary)]">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-2 text-base text-ink-muted">
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
