import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  ReactNode,
} from "react";
import { useLocation } from "react-router-dom";

interface ScrollContextType {
  saveScrollPosition: () => void;
  restoreScrollPosition: () => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const ScrollProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const scrollPositions = useRef<Record<string, number>>({});

  const saveScrollPosition = () => {
    scrollPositions.current[location.pathname] = window.scrollY;
  };

  const restoreScrollPosition = () => {
    const savedPosition = scrollPositions.current[location.pathname] || 0;
    window.scrollTo(0, savedPosition);
  };

  // Save scroll position when navigating away
  useEffect(() => {
    return () => saveScrollPosition();
  }, [location]);

  // Restore scroll position when navigating back
  useEffect(() => {
    restoreScrollPosition();
  }, [location]);

  return (
    <ScrollContext.Provider
      value={{ saveScrollPosition, restoreScrollPosition }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export const useScrollContext = (): ScrollContextType => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within a ScrollProvider");
  }
  return context;
};
