import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback, useEffect } from 'react';
import { lunokitLightTheme, lunokitDarkTheme } from './defaultTheme';
import type { LunokitTheme, LunokitThemeOverrides, PartialLunokitTheme } from './types';

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
  theme?: LunokitTheme | LunokitThemeOverrides; // Support both old and new theme formats
}

// Helper function to merge partial theme with base theme
const mergePartialTheme = (baseTheme: LunokitTheme, partialTheme: PartialLunokitTheme): LunokitTheme => {
  return {
    ...baseTheme,
    colors: { ...baseTheme.colors, ...(partialTheme.colors || {}) },
    fonts: { ...baseTheme.fonts, ...(partialTheme.fonts || {}) },
    radii: { ...baseTheme.radii, ...(partialTheme.radii || {}) },
    shadows: { ...baseTheme.shadows, ...(partialTheme.shadows || {}) },
    blurs: { ...baseTheme.blurs, ...(partialTheme.blurs || {}) },
  };
};

// Helper function to check if theme is complete or partial
const isCompleteTheme = (theme: LunokitTheme | LunokitThemeOverrides): theme is LunokitTheme => {
  return 'colors' in theme && 'fonts' in theme && 'radii' in theme && 'shadows' in theme && 'blurs' in theme;
};

// Helper function to get modified variables
const getModifiedVariables = (
  baseTheme: LunokitTheme, 
  currentTheme: LunokitTheme
): Record<string, string> => {
  const modified: Record<string, string> = {};
  
  // Compare colors
  Object.entries(currentTheme.colors).forEach(([key, value]) => {
    if (baseTheme.colors[key as keyof typeof baseTheme.colors] !== value) {
      modified[`color-${key}`] = value;
    }
  });
  
  // Compare fonts
  Object.entries(currentTheme.fonts).forEach(([key, value]) => {
    if (baseTheme.fonts[key as keyof typeof baseTheme.fonts] !== value) {
      modified[`font-${key}`] = value;
    }
  });
  
  // Compare radii
  Object.entries(currentTheme.radii).forEach(([key, value]) => {
    if (baseTheme.radii[key as keyof typeof baseTheme.radii] !== value) {
      modified[`radius-${key}`] = value;
    }
  });
  
  // Compare shadows
  Object.entries(currentTheme.shadows).forEach(([key, value]) => {
    if (baseTheme.shadows[key as keyof typeof baseTheme.shadows] !== value) {
      modified[`shadow-${key}`] = value;
    }
  });
  
  // Compare blurs
  Object.entries(currentTheme.blurs).forEach(([key, value]) => {
    if (baseTheme.blurs[key as keyof typeof baseTheme.blurs] !== value) {
      modified[`blur-${key}`] = value;
    }
  });
  
  return modified;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  theme: themeOverrides
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

  // Build current theme based on theme mode and overrides
  const currentTheme = useMemo(() => {
    const baseTheme = themeMode === 'light' ? lunokitLightTheme : lunokitDarkTheme;
    
    if (!themeOverrides) {
      return baseTheme;
    }

    // Handle complete custom theme (old format)
    if (isCompleteTheme(themeOverrides)) {
      return themeOverrides;
    }

    // Handle new theme overrides format
    const overrides = themeOverrides as LunokitThemeOverrides;
    
    let finalTheme = baseTheme;

    // Apply mode-specific overrides
    if (themeMode === 'light' && overrides.light) {
      finalTheme = mergePartialTheme(finalTheme, overrides.light);
    } else if (themeMode === 'dark' && overrides.dark) {
      finalTheme = mergePartialTheme(finalTheme, overrides.dark);
    }

    // Apply complete theme override (highest priority)
    if (overrides.theme) {
      finalTheme = overrides.theme;
    }

    return finalTheme;
  }, [themeMode, themeOverrides]);

  // Check if we have any custom overrides
  const hasCustomOverrides = useMemo(() => {
    if (!themeOverrides) return false;
    
    if (isCompleteTheme(themeOverrides)) {
      return true;
    }

    const overrides = themeOverrides as LunokitThemeOverrides;
    // 只检查当前主题模式的覆盖
    if (themeMode === 'light' && overrides.light) {
      return true;
    }
    if (themeMode === 'dark' && overrides.dark) {
      return true;
    }
    if (overrides.theme) {
      return true;
    }
    return false;
  }, [themeOverrides, themeMode]);

  // Get base theme for comparison
  const baseTheme = useMemo(() => {
    return themeMode === 'light' ? lunokitLightTheme : lunokitDarkTheme;
  }, [themeMode]);

  // Get modified variables
  const modifiedVariables = useMemo(() => {
    if (!hasCustomOverrides) return {};
    return getModifiedVariables(baseTheme, currentTheme);
  }, [baseTheme, currentTheme, hasCustomOverrides]);

  // Inject CSS variables to DOM
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    
    if (hasCustomOverrides) {
      // For custom themes/overrides, use smart injection
      if (isCompleteTheme(themeOverrides!)) {
        // Complete theme override: inject all variables and remove data-theme
        Object.entries(currentTheme.colors).forEach(([key, value]) => {
          root.style.setProperty(`--color-${key}`, value);
        });
        
        Object.entries(currentTheme.fonts).forEach(([key, value]) => {
          root.style.setProperty(`--font-${key}`, value);
        });
        
        Object.entries(currentTheme.radii).forEach(([key, value]) => {
          root.style.setProperty(`--radius-${key}`, value);
        });
        
        Object.entries(currentTheme.shadows).forEach(([key, value]) => {
          root.style.setProperty(`--shadow-${key}`, value);
        });
        
        Object.entries(currentTheme.blurs).forEach(([key, value]) => {
          root.style.setProperty(`--blur-${key}`, value);
        });
        
        // Remove data-theme attribute for complete custom themes
        root.removeAttribute('data-theme');
      } else {
        // Partial theme override: keep data-theme and only inject modified variables
        root.setAttribute('data-theme', themeMode);
        
        // Only inject the modified variables
        Object.entries(modifiedVariables).forEach(([key, value]) => {
          root.style.setProperty(`--${key}`, value);
        });
      }
    } else {
      // For default themes, just set the data-theme attribute
      root.setAttribute('data-theme', themeMode);
      
      // Clear any previously injected custom variables
      const allVars = [
        ...Object.keys(lunokitLightTheme.colors).map(key => `--color-${key}`),
        ...Object.keys(lunokitLightTheme.fonts).map(key => `--font-${key}`),
        ...Object.keys(lunokitLightTheme.radii).map(key => `--radius-${key}`),
        ...Object.keys(lunokitLightTheme.shadows).map(key => `--shadow-${key}`),
        ...Object.keys(lunokitLightTheme.blurs).map(key => `--blur-${key}`)
      ];
      
      allVars.forEach(varName => {
        root.style.removeProperty(varName);
      });
    }
  }, [currentTheme, hasCustomOverrides, themeMode, modifiedVariables, themeOverrides]);

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
