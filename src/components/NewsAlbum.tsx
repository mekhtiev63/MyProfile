"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { createPortal } from "react-dom";

type NewsAlbumProps = {
  images: string[];
  alt: string;
  className?: string;
};

export default function NewsAlbum({ images, alt, className = "" }: NewsAlbumProps) {
  const labelId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const count = images.length;
  const open = openIndex !== null;

  const close = useCallback(() => {
    setOpenIndex(null);
    window.requestAnimationFrame(() => {
      triggerRef.current?.focus();
      triggerRef.current = null;
    });
  }, []);

  const show = useCallback((index: number, trigger?: HTMLElement | null) => {
    if (trigger) triggerRef.current = trigger;
    setOpenIndex(index);
  }, []);

  const prev = useCallback(() => {
    setOpenIndex((i) => (i === null || count < 2 ? i : (i - 1 + count) % count));
  }, [count]);

  const next = useCallback(() => {
    setOpenIndex((i) => (i === null || count < 2 ? i : (i + 1) % count));
  }, [count]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, prev, next]);

  if (!count) return null;

  const labelFor = (index: number) =>
    count === 1 ? alt : `${alt} — фото ${index + 1} из ${count}`;

  const onThumbKey = (e: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      show(index, e.currentTarget);
    }
  };

  const lightbox =
    mounted &&
    open &&
    openIndex !== null &&
    createPortal(
      <div
        ref={dialogRef}
        className="news-lightbox"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        onClick={close}
      >
        <p id={labelId} className="visually-hidden">
          {labelFor(openIndex)}
        </p>

        <button
          ref={closeRef}
          type="button"
          className="news-lightbox-close"
          aria-label="Закрыть"
          onClick={close}
        >
          ×
        </button>

        {count > 1 && (
          <>
            <button
              type="button"
              className="news-lightbox-nav news-lightbox-prev"
              aria-label="Предыдущее фото"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              ‹
            </button>
            <button
              type="button"
              className="news-lightbox-nav news-lightbox-next"
              aria-label="Следующее фото"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              ›
            </button>
          </>
        )}

        <figure className="news-lightbox-figure" onClick={(e) => e.stopPropagation()}>
          <img
            src={images[openIndex]}
            alt={labelFor(openIndex)}
            className="news-lightbox-image"
            decoding="async"
          />
          {count > 1 && (
            <figcaption className="news-lightbox-caption" aria-hidden>
              {openIndex + 1} / {count}
            </figcaption>
          )}
        </figure>
      </div>,
      document.body,
    );

  return (
    <>
      <ul className={`news-album ${className}`.trim()} aria-label="Фотоальбом">
        {images.map((src, index) => (
          <li key={`${src}-${index}`}>
            <button
              type="button"
              className="news-album-thumb"
              aria-label={`Открыть фото ${index + 1} из ${count}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                show(index, e.currentTarget);
              }}
              onKeyDown={(e) => onThumbKey(e, index)}
            >
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className="news-album-image"
              />
            </button>
          </li>
        ))}
      </ul>
      {mounted ? lightbox : null}
    </>
  );
}
