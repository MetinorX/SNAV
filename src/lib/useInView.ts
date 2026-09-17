import React, { useEffect, useRef, useState } from "react";

interface UseInViewOptions extends IntersectionObserverInit {
  once?: boolean;
}

export const useInView = <T extends HTMLElement>(options: UseInViewOptions = {}) => {
  const { once = true, threshold = 0.15, root, rootMargin = "0px 0px -60px 0px" } = options;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, root, rootMargin }
    );
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ref, inView };
};

export const useParallax = <T extends HTMLElement>(factor = 0.3) => {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          return;
        }
        setOffset(-rect.top * factor);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, [factor]);

  return { ref, offset };
};

export const useScrollProgress = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        if (total <= 0) {
          setProgress(1);
          return;
        }
        const traveled = Math.min(Math.max(-rect.top, 0), total);
        setProgress(traveled / total);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, progress };
};

/**
 * Drives per-item translateY parallax offsets for the itinerary timeline.
 *
 * Each item's offset is computed as:
 *   offset = (itemCentreY - viewportCentreY) * factor
 *
 * Left-column cards use a positive factor (translate down when above centre)
 * and right-column cards use a negative factor (translate up) — creating a
 * split-parallax depth effect.
 *
 * Returns all zeros when `prefers-reduced-motion: reduce` is set.
 */
export const useTimelineParallax = (
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>,
  count: number,
  factor = 0.06
) => {
  const [offsets, setOffsets] = useState<number[]>(() => Array(count).fill(0));

  useEffect(() => {
    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const viewCentre = window.innerHeight / 2;
        const next = refs.current.map((node, i) => {
          if (!node) return 0;
          const rect = node.getBoundingClientRect();
          const itemCentre = rect.top + rect.height / 2;
          // Alternate sign: even indices (left column) +, odd indices (right column) -
          const sign = i % 2 === 0 ? 1 : -1;
          return (itemCentre - viewCentre) * factor * sign;
        });
        setOffsets(next);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, factor]);

  return offsets;
};