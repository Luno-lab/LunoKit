import React from 'react';
import { useChains, useChain } from '@luno-kit/react';
import { Dialog, DialogTitle } from '../Dialog';
import { ChainList } from '../ChainList';
import { cs } from '../../utils';

export interface ChainModalProps {
  size?: 'compact' | 'wide';
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ChainModal: React.FC<ChainModalProps> = ({ 
  size = 'wide',
  open,
  onOpenChange
}) => {
  const chains = useChains();
  const { chain } = useChain();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <div className="flex flex-col w-[360px] max-h-[500px] p-[16px] gap-[14px] text-modalText">
        <DialogTitle className="text-title leading-title text-modalText font-[600]">
          Select Network
        </DialogTitle>
        
        <ChainList 
          onChainSwitched={(chain) => {
            console.log('Chain switched to:', chain.name);
          }}
        />
      </div>
    </Dialog>
  );
};
