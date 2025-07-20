import React from 'react';
import { cs } from '../../utils';

export interface ChainIconProps {
  chainIconUrl?: string;
  chainName?: string;
  className?: string;
}

export const ChainIcon: React.FC<ChainIconProps> = ({
  chainIconUrl,
  chainName,
  className,
}) => {
  if (chainIconUrl) {
    return (
      <img
        src={chainIconUrl}
        alt={chainName || 'Chain icon'}
        className={cs('w-full h-full object-cover rounded-full', className)}
      />
    );
  }

  return (
    <div className={cs(
      'w-full h-full bg-gray-500 text-modalText font-[600]',
      'flex items-center justify-center rounded-full',
      className
    )}>
      {chainName ? chainName.charAt(0).toUpperCase() : 'C'}
    </div>
  );
};
