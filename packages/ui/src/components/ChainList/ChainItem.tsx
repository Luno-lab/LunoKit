import { type AnyChain } from '@luno-kit/react/types';
import React from 'react';
import { cs } from '../../utils';
import { Icon } from '../Icon';

interface ChainItemProps {
  chain: AnyChain;
  isSelected: boolean;
  isLoading: boolean;
  onSelect: (chain: AnyChain) => void;
  isSwitching: boolean;
}

export const ChainItem: React.FC<ChainItemProps> = React.memo(
  ({ chain, isSelected, isLoading, onSelect, isSwitching }) => {
    return (
      <button
        onClick={() => onSelect(chain)}
        disabled={isSelected || isLoading}
        className={cs(
          'luno:flex luno:items-center luno:justify-between luno:p-2.5 luno:rounded-networkSelectItem',
          'luno:bg-networkSelectItemBackground',
          'luno:transition-colors luno:duration-200',
          isSelected || isLoading
            ? 'luno:cursor-default'
            : 'luno:cursor-pointer luno:hover:bg-networkSelectItemBackgroundHover',
          isLoading && 'luno:opacity-80'
        )}
      >
        <div className="luno:flex luno:items-center luno:gap-2">
          <Icon
            className={
              'luno:w-[20px] luno:h-[20px] luno:flex luno:items-center luno:justify-center luno:leading-[20px]'
            }
            iconUrl={chain?.chainIconUrl}
            resourceName={`${chain?.name}-chain`}
          />

          <div className="luno:flex luno:flex-col luno:items-start">
            <span className="luno:font-medium luno:text-base luno:text-modalText">
              {chain.name}
            </span>
          </div>
        </div>

        <div className="luno:flex luno:items-center luno:justify-center luno:h-[20px]">
          {isSelected ? (
            isLoading ? (
              <>
                <span className="luno:text-accentColor luno:text-xs luno:leading-xs luno:mr-1.5">
                  {isSwitching ? 'Switching' : 'Connecting'}
                </span>
                <div className="luno-loading luno:text-accentColor luno:w-[15px] luno:h-[15px]"></div>
              </>
            ) : (
              <span className="luno:relative luno:flex luno:w-[10px] luno:h-[10px]">
                <span className="luno:[animation:ping_1.2s_cubic-bezier(0,0,0.2,1)_infinite] luno:absolute luno:top-[0] luno:left-[0] luno:inline-flex luno:h-full luno:w-full luno:rounded-full luno:bg-accentColor" />
                <span className="luno:relative luno:inline-flex luno:rounded-full luno:h-full luno:w-full luno:bg-accentColor"></span>
              </span>
            )
          ) : null}
        </div>
      </button>
    );
  }
);
