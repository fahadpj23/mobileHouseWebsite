// LazyLoad.tsx
import React, { Suspense } from "react";
import useIntersectionObserver from "hooks/useIntersectionObserver";

type LazyLoadProps = {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  threshold?: number;
};

const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  fallback = null,
  threshold = 0.1,
}) => {
  const [ref, hasBeenVisible] = useIntersectionObserver({
    threshold,
    rootMargin: "50px",
  });

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      {hasBeenVisible ? (
        <Suspense fallback={fallback}>{children}</Suspense>
      ) : (
        fallback
      )}
    </div>
  );
};

export default LazyLoad;
