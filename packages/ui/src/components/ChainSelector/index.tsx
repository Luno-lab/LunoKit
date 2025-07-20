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
      <div className="flex flex-col gap-[16px] p-[16px]">
        <DialogTitle className="text-title leading-title text-modalText font-[600]">
          Select Network
        </DialogTitle>
        
        <div className="flex items-center gap-[12px] p-[12px] rounded-sm bg-chainSelectItemBackground">
          <ChainIcon
            className="w-[24px] h-[24px]"
            chainIconUrl={chain?.chainIconUrl}
            chainName={chain?.name}
          />
          <span className="text-modalText font-[500]">
            {chain?.name || 'Select a network'}
          </span>
        </div>
      </div>
    </Dialog>
  );
};
