import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

export const useIntersectionObserver = <T extends HTMLElement>({
  root = null,
  rootMargin = "0px",
  threshold = 0,
}: UseIntersectionObserverOptions): [boolean, React.RefObject<T>] => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!isIntersecting) {
      console.log("FDsfsafd");
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsIntersecting(entry.isIntersecting);
        },
        { root, rootMargin, threshold }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      };
    }
  }, [root, rootMargin, threshold]);

  return [isIntersecting, ref];
};
