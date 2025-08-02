import React from 'react';
import { Dialog, DialogTitle, DialogClose } from '../Dialog';
import { ChainList } from '../ChainList';
import { Close } from '../../assets/icons';
import { useChainModal } from '../../providers/ModalContext';

export interface ChainModalProps {}

export const ChainModal: React.FC<ChainModalProps> = () => {
  const { isOpen, close } = useChainModal();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <div className="flex flex-col w-full md:w-[360px] max-h-[500px] p-4 gap-3.5 text-modalText">
        <div className="flex items-center justify-between w-full">
          <div className="w-[30px]" /> {/* Placeholder to keep title centered */}
          <DialogTitle className="text-lg leading-lg text-modalText font-semibold transition-opacity duration-300">
            Select Network
          </DialogTitle>
          <DialogClose className="z-10 flex items-center justify-center h-[30px] w-[30px] rounded-modalControlButton border-none hover:bg-modalControlButtonBackgroundHover transition-colors duration-200 cursor-pointer">
            <Close />
          </DialogClose>
        </div>

        <ChainList />
      </div>
    </Dialog>
  );
};
