import type React from 'react';
import { Close } from '../../assets/icons';
import { useChainModal } from '../../providers';
import { ChainList } from '../ChainList';
import { Dialog, DialogClose, DialogTitle } from '../Dialog';

export const ChainModal: React.FC = () => {
  const { isOpen, close } = useChainModal();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <div className="luno:flex luno:flex-col luno:w-full luno:md:w-[360px] luno:max-h-[512px] luno:p-4 luno:gap-3.5 luno:text-modalText">
        <div className="luno:flex luno:items-center luno:justify-between luno:w-full">
          <div className="luno:w-[30px]" /> {/* Placeholder to keep title centered */}
          <DialogTitle className="luno:text-lg luno:leading-lg luno:text-modalText luno:font-semibold luno:transition-opacity luno:duration-300">
            Select Network
          </DialogTitle>
          <DialogClose className="luno:z-10 luno:flex luno:items-center luno:justify-center luno:h-[30px] luno:w-[30px] luno:rounded-modalControlButton luno:border-none luno:hover:bg-modalControlButtonBackgroundHover luno:transition-colors luno:duration-200 luno:cursor-pointer">
            <Close />
          </DialogClose>
        </div>

        <ChainList />
      </div>
    </Dialog>
  );
};
