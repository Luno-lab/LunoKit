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
          <div className="absolute inset-0 flex items-center justify-center rounded-full animate-pulse bg-skeleton" />
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
        'flex items-center justify-center rounded-full bg-defaultIconBackground',
        className
      )}
    >
      {displayText}
    </div>
  );
};
