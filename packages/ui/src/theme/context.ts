import React, { createContext, useState, useContext, ReactNode, useMemo, useCallback, useEffect } from 'react';
import type { LunokitTheme, LunokitThemeOverrides, PartialLunokitTheme, ThemeMode } from './types';

// All theme variable names for cleanup
const ALL_THEME_VARS = [
  '--color-accentColor', '--color-walletSelectItemBackground', '--color-walletSelectItemBackgroundHover', '--color-walletSelectItemText',
  '--color-connectButtonBackground', '--color-connectButtonInnerBackground', '--color-connectButtonText',
  '--color-accountActionItemBackground', '--color-accountActionItemBackgroundHover', '--color-accountActionItemText',
  '--color-accountSelectItemBackground', '--color-accountSelectItemBackgroundHover', '--color-accountSelectItemText',
  '--color-currentNetworkButtonBackground', '--color-currentNetworkButtonText',
  '--color-networkSelectItemBackground', '--color-networkSelectItemBackgroundHover', '--color-networkSelectItemText',
  '--color-navigationButtonBackground', '--color-separatorLine',
  '--color-modalBackground', '--color-modalBackdrop', '--color-modalBorder', '--color-modalText', '--color-modalTextSecondary',
  '--color-modalControlButtonBackgroundHover', '--color-modalControlButtonText',
  '--color-success', '--color-successForeground', '--color-warning', '--color-warningForeground',
  '--color-error', '--color-errorForeground', '--color-info', '--color-infoForeground', '--color-skeleton',
  '--font-body', '--font-heading', '--font-mono',
  '--radius-walletSelectItem', '--radius-connectButton', '--radius-modalControlButton', '--radius-accountActionItem',
  '--radius-accountSelectItem', '--radius-currentNetworkButton', '--radius-networkSelectItem', '--radius-modal',
  '--shadow-button', '--shadow-modal',
  '--blur-modalOverlay',
];

interface ThemeContextValue {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  currentTheme: LunokitTheme | null; // null for default themes
  isAutoMode: boolean; 
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  theme?: LunokitTheme | LunokitThemeOverrides;
}

// Helper function to check if theme is complete or partial
const isCompleteTheme = (theme: LunokitTheme | LunokitThemeOverrides): theme is LunokitTheme => {
  return 'colors' in theme && 'fonts' in theme && 'radii' in theme && 'shadows' in theme && 'blurs' in theme;
};

