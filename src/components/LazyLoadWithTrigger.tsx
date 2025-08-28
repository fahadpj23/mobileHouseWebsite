import LazyLoad from "components/ScrollLoad";
import { useEffect, useRef, useState } from "react";
const LazyLoadWithTrigger = ({ children, onVisible, ...props }:any) => {
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenVisible) {
          setHasBeenVisible(true);
          onVisible && onVisible();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [onVisible, hasBeenVisible]);

  return (
    <div ref={ref}>
      <LazyLoad {...props}>
        {children}
      </LazyLoad>
    </div>
  );
};
export default LazyLoadWithTrigger