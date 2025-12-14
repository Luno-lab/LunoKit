import type { Optional } from '@luno-kit/react/types';
import type React from 'react';
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useCSSVariableInjection } from '../hooks/useCSSVariableInjection';
import type { LunokitTheme, LunokitThemeOverrides, PartialLunokitTheme, ThemeMode } from './types';

// Theme preference storage
interface ThemePreference {
  isAuto: boolean;
  preferredTheme?: Optional<ThemeMode>;
}

const THEME_STORAGE_KEY = 'luno.lastThemePreference';

const saveThemePreference = (preference: ThemePreference) => {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(preference));
  } catch (e) {}
};

interface ThemeContextValue {
  themeMode: ThemeMode;
  setThemeChoice: (choice: 'light' | 'dark' | 'auto') => void; // User explicit choice
  currentTheme: LunokitTheme | null; // null for default themes
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  theme?: Optional<PartialLunokitTheme | LunokitThemeOverrides>;
}

// Helper function to check if theme is complete or partial
const isCompleteTheme = (
  theme: PartialLunokitTheme | LunokitThemeOverrides
): theme is LunokitTheme => {
  return (
    'colors' in theme &&
    'fonts' in theme &&
    'radii' in theme &&
    'shadows' in theme &&
    'blurs' in theme
  );
};

// Hook to detect system theme
const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

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

  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        if (saved) {
          const preference = JSON.parse(saved);
          if (preference?.isAuto) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          } else if (preference?.preferredTheme) {
            return preference.preferredTheme;
          }
        }
      } catch (_e) {
        // Ignore parsing errors
      }
    }

    if (!themeOverrides || isCompleteTheme(themeOverrides)) {
      return 'light';
    }

    const overrides = themeOverrides as LunokitThemeOverrides;
    return overrides.defaultMode || 'light';
  });

  const [isAutoMode, setIsAutoMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        if (saved) {
          const preference = JSON.parse(saved);
          return preference?.isAuto ?? false;
        }
      } catch (_e) {
        // Ignore parsing errors
      }
    }

    if (!themeOverrides || isCompleteTheme(themeOverrides)) {
      return false;
    }

    const overrides = themeOverrides as LunokitThemeOverrides;
    return overrides.autoMode ?? false;
  });

  // Determine theme type and get relevant data
  const themeInfo = useMemo(() => {
    if (!themeOverrides) {
      return { type: 'default' as const, completeTheme: null, partialOverrides: null };
    }

    // Handle complete custom theme
    if (isCompleteTheme(themeOverrides)) {
      return { type: 'complete' as const, completeTheme: themeOverrides, partialOverrides: null };
    }

    // Handle theme overrides format
    const overrides = themeOverrides as LunokitThemeOverrides;

    // Apply complete theme override (highest priority)
    if (overrides.theme) {
      return { type: 'complete' as const, completeTheme: overrides.theme, partialOverrides: null };
    }

    // For partial overrides, get the current mode's overrides
    let partialOverrides: PartialLunokitTheme | null = null;
    if (themeMode === 'light' && overrides.light) {
      partialOverrides = overrides.light;
    } else if (themeMode === 'dark' && overrides.dark) {
      partialOverrides = overrides.dark;
    } else {
      partialOverrides = { ...(overrides as PartialLunokitTheme) };
    }

    return { type: 'partial' as const, completeTheme: null, partialOverrides };
  }, [themeMode, themeOverrides]);

  // Build current theme for context (only for complete themes)
  const currentTheme = useMemo(() => {
    return themeInfo.type === 'complete' ? themeInfo.completeTheme : null;
  }, [themeInfo]);

  // Inject CSS variables to DOM
  useCSSVariableInjection(themeInfo, themeMode);

  // User explicit choice handler (saves to storage)
  const setThemeChoice = useCallback(
    (choice: 'light' | 'dark' | 'auto') => {
      const isAuto = choice === 'auto';
      setIsAutoMode(isAuto);

      if (isAuto) {
        setThemeMode(systemTheme || 'light');
      } else {
        setThemeMode(choice);
      }

      const preference: ThemePreference = {
        isAuto,
        ...(isAuto ? {} : { preferredTheme: choice }),
      };

      saveThemePreference(preference);
    },
    [systemTheme]
  );

  // Only listen to system theme changes for auto mode
  useEffect(() => {
    if (isAutoMode) {
      setThemeMode(systemTheme || 'light');
    }
  }, [systemTheme, isAutoMode]);

  const contextValue = useMemo(
    () => ({
      themeMode,
      setThemeChoice,
      currentTheme,
    }),
    [themeMode, setThemeChoice, currentTheme]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useLunoTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      'useLunoTheme must be used within a ThemeProvider (which is part of LunoKitProvider)'
    );
  }
  return context;
};
