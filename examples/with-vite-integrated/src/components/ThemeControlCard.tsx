import { useLunoTheme } from '@luno-kit/ui';

export const ThemeControlCard = () => {
  const { themeMode, setThemeChoice } = useLunoTheme();

  return (
    <div className="feature-card">
      <div className="card-header">
        <span className="card-icon">🎨</span>
        <h3>Theme Control</h3>
      </div>
      <div className="card-content">
        <div className="theme-section">
          <div className="status-item">
            <span className="label">Current Theme:</span>
            <span className="value">
              {themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button className="chain-switch-btn" onClick={() => setThemeChoice('light')}>
              Light Theme
            </button>
            <button className="chain-switch-btn" onClick={() => setThemeChoice('dark')}>
              Dark Theme
            </button>
            <button className="chain-switch-btn" onClick={() => setThemeChoice('auto')}>
              Auto Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
