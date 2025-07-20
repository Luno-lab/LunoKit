import type { LunokitTheme, LunokitThemeConfig } from './types';

// Light theme preset
export const lunokitLightTheme: LunokitTheme = {
  colors: {
    // Primary colors
    accentColor: '#3385FF',
    
    // Button related
    walletSelectItemBackground: 'rgba(0,0,0,0.035)',
    walletSelectItemBackgroundHover: 'rgba(0,0,0,0.08)',
    walletSelectItemText: '#211F26',

    connectButtonBackground: '#F1EFF3',
    connectButtonInnerBackground: 'rgba(0,0,0,0.06)',
    connectButtonText: '#211F26',

    accountActionItemBackground: 'rgba(0,0,0,0.035)',
    accountActionItemBackgroundHover: 'rgba(0,0,0,0.08)',
    accountActionItemText: '#211F26',

    accountSelectItemBackground: 'rgba(0,0,0,0.035)',
    accountSelectItemBackgroundHover: 'rgba(0,0,0,0.08)',
    accountSelectItemText: '#211F26',

    currentNetworkButtonBackground: '#FFFFFF',
    currentNetworkButtonText: '#211F26',

    networkSelectItemBackground: 'rgba(0,0,0,0.035)',
    networkSelectItemBackgroundHover: 'rgba(0,0,0,0.08)',
    networkSelectItemText: '#211F26',

    navigationButtonBackground: 'rgba(0,0,0,0.15)',

    separatorLine: 'rgba(0, 0, 0, 0.035)',
    
    // Modal related
    modalBackground: '#ffffff',
    modalBackdrop: 'rgba(0, 0, 0, 0.3)',
    modalBorder: 'transparent',
    modalText: '#25292E',
    modalTextSecondary: 'rgba(60, 66, 66, 0.6)',
    modalControlButtonBackgroundHover: 'rgba(0,0,0,0.08)',
    modalControlButtonText: '#6B7280',
    
    // Status colors
    success: '#10b981',
    successForeground: '#ffffff',
    warning: '#f59e0b',
    warningForeground: '#ffffff',
    error: '#ef4444',
    errorForeground: '#ffffff',
    info: '#3b82f6',
    infoForeground: '#ffffff',

    // Skeleton screen
    skeleton: 'rgba(0,0,0,0.08)',
  },
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    heading: 'ui-rounded, "SF Pro Rounded", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  radii: {
    walletSelectItem: '6px',
    connectButton: '6px',
    modalControlButton: '6px',
    accountActionItem: '6px',
    accountSelectItem: '6px',
    currentNetworkButton: '6px',
    networkSelectItem: '6px',
    modal: '12px',
  },
  shadows: {
    button: '0px 10px 20px 0px rgba(0,0,0,0.1)',
    modal: '0px 20px 25px -5px rgba(0,0,0,0.1)',
  },
  blurs: {
    modalOverlay: 'blur(8px)',
  },
};

// Dark theme preset
export const lunokitDarkTheme: LunokitTheme = {
  colors: {
    // Primary colors
    accentColor: '#8A6EAC',
    
    // Button related
    walletSelectItemBackground: 'rgba(255,255,255,0.035)',
    walletSelectItemBackgroundHover: 'rgba(255,255,255,0.09)',
    walletSelectItemText: '#FFFFFF',

    connectButtonBackground: '#4A4B51',
    connectButtonInnerBackground: '#3A3B43',
    connectButtonText: '#FFFFFF',

    accountActionItemBackground: 'rgba(255,255,255,0.035)',
    accountActionItemBackgroundHover: 'rgba(255,255,255,0.09)',
    accountActionItemText: '#FFFFFF',

    accountSelectItemBackground: 'rgba(255,255,255,0.035)',
    accountSelectItemBackgroundHover: 'rgba(255,255,255,0.09)',
    accountSelectItemText: '#FFFFFF',

    currentNetworkButtonBackground: '#4A4B51',
    currentNetworkButtonText: '#FFFFFF',

    networkSelectItemBackground: 'rgba(255,255,255,0.035)',
    networkSelectItemBackgroundHover: 'rgba(255,255,255,0.09)',
    networkSelectItemText: '#FFFFFF',

    navigationButtonBackground: 'rgba(255,255,255,0.15)',

    separatorLine: 'rgba(74,75,88,0.75)',
    
    // Modal related
    modalBackground: '#3A3B43',
    modalBackdrop: 'rgba(0, 0, 0, 0.5)',
    modalBorder: '#374151',
    modalText: '#FFFFFF',
    modalTextSecondary: 'rgba(255,255,255,0.5)',
    modalControlButtonBackgroundHover: 'rgba(255,255,255,0.09)',
    modalControlButtonText: '#9CA3AF',
    
    // Status colors
    success: '#10b981',
    successForeground: '#ffffff',
    warning: '#f59e0b',
    warningForeground: '#ffffff',
    error: '#ef4444',
    errorForeground: '#ffffff',
    info: '#3b82f6',
    infoForeground: '#ffffff',

    // Skeleton screen
    skeleton: 'rgba(255,255,255,0.09)',
  },
  fonts: {
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    heading: 'ui-rounded, "SF Pro Rounded", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  radii: {
    walletSelectItem: '6px',
    connectButton: '6px',
    modalControlButton: '6px',
    accountActionItem: '6px',
    accountSelectItem: '6px',
    currentNetworkButton: '6px',
    networkSelectItem: '6px',
    modal: '12px',
  },
  shadows: {
    button: '0px 4px 12px rgba(0, 0, 0, 0.3)',
    modal: '0px 20px 25px -5px rgba(0, 0, 0, 0.4)',
  },
  blurs: {
    modalOverlay: 'blur(8px)',
  },
}; 

