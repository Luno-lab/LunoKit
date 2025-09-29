import { useRef } from 'react';

export const useIsInitialized = () => {
  const isInitialized = useRef(false);
  return {
    isInitialized: isInitialized.current,
    markAsInitialized: () => {
      isInitialized.current = true;
    },
  };
};
