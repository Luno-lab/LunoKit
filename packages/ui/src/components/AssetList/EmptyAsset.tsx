import { EmptyWallet } from '../../assets/icons'

interface Props {
  type: 'Tokens' | 'NFTs'
}

export const EmptyAsset = ({ type }: Props) => {
  return (
    <div className="flex flex-col gap-1 items-center justify-center min-h-[300px] text-center">
      <EmptyWallet className={'w-[38px] h-[38px] mb-2'} />
      <div className="text-modalText text-base leading-base">No {type} found</div>
      <div className="text-sm text-modalTextSecondary max-w-[260px]">
        Switch to a different network or account to view more assets
      </div>
    </div>
  )
}
