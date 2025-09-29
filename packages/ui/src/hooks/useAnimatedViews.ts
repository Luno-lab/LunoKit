import type React from 'react';
import { useCallback, useRef, useState } from 'react';

interface UseAnimatedViewsProps<T> {
  initialView: T;
  animationDuration?: number;
  animationEasing?: string;
}

interface UseAnimatedViewsReturn<T> {
  currentView: T;
  isAnimating: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  currentViewRef: React.RefObject<HTMLDivElement>;
  handleViewChange: (view: T) => void;
  resetView: () => void;
}

export function useAnimatedViews<T>({
  initialView,
  animationDuration = 200,
  animationEasing = 'ease-out',
}: UseAnimatedViewsProps<T>): UseAnimatedViewsReturn<T> {
  const [currentView, setCurrentView] = useState<T>(initialView);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentViewRef = useRef<HTMLDivElement>(null);

  const handleViewChange = useCallback(
    (view: T) => {
      if (view === currentView || isAnimating) return;

      setIsAnimating(true);

      if (!containerRef.current) {
        setCurrentView(view);
        setIsAnimating(false);
        return;
      }

      const container = containerRef.current;
      const currentHeight = container.offsetHeight;

      setCurrentView(view);

      requestAnimationFrame(() => {
        if (!container || !currentViewRef.current) {
          setIsAnimating(false);
          return;
        }

        const newHeight = currentViewRef.current.offsetHeight;

        container
          .animate([{ height: currentHeight + 'px' }, { height: newHeight + 'px' }], {
            duration: animationDuration,
            easing: animationEasing,
            fill: 'forwards',
          })
          .addEventListener('finish', () => {
            setIsAnimating(false);
          });
      });
    },
    [currentView, isAnimating, animationDuration, animationEasing]
  );

  const resetView = useCallback(() => {
    setCurrentView(initialView);
    setIsAnimating(false);
  }, [initialView]);

  return {
    currentView,
    isAnimating,
    containerRef,
    currentViewRef,
    handleViewChange,
    resetView,
  };
}
