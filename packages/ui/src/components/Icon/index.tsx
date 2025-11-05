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
      <div className={cs('luno:relative luno:w-full luno:h-full', className)}>
        {isLoading && (
          <div className="luno:absolute luno:inset-0 luno:flex luno:items-center luno:justify-center luno:rounded-full luno:animate-pulse luno:bg-skeleton" />
        )}

        <img
          src={iconUrl}
          alt={resourceName || 'icon'}
          className={cs(
            'luno:w-full luno:h-full luno:object-cover luno:rounded-full',
            isLoading ? 'luno:opacity-0' : 'luno:opacity-100 luno:transition-opacity luno:duration-200'
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
        'luno:w-full luno:h-full luno:text-white luno:font-semibold',
        'luno:flex luno:items-center luno:justify-center luno:rounded-full luno:bg-defaultIconBackground',
        className
      )}
    >
      {displayText}
    </div>
  );
};
