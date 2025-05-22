import React from 'react';

interface ButtonProps {}

const ConnectButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({  ...props }, ref) => {
    return (
      <button className={'p-[16px] border-[1px] border-solid border-[red]'}>test</button>
    );
  }
);
ConnectButton.displayName = 'ConnectButton';

export { ConnectButton };
