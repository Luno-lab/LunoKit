// packages/ui/src/components/ChainModal/index.tsx
import React from 'react';
import { Dialog } from '../Dialog';
import { useChainModal } from '../../providers/ModalContext';
import { ChainSelector } from '../ChainSelector'

export const ChainModal: React.FC = () => {
  const { isOpen, close } = useChainModal();
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && close()}
    >
      <div className="flex flex-col w-[360px] max-h-[500px] p-[16px] gap-[14px] text-modalFont">
        <ChainSelector />
      </div>
    </Dialog>
  );
};
