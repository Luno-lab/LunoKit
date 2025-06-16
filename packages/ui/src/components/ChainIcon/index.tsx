import React from 'react'
import { cs } from '../../utils'

interface ChainIconProps {
  className?: string
  chainIconUrl?: string
  chainName?: string
  iconClassName?: string
}

export const ChainIcon: React.FC<ChainIconProps> = ({ className, chainIconUrl, chainName, iconClassName }) => {
  return (
    <div
      className={cs('relative bg-gray-500 aspect-square overflow-hidden rounded-full flex items-center justify-between', className)}>
      {chainIconUrl
        ? (<img
          className={cs('w-full h-full object-cover', iconClassName)}
          src={chainIconUrl}
          alt={`${chainName} logo`}
        />)
        : <span
          aria-label="Chain icon placeholder"
          className={cs(
            'w-full h-full bg-gray-500 text-modalFont font-[600]',
            'flex items-center justify-center',
            'chain-icon-text',
            iconClassName,
          )}>
          {chainName?.split('')[0]}
        </span>}
    </div>
  )
}
