import { DialogClose, DialogTitle } from '../Dialog'
import { Close } from '../../assets/icons'
import React from 'react'
import { ChainList } from '../ChainList'

interface ChainSelectorProps {
  onClose: () => void
}

export const ChainSelector: React.FC<ChainSelectorProps> = ({ onClose }: ChainSelectorProps) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div/>
        <DialogTitle className="text-title leading-title text-modalFont font-[600]">
          Select Networks
        </DialogTitle>
        <DialogClose className="z-[10] cursor-pointer">
          <Close className="w-[24px] h-[24px]"/>
        </DialogClose>
      </div>

      <ChainList onChainSwitched={onClose} />
    </>
  )
}
