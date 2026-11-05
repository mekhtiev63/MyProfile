"use client";

import { useCallback, useRef } from "react";
import { eventCards } from "@/data/eventShowcase";

export default function EventCardsDeck() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const card = scroller.querySelector<HTMLElement>(".event-card");
    const gap = 16;
    const step = (card?.offsetWidth ?? 300) + gap;
    scroller.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  return (
    <section className="event-cards" aria-roledescription="карусель" aria-label="Мероприятия">
      <div className="event-cards-header">
        <div>
          <p className="event-cards-kicker" id="event-cards-title">
            Мероприятия
          </p>
          <p className="event-cards-hint">Листайте — свайп или ← →</p>
        </div>
        <div className="event-cards-nav">
          <button
            type="button"
            className="event-cards-nav-btn"
            onClick={() => scrollByCard(-1)}
            aria-label="Предыдущая карточка"
          >
            Назад
          </button>
          <button
            type="button"
            className="event-cards-nav-btn"
            onClick={() => scrollByCard(1)}
            aria-label="Следующая карточка"
          >
            Дальше
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="event-cards-scroll"
        tabIndex={0}
        role="group"
        aria-labelledby="event-cards-title"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollByCard(-1);
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollByCard(1);
          }
        }}
      >
        {eventCards.map((item) => (
          <article key={item.id} className="event-card civic-tile">
            <div className="event-card-photo">
              <img src={item.image} alt={item.alt} width={640} height={400} loading="lazy" />
            </div>
            <div className="event-card-body">
              {item.place && <p className="event-card-place">{item.place}</p>}
              <h3 className="event-card-title">{item.title}</h3>
              <p className="event-card-desc">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
