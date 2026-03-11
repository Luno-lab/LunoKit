import React from 'react';
import { cs } from '../../utils';

interface FadeSwitchItem {
  value: string;
  content: React.ReactNode;
}

interface FadeSwitchProps {
  activeValue: string;
  items: FadeSwitchItem[];
  animate?: boolean;
  height?: string;
  duration?: number;
  className?: string;
}

export const FadeSwitch: React.FC<FadeSwitchProps> = ({
  activeValue,
  items,
  animate = true,
  height,
  duration = 200,
  className,
}) => {
  return (
    <div
      className={cs('luno:relative', className)}
      style={animate && height ? { height } : undefined}
    >
      {items.map((item) => {
        const isActive = activeValue === item.value;
        return (
          <div
            key={item.value}
            className={cs(
              animate && cs(
                'luno:transition-opacity',
                (height || !isActive) && 'luno:absolute luno:inset-0',
                !isActive && 'luno:opacity-0 luno:pointer-events-none',
              ),
            )}
            style={animate ? { transitionDuration: `${duration}ms` } : undefined}
          >
            {item.content}
          </div>
        );
      })}
    </div>
  );
};