// Hook to detect system theme
const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    updateTheme(mediaQuery);
    mediaQuery.addEventListener('change', updateTheme);
    
    return () => mediaQuery.removeEventListener('change', updateTheme);
  }, []);

  return systemTheme;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  theme: themeOverrides,
}) => {
  const systemTheme = useSystemTheme();
  
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    // If only dark theme is provided, default to dark
    if (themeOverrides && !isCompleteTheme(themeOverrides)) {
      const overrides = themeOverrides as LunokitThemeOverrides;
      if (overrides.dark && !overrides.light) {
        return 'dark';
      }
    }
    return 'light';
  });

  // Check if both light and dark are provided
  const hasBothLightAndDark = useMemo(() => {
    if (!themeOverrides || isCompleteTheme(themeOverrides)) {
      return false; // Complete themes don't support auto-switching
    }
    
    const overrides = themeOverrides as LunokitThemeOverrides;
    return !!(overrides.light && overrides.dark);
  }, [themeOverrides]);

  // Auto-follow system theme if both light and dark are provided
  useEffect(() => {
    if (hasBothLightAndDark) {
      setThemeModeState(systemTheme);
    }
  }, [systemTheme, hasBothLightAndDark]);

  // Determine theme type and get relevant data
  const themeInfo = useMemo(() => {
    if (!themeOverrides) {
      return { type: 'default', completeTheme: null, partialOverrides: null };
    }

    // Handle complete custom theme
    if (isCompleteTheme(themeOverrides)) {
      return { type: 'complete', completeTheme: themeOverrides, partialOverrides: null };
    }

    // Handle theme overrides format
    const overrides = themeOverrides as LunokitThemeOverrides;
    
    // Apply complete theme override (highest priority)
    if (overrides.theme) {
      return { type: 'complete', completeTheme: overrides.theme, partialOverrides: null };
    }

    // For partial overrides, get the current mode's overrides
    let partialOverrides: PartialLunokitTheme | null = null;
    if (themeMode === 'light' && overrides.light) {
      partialOverrides = overrides.light;
    } else if (themeMode === 'dark' && overrides.dark) {
      partialOverrides = overrides.dark;
    }

    return { type: 'partial', completeTheme: null, partialOverrides };
  }, [themeMode, themeOverrides]);

  // Build current theme for context (only for complete themes)
  const currentTheme = useMemo(() => {
    return themeInfo.type === 'complete' ? themeInfo.completeTheme : null;
  }, [themeInfo]);

  // Inject CSS variables to DOM
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    
    if (themeInfo.type === 'complete' && themeInfo.completeTheme) {
      // Complete custom theme: inject all variables and remove data-theme
      Object.entries(themeInfo.completeTheme.colors).forEach(([key, value]) => {
        if (value) {
          root.style.setProperty(`--color-${key}`, value);
        }
      });
      
      Object.entries(themeInfo.completeTheme.fonts).forEach(([key, value]) => {
        if (value) {
          root.style.setProperty(`--font-${key}`, value);
        }
      });
      
      Object.entries(themeInfo.completeTheme.radii).forEach(([key, value]) => {
        if (value) {
          root.style.setProperty(`--radius-${key}`, value);
        }
      });
      
      Object.entries(themeInfo.completeTheme.shadows).forEach(([key, value]) => {
        if (value) {
          root.style.setProperty(`--shadow-${key}`, value);
        }
      });
      
      Object.entries(themeInfo.completeTheme.blurs).forEach(([key, value]) => {
        if (value) {
          root.style.setProperty(`--blur-${key}`, value);
        }
      });
      
      // Remove data-theme attribute for complete custom themes
      root.removeAttribute('data-theme');
      
    } else if (themeInfo.type === 'partial' && themeInfo.partialOverrides) {
      // Partial override: KEEP data-theme and inject only overridden variables
      root.setAttribute('data-theme', themeMode);
      
      // Only clear and inject if there are actual overrides
      const hasOverrides = Object.keys(themeInfo.partialOverrides).length > 0;
      if (hasOverrides) {
        // Clear all custom variables first
        ALL_THEME_VARS.forEach(varName => {
          root.style.removeProperty(varName);
        });
        
        // Inject only the overridden variables
        if (themeInfo.partialOverrides.colors) {
          Object.entries(themeInfo.partialOverrides.colors).forEach(([key, value]) => {
            if (value) {
              root.style.setProperty(`--color-${key}`, value);
            }
          });
        }
        
        if (themeInfo.partialOverrides.fonts) {
          Object.entries(themeInfo.partialOverrides.fonts).forEach(([key, value]) => {
            if (value) {
              root.style.setProperty(`--font-${key}`, value);
            }
          });
        }
        
        if (themeInfo.partialOverrides.radii) {
          Object.entries(themeInfo.partialOverrides.radii).forEach(([key, value]) => {
            if (value) {
              root.style.setProperty(`--radius-${key}`, value);
            }
          });
        }
        
        if (themeInfo.partialOverrides.shadows) {
          Object.entries(themeInfo.partialOverrides.shadows).forEach(([key, value]) => {
            if (value) {
              root.style.setProperty(`--shadow-${key}`, value);
            }
          });
        }
        
        if (themeInfo.partialOverrides.blurs) {
          Object.entries(themeInfo.partialOverrides.blurs).forEach(([key, value]) => {
            if (value) {
              root.style.setProperty(`--blur-${key}`, value);
            }
          });
        }
      }
      
    } else {
      // Default theme: just set data-theme and clear custom variables
      root.setAttribute('data-theme', themeMode);
      
      // Clear any previously injected custom variables
      ALL_THEME_VARS.forEach(varName => {
        root.style.removeProperty(varName);
      });
    }
  }, [themeInfo, themeMode]);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
  }, []);

  const contextValue = useMemo(() => ({
    themeMode,
    setThemeMode,
    currentTheme,
    isAutoMode: hasBothLightAndDark,
  }), [themeMode, setThemeMode, currentTheme, hasBothLightAndDark]);

  return React.createElement(ThemeContext.Provider, { value: contextValue }, children);
};

export const useLunoTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useLunoTheme must be used within a ThemeProvider (which is part of LunoKitProvider)');
  }
  return context;
};
