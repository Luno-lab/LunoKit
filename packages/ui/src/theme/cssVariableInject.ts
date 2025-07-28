import { useEffect } from 'react';
import type { LunokitTheme, PartialLunokitTheme, ThemeMode } from './types';

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

interface ThemeInfo {
  type: 'default' | 'complete' | 'partial';
  completeTheme: LunokitTheme | null;
  partialOverrides: PartialLunokitTheme | null;
}

export const useCSSVariableInjection = (themeInfo: ThemeInfo, themeMode: ThemeMode) => {
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
};