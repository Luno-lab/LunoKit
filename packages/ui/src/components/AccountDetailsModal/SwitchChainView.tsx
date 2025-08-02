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
    <div className={'flex flex-col gap-3.5 p-4 pt-0'}>
      <ChainList />
    </div>
  )
}

SwitchChainView.title = 'Select Networks';
