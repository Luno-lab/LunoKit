import type React from 'react';
import { useMemo, useState } from 'react';
import { cs } from '../../utils';

export interface IconProps {
  iconUrl?: string;
  resourceName?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ iconUrl, resourceName, className }) => {
  const [isLoading, setIsLoading] = useState(!!iconUrl);
  const [hasError, setHasError] = useState(false);

  const bgColor = useMemo(() => {
    if (resourceName?.includes('token')) return '#E6007A'
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4'];

    if (!resourceName) return colors[0];

    let sum = 0;
    for (let i = 0; i < resourceName.length; i++) {
      sum += resourceName.charCodeAt(i);
    }

    return colors[sum % colors.length];
  }, [resourceName]);

  const displayText = useMemo(() => {
    if (!resourceName) return '-';

    const match = resourceName.match(/^([^-]+)-/);
    if (match?.[1]) {
      return match[1].charAt(0).toUpperCase();
    }

    return resourceName.charAt(0).toUpperCase();
  }, [resourceName]);

  if (iconUrl && !hasError) {
    return (
      <div className={cs('relative w-full h-full', className)}>
        {isLoading && (
          <div className="absolute fuck inset-0 flex items-center justify-center rounded-full animate-pulse bg-skeleton"/>
        )}

        <img
          src={iconUrl}
          alt={resourceName || 'icon'}
          className={cs(
            'w-full h-full object-cover rounded-full',
            isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-200'
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={cs(
        'w-full h-full text-white font-semibold',
        'flex items-center justify-center rounded-full',
        className
      )}
      style={{ backgroundColor: bgColor }}
    >
      {displayText}
    </div>
  );
};
