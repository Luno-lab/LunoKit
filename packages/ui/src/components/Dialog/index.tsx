// packages/ui/src/components/Dialog/index.tsx

import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { type ReactNode } from 'react';
import { cs } from '../../utils';

export type ModalSize = 'compact' | 'wide';

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  contentClassName?: string;
  overlayClassName?: string;
}

interface DialogTitleProps {
  children: ReactNode;
  className?: string;
}

interface DialogCloseProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const DialogRoot: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  children,
  contentClassName,
  overlayClassName,
}) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        {React.createElement(DialogPrimitive.Overlay as any, {
          className: cs(
            'fixed inset-0 z-[100] bg-modalBackdrop luno-kit',
            'data-[state=open]:[animation:overlay-in_150ms_ease-out]',
            overlayClassName
          ),
        })}
        <DialogPrimitive.Content
          className={cs(
            'luno-kit font-body fixed z-[200] text-modalText text-base leading-base',
            'bg-modalBackground shadow-modal focus:outline-none overflow-hidden border border-modalBorder',
            'transition-all duration-200',

            'rounded-t-modalMobile bottom-0 left-0 w-full',
            'translate-y-0 -translate-x-0',
            'data-[state=open]:[animation:slide-up_200ms_ease-out]',

            'md:bottom-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2',
            'md:w-auto md:rounded-modal',
            'md:data-[state=open]:[animation:dialog-in_150ms_ease-out]',
            contentClassName
          )}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

const DialogTitleWrapper: React.FC<DialogTitleProps> = ({ children, className }) =>
  React.createElement(DialogPrimitive.Title as any, { className }, children);

const DialogCloseWrapper: React.FC<DialogCloseProps> = ({ children, className, onClick }) =>
  React.createElement(DialogPrimitive.Close as any, { className, onClick }, children);

export const Dialog = DialogRoot;
export const DialogClose = DialogCloseWrapper;
export const DialogTitle = DialogTitleWrapper;

export type { DialogProps, DialogTitleProps, DialogCloseProps };
