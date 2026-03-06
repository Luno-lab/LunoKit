import type React from 'react';
import { Back, Close } from '../../assets/icons';
import { cs } from '../../utils';
import { DialogClose, DialogTitle } from '../Dialog';

interface Props {
  isConnectOptions: boolean;
  isWide: boolean;
  selectedConnectorName?: string;
  onBack: () => void;
}

export const ModalHeader: React.FC<Props> = ({
  isConnectOptions,
  isWide,
  selectedConnectorName,
  onBack,
}) => {
  return (
    <div
      className={cs(
        'luno:flex luno:items-center luno:justify-between luno:w-full',
        !isWide && 'luno:pb-4'
      )}
    >
      {isConnectOptions ? (
        <>
          {!isWide && <div className={cs('luno:w-[30px] luno:h-[30px]')} aria-hidden />}
          <DialogTitle
            className={cs(
              'luno:text-lg luno:leading-lg luno:text-modalText luno:font-bold',
              isWide ? 'luno:pb-5' : 'luno:flex-1 luno:text-center'
            )}
          >
            Connect Wallet
          </DialogTitle>
        </>
      ) : (
        <>
          <button
            className={cs(
              'luno:flex luno:items-center luno:justify-center luno:w-[30px] luno:h-[30px] luno:cursor-pointer luno:rounded-modalControlButton luno:border-none luno:hover:bg-modalControlButtonBackgroundHover luno:transition-colors luno:duration-200'
            )}
            onClick={onBack}
            aria-label="Back"
          >
            <Back />
          </button>
          <DialogTitle
            className={cs(
              'luno:text-lg luno:leading-lg luno:text-modalText luno:font-semibold luno:transition-opacity luno:duration-300'
            )}
          >
            {selectedConnectorName}
          </DialogTitle>
        </>
      )}

      {!isWide && (
        <DialogClose
          className={
            'luno:z-10 luno:w-[30px] luno:h-[30px] luno:flex luno:items-center luno:justify-center luno:cursor-pointer luno:rounded-modalControlButton luno:border-none luno:hover:bg-modalControlButtonBackgroundHover luno:transition-colors luno:duration-200'
          }
        >
          <Close />
        </DialogClose>
      )}
    </div>
  );
};
