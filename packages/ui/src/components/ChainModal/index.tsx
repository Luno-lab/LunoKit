import React from 'react';
import { useChains, useChain } from '@luno-kit/react';
import { Dialog, DialogTitle, DialogClose } from '../Dialog';
import { ChainList } from '../ChainList';
import { cs } from '../../utils';
import { Close } from '../../assets/icons';

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
        <div className="flex items-center justify-between w-full">
          <div className="w-[30px]" /> {/* 占位符，保持标题居中 */}
          <DialogTitle className="text-title leading-title text-modalText font-[600] transition-opacity duration-300">
            Select Network
          </DialogTitle>
          <DialogClose className="z-10 flex items-center justify-center h-[30px] w-[30px] rounded-modalControlButton border-none hover:bg-modalControlButtonBackgroundHover transition-colors duration-200 cursor-pointer">
            <Close />
          </DialogClose>
        </div>
        
        <ChainList 
          onChainSwitched={(chain) => {
            console.log('Chain switched to:', chain.name);
          }}
        />
      </div>
    </Dialog>
  );
};