// Default theme configuration
export const lunokitDefaultTheme: LunokitThemeConfig = {
  lightMode: lunokitLightTheme,
  darkMode: lunokitDarkTheme,
};

// Theme factory function
export function createLunokitTheme(
  lightMode: Partial<LunokitTheme> = {},
  darkMode: Partial<LunokitTheme> = {}
): LunokitThemeConfig {
  return {
    lightMode: {
      ...lunokitLightTheme,
      ...lightMode,
      colors: { ...lunokitLightTheme.colors, ...lightMode.colors },
      fonts: { ...lunokitLightTheme.fonts, ...lightMode.fonts },
      radii: { ...lunokitLightTheme.radii, ...lightMode.radii },
      shadows: { ...lunokitLightTheme.shadows, ...lightMode.shadows },
      blurs: { ...lunokitLightTheme.blurs, ...lightMode.blurs },
    },
    darkMode: {
      ...lunokitDarkTheme,
      ...darkMode,
      colors: { ...lunokitDarkTheme.colors, ...darkMode.colors },
      fonts: { ...lunokitDarkTheme.fonts, ...darkMode.fonts },
      radii: { ...lunokitDarkTheme.radii, ...darkMode.radii },
      shadows: { ...lunokitDarkTheme.shadows, ...darkMode.shadows },
      blurs: { ...lunokitDarkTheme.blurs, ...darkMode.blurs },
    },
  };
}

// Theme injector class
export class ThemeInjector {
  private styleElement: HTMLStyleElement | null = null;
  private themeId: string;

  constructor(themeId: string = 'lunokit') {
    this.themeId = this.sanitizeId(themeId);
  }

  private sanitizeId(id: string): string {
    return id.replace(/[^a-zA-Z0-9-_]/g, '');
  }

  private themeToCSS(theme: LunokitTheme): string {
    const cssVars: string[] = [];
    
    // Convert colors - use --color- prefix
    Object.entries(theme.colors).forEach(([key, value]) => {
      cssVars.push(`--color-${key}: ${value};`);
    });
    
    // Convert fonts - use --font- prefix
    Object.entries(theme.fonts).forEach(([key, value]) => {
      cssVars.push(`--font-${key}: ${value};`);
    });
    
    // Convert radii - use --radius- prefix
    Object.entries(theme.radii).forEach(([key, value]) => {
      cssVars.push(`--radius-${key}: ${value};`);
    });
    
    // Convert shadows - use --shadow- prefix
    Object.entries(theme.shadows).forEach(([key, value]) => {
      cssVars.push(`--shadow-${key}: ${value};`);
    });
    
    // Convert blurs - use --blur- prefix
    Object.entries(theme.blurs).forEach(([key, value]) => {
      cssVars.push(`--blur-${key}: ${value};`);
    });

    return cssVars.join('\n  ');
  }

  inject(themeConfig: LunokitThemeConfig): void {
    const css = `
[data-lk="${this.themeId}"] {
  /* Light mode (default) */
  ${this.themeToCSS(themeConfig.lightMode)}
}

[data-lk="${this.themeId}"][data-theme="dark"] {
  /* Dark mode */
  ${this.themeToCSS(themeConfig.darkMode)}
}

@media (prefers-color-scheme: dark) {
  [data-lk="${this.themeId}"]:not([data-theme="light"]) {
    /* Auto dark mode */
    ${this.themeToCSS(themeConfig.darkMode)}
  }
}
    `.trim();

    if (this.styleElement) {
      this.styleElement.remove();
    }

    this.styleElement = document.createElement('style');
    this.styleElement.textContent = css;
    document.head.appendChild(this.styleElement);
  }

  destroy(): void {
    if (this.styleElement) {
      this.styleElement.remove();
      this.styleElement = null;
    }
  }
} 