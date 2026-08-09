"use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends Element>(
  options: IntersectionObserverInit = {},
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const { threshold = 0.2, root = null, rootMargin = "0px 0px -8% 0px" } = options;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const isVisible = () => {
      const rect = node.getBoundingClientRect();
      const viewHeight = window.innerHeight || document.documentElement.clientHeight;
      return rect.top < viewHeight * 0.92 && rect.bottom > viewHeight * 0.08;
    };

    if (isVisible()) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, root, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [root, rootMargin, threshold]);

  return { ref, inView };
}
