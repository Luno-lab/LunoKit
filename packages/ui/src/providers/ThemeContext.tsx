import React, {createContext, useState, useContext, ReactNode, useMemo, useCallback, useEffect} from 'react';

const THEME_STORAGE_KEY = 'luno.themeMode';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialThemeMode?: ThemeMode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, initialThemeMode }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const storedMode = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
      if (storedMode && ['light', 'dark'].includes(storedMode)) {
        return storedMode;
      }
    }

    if (initialThemeMode) return initialThemeMode;
    return 'light';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, themeMode);
      // 关键修改：设置 data-theme 属性而不是 class
      document.documentElement.setAttribute('data-theme', themeMode);
    }
  }, [themeMode]);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeModeState(prevMode => prevMode === 'light' ? 'dark' : 'light');
  },[]);

  const contextValue = useMemo(() => ({
    themeMode,
    setThemeMode,
    toggleTheme,
  }), [themeMode, setThemeMode, toggleTheme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useLunoTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useLunoTheme must be used within a ThemeProvider (which is part of LunoKitProvider)');
  }
  return context;
};
