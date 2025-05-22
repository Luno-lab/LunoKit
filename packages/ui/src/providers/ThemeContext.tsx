import React, {createContext, useState, useContext, ReactNode, useMemo, useCallback, useEffect} from 'react';

const THEME_STORAGE_KEY = 'luno.themeMode';

export type ThemeMode = 'light' | 'dark';

export interface LunoTheme {
  mode: ThemeMode;
  colors: Record<string, string>;
  typography: Record<string, Record<string, Record<string, string>>>;
  layout: Record<string, string>;
}

// --- Light Theme ---
export const lightTheme: LunoTheme = {
  mode: 'light',
  colors: {
    textPrimary: '#25292E',
    textAccent: '#8A6EAC',
    textSecondary: 'rgba(60, 66, 66, 0.6)',
    modalBackground: 'white',
    connectorItemBackground: '#F0F0F0',
  },
  typography: {
    default: { fontSize: '16px', lineHeight: '20px' },
    title: { fontSize: '18px', lineHeight: '24px' },
    secondary: { fontSize: '14px', lineHeight: '18px' },
    accent: { fontSize: '12px', lineHeight: '18px' },
  },
  layout: {
    modalShadow: '0px 10px 20px 0px rgba(0,0,0,0.1)',
    modalBorderRadius: '6px',
    connectorItemBorderRadius: '4px',
  }
} as LunoTheme as const;

// --- Dark Theme ---
export const darkTheme = {
  mode: 'dark',
  colors: {
    textPrimary: '#FFFFFF',
    textAccent: '#8A6EAC',
    textSecondary: 'rgba(255,255,255,0.5)',
    modalBackground: '#3A3B43',
    connectorItemBackground: '#4A4B51',
  },
  typography: {
    default: { fontSize: '16px', lineHeight: '20px' },
    title: { fontSize: '18px', lineHeight: '24px' },
    secondary: { fontSize: '14px', lineHeight: '18px' },
    accent: { fontSize: '12px', lineHeight: '18px' },
  },
  layout: {
    modalShadow: '0px 10px 20px 0px rgba(0,0,0,0.1)',
    modalBorderRadius: '6px',
    connectorItemBorderRadius: '4px',
  }
} as LunoTheme as const;

interface ThemeContextValue {
  themeMode: ThemeMode;
  theme: LunoTheme;
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
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(themeMode);
    }
  }, [themeMode]);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeModeState(prevMode => prevMode === 'light' ? 'dark' : 'light');
  },[]);

  const currentTheme = useMemo(() => {
    return themeMode === 'dark' ? darkTheme : lightTheme;
  }, [themeMode]);

  const contextValue = useMemo(() => ({
    themeMode,
    theme: currentTheme,
    setThemeMode,
    toggleTheme,
  }), [themeMode, currentTheme, setThemeMode, toggleTheme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useLunoTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useLunoTheme must be used within a ThemeProvider (which is part of LunoKitProvider)');
  }
  return context;
};
