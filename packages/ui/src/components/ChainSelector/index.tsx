import React from 'react';
import { useChain } from '@luno-kit/react';
import { Dialog, DialogTitle } from '../Dialog';
import { ChainIcon } from '../ChainIcon';
import { cs } from '../../utils';

export interface ChainSelectorProps {
  onClose?: () => void;
}

export const ChainSelector: React.FC<ChainSelectorProps> = ({ onClose }) => {
  const { chain } = useChain();

  return (
    <Dialog>
      <div className="flex flex-col gap-4 p-4">
        <DialogTitle className="text-lg leading-lg text-modalText font-semibold">
          Select Network
        </DialogTitle>
        
        <div className="flex items-center gap-3 p-3 rounded-sm bg-chainSelectItemBackground">
          <ChainIcon
            className="w-[24px] h-[24px]"
            chainIconUrl={chain?.chainIconUrl}
            chainName={chain?.name}
          />
          <span className="text-modalText font-medium">
            {chain?.name || 'Select a network'}
          </span>
        </div>
      </div>
    </Dialog>
  );
};
