// packages/ui/src/components/Dialog/index.tsx
import React, { ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cs } from '../../utils';

export type ModalSize = 'compact' | 'wide';

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  contentClassName?: string;
  overlayClassName?: string;
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
        <DialogPrimitive.Overlay
          className={cs(
            'fixed inset-0 z-100 bg-modalBackdrop',
            'data-[state=open]:[animation:overlay-in_150ms_ease-out]',
            'data-[state=closed]:[animation:overlay-out_100ms_ease-in]',
            overlayClassName
          )}
        />
        <DialogPrimitive.Content
          className={cs(
            'fixed left-1/2 top-1/2 z-200 -translate-x-1/2 -translate-y-1/2 text-modalFont text-primary leading-primary',
            'rounded-md bg-modal-bg shadow-primary focus:outline-none',
            'transition-all duration-200',
            'data-[state=open]:[animation:dialog-in_150ms_ease-out]',
            'data-[state=closed]:[animation:dialog-out_75ms_ease-in]',
            contentClassName
          )}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export const Dialog = DialogRoot;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;

export type { DialogProps };
