import React from 'react'
import { ChainList } from '../ChainList'

interface ViewComponent extends React.FC {
  title?: string;
}

export const SwitchChainView: ViewComponent = () => {
  return (
    <div className={'flex flex-col gap-[14px] '}>
      <ChainList />
    </div>
  )
}

SwitchChainView.title = 'Select Networks';
