import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback, useEffect } from 'react';
import { lunokitLightTheme, lunokitDarkTheme } from './defaultTheme';
import type { LunokitTheme } from './types';

const THEME_STORAGE_KEY = 'luno.themeMode';

import type { ThemeMode } from './types';

interface ThemeContextValue {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  currentTheme: LunokitTheme;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  theme?: LunokitTheme; // Optional custom theme override
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  theme: customTheme
}) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const storedMode = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
      if (storedMode && ['light', 'dark'].includes(storedMode)) {
        return storedMode;
      }
    }
    return 'light'; // Default light mode
  });

  // Select base theme based on theme mode, then apply custom overrides
  const currentTheme = useMemo(() => {
    const baseTheme = themeMode === 'light' ? lunokitLightTheme : lunokitDarkTheme;
    
    if (customTheme) {
      // Merge custom theme overrides
      return {
        ...baseTheme,
        colors: { ...baseTheme.colors, ...customTheme.colors },
        fonts: { ...baseTheme.fonts, ...customTheme.fonts },
        radii: { ...baseTheme.radii, ...customTheme.radii },
        shadows: { ...baseTheme.shadows, ...customTheme.shadows },
        blurs: { ...baseTheme.blurs, ...customTheme.blurs },
      };
    }
    
    return baseTheme;
  }, [themeMode, customTheme]);

  // Inject CSS variables to DOM
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    
    // Inject color variables - using naming consistent with type definitions
    Object.entries(currentTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // Inject font variables
    Object.entries(currentTheme.fonts).forEach(([key, value]) => {
      root.style.setProperty(`--font-${key}`, value);
    });
    
    // Inject radius variables
    Object.entries(currentTheme.radii).forEach(([key, value]) => {
      root.style.setProperty(`--radius-${key}`, value);
    });
    
    // Inject shadow variables
    Object.entries(currentTheme.shadows).forEach(([key, value]) => {
      root.style.setProperty(`--shadow-${key}`, value);
    });
    
    // Inject blur variables
    Object.entries(currentTheme.blurs).forEach(([key, value]) => {
      root.style.setProperty(`--blur-${key}`, value);
    });
  }, [currentTheme]);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeModeState(prevMode => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem(THEME_STORAGE_KEY, newMode);
      }
      return newMode;
    });
  }, []);

  const contextValue = useMemo(() => ({
    themeMode,
    setThemeMode,
    toggleTheme,
    currentTheme,
  }), [themeMode, setThemeMode, toggleTheme, currentTheme]);

  return React.createElement(ThemeContext.Provider, { value: contextValue }, children);
};

export const useLunoTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useLunoTheme must be used within a ThemeProvider (which is part of LunoKitProvider)');
  }
  return context;
};
