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
            'luno:fixed luno:inset-0 luno:z-[100] luno:bg-modalBackdrop luno-kit',
            'luno:data-[state=open]:[animation:overlay-in_150ms_ease-out]',
            overlayClassName
          ),
        })}
        <DialogPrimitive.Content
          className={cs(
            'luno-kit luno:font-body luno:fixed luno:z-[200] luno:text-modalText luno:text-base luno:leading-base',
            'luno:bg-modalBackground luno:shadow-modal luno:focus:outline-none luno:overflow-hidden luno:border luno:border-modalBorder',
            'luno:transition-all luno:duration-200',

            'luno:rounded-t-modalMobile luno:bottom-0 luno:left-0 luno:w-full',
            'luno:translate-y-0 luno:-translate-x-0',
            'luno:data-[state=open]:[animation:slide-up_200ms_ease-out]',

            'luno:md:bottom-auto luno:md:left-1/2 luno:md:top-1/2 luno:md:-translate-x-1/2 luno:md:-translate-y-1/2',
            'luno:md:w-auto luno:md:rounded-modal',
            'luno:md:data-[state=open]:[animation:dialog-in_150ms_ease-out]',
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
