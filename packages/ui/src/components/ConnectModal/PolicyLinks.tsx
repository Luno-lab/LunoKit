import type React from 'react';
import type { PolicyLinks as PolicyLinksType } from '../../providers';

interface Props {
  policyLinks: PolicyLinksType;
}

export const PolicyLinks: React.FC<Props> = ({ policyLinks }) => {
  const { terms, privacy, target = '_blank' } = policyLinks;

  return (
    <div
      className={
        'luno:w-full luno:border-t luno:border-t-separatorLine luno:flex luno:flex-col luno:items-center luno:gap-1 luno:p-3'
      }
    >
      <div
        className={
          'luno:text-modalTextSecondary luno:text-xs luno:leading-xs luno:font-regular luno:text-center'
        }
      >
        By connecting your wallet, you agree to our
      </div>
      <div
        className={
          'luno:text-xs luno:leading-xs luno:font-regular luno:text-center luno:text-modalTextSecondary'
        }
      >
        <a
          href={terms}
          target={target}
          rel="noreferrer noopener"
          className={'luno:text-accentColor luno:font-medium luno:hover:text-modalText'}
        >
          Terms of Service
        </a>
        <span className={'luno:px-1'}>&amp;</span>
        <a
          href={privacy}
          target={target}
          rel="noreferrer noopener"
          className={'luno:text-accentColor luno:font-medium luno:hover:text-modalText'}
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
};
