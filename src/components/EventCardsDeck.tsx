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
    <div className="event-cards" aria-label="Мероприятия">
      <div className="event-cards-header">
        <div>
          <p className="event-cards-kicker">Мероприятия</p>
          <p className="event-cards-hint">Листайте карточки — свайп или стрелки</p>
        </div>
        <div className="event-cards-nav">
          <button
            type="button"
            className="event-cards-nav-btn"
            onClick={() => scrollByCard(-1)}
            aria-label="Предыдущая карточка"
          >
            ‹
          </button>
          <button
            type="button"
            className="event-cards-nav-btn"
            onClick={() => scrollByCard(1)}
            aria-label="Следующая карточка"
          >
            ›
          </button>
        </div>
      </div>

      <div ref={scrollerRef} className="event-cards-scroll" tabIndex={0}>
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
    </div>
  );
}
