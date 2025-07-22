// Theme type definitions
export interface LunokitTheme {
  colors: {
    // Primary colors
    accentColor: string;
    
    // Button related
    walletSelectItemBackground: string;
    walletSelectItemBackgroundHover: string;
    walletSelectItemText: string;

    connectButtonBackground: string;
    connectButtonInnerBackground: string;
    connectButtonText: string;

    accountActionItemBackground: string;
    accountActionItemBackgroundHover: string;
    accountActionItemText: string;

    accountSelectItemBackground: string;
    accountSelectItemBackgroundHover: string;
    accountSelectItemText: string;

    currentNetworkButtonBackground: string;
    currentNetworkButtonText: string;

    networkSelectItemBackground: string;
    networkSelectItemBackgroundHover: string;
    networkSelectItemText: string;

    navigationButtonBackground: string;

    separatorLine: string;
    
    // Modal related
    modalBackground: string;
    modalBackdrop: string;
    modalBorder: string;
    modalText: string;
    modalTextSecondary: string;
    modalControlButtonBackgroundHover: string;
    modalControlButtonText: string;
    
    // Status colors
    success: string;
    successForeground: string;
    warning: string;
    warningForeground: string;
    error: string;
    errorForeground: string;
    info: string;
    infoForeground: string;

    // Skeleton screen
    skeleton: string;
  };
  fonts: {
    body: string;
    heading: string;
    mono: string;
  };
  radii: {
    walletSelectItem: string;
    connectButton: string;
    modalControlButton: string;
    accountActionItem: string;
    accountSelectItem: string;
    currentNetworkButton: string;
    networkSelectItem: string;
    modal: string;
  };
  shadows: {
    button: string;
    modal: string;
  };
  blurs: {
    modalOverlay: string;
  };
}

// Partial theme for overriding specific properties
export type PartialLunokitTheme = {
  colors?: Partial<LunokitTheme['colors']>;
  fonts?: Partial<LunokitTheme['fonts']>;
  radii?: Partial<LunokitTheme['radii']>;
  shadows?: Partial<LunokitTheme['shadows']>;
  blurs?: Partial<LunokitTheme['blurs']>;
};

// Simplified theme configuration supporting partial overrides
export interface LunokitThemeOverrides {
  // Complete custom theme (overrides both light and dark)
  theme?: LunokitTheme;
  
  // Partial overrides for specific modes
  light?: PartialLunokitTheme;
  dark?: PartialLunokitTheme;
}

export type ThemeMode = 'light' | 'dark'; 