import { useState, useEffect, useRef } from "react";

export function useInView(options = {}) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const threshold = options.threshold !== undefined ? options.threshold : 0.12;
    const rootMargin = options.rootMargin || "0px 0px -60px 0px";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (options.triggerOnce !== false) {
            observer.unobserve(element);
          }
        } else if (options.triggerOnce === false) {
          setInView(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [options.threshold, options.triggerOnce, options.rootMargin]);

  return [ref, inView];
}
