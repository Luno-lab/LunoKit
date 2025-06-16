import React from 'react'
import { ChainList } from '../ChainList'

interface ViewComponent extends React.FC<SwitchChainViewProps> {
  title?: string;
}

interface SwitchChainViewProps {
  onBack: () => void
}

export const SwitchChainView: ViewComponent = ({ onBack }) => {
  return (
    <div className={'flex flex-col gap-[14px] '}>
      <ChainList onChainSwitched={onBack} />
    </div>
  )
}

SwitchChainView.title = 'Select Networks';
