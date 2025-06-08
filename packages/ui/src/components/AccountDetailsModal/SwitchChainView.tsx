import React from 'react'
import { ChainSelector } from '../ChainSelector'

export const SwitchChainView = () => {
  return (
    <div className={'flex flex-col gap-[14px] '}>
      <ChainSelector showTitle={false}/>
    </div>
  )
}
