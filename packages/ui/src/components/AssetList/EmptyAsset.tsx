import { EmptyWallet } from '../../assets/icons';

interface Props {
  type: 'Tokens' | 'NFTs';
}

export const EmptyAsset = ({ type }: Props) => {
  return (
    <div className="luno:flex luno:flex-col luno:gap-1 luno:items-center luno:justify-center luno:min-h-[300px] luno:text-center">
      <EmptyWallet className={'luno:w-[38px] luno:h-[38px] luno:mb-2'} />
      <div className="luno:text-modalText luno:text-base luno:leading-base">No {type} found</div>
      <div className="luno:text-sm luno:text-modalTextSecondary luno:max-w-[260px]">
        Switch to a different network or account to view more assets
      </div>
    </div>
  );
};
