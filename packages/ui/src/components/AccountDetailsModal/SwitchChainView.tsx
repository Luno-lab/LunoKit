import React from 'react'
import { ChainSelector } from '../ChainSelector'

interface ViewComponent extends React.FC {
  title?: string;
}

export const SwitchChainView: ViewComponent = () => {
  return (
    <div className={'flex flex-col gap-[14px] '}>
      <ChainSelector showTitle={false}/>
    </div>
  )
}

SwitchChainView.title = 'Select Networks';
