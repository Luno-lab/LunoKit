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

 