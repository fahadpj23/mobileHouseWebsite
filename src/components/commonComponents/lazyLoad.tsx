import React, { ReactNode } from "react";
import { useIntersectionObserver } from "hooks/useIntersectionObserver";

interface LazyLoadProps {
  children: ReactNode;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
}

const LazyLoad: React.FC<LazyLoadProps> = ({
  children,
  root = null,
  rootMargin = "0px",
  threshold = 0,
}) => {
  const [isIntersecting, ref] = useIntersectionObserver<HTMLDivElement>({
    root,
    rootMargin,
    threshold,
  });
  console.log(isIntersecting);
  return <div ref={ref}>{isIntersecting ? children : null}</div>;
};

export default LazyLoad;
