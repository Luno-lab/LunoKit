// packages/ui/src/components/Dialog/index.tsx
import React, { ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cs } from '../../utils'; // 假设路径 `../../utils` 是正确的

interface DialogProps extends Omit<DialogPrimitive.DialogProps, 'children'> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  contentClassName?: string;
  overlayClassName?: string;
  titleId?: string;
}

const DialogRoot: React.FC<DialogProps> = ({
  open,
  onOpenChange,
  children,
  contentClassName,
  overlayClassName,
  titleId,
  // ...props // other DialogPrimitive.DialogProps like 'modal', 'defaultOpen', etc.
}) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cs(
            'fixed inset-0 z-40 bg-black/60 backdrop-blur-sm', // 基础样式
            'data-[state=open]:animate-overlayShow',       // Radix 动画辅助类
            'data-[state=closed]:animate-overlayHide',     // Radix 动画辅助类
            overlayClassName                               // 用户自定义遮罩层 class
          )}
        />
        <DialogPrimitive.Content
          aria-labelledby={titleId}
          className={cs(
            'fixed left-1/2 top-1/2 z-50 w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-[var(--luno-colors-border)] bg-[var(--luno-colors-modal-background)] p-6 shadow-[var(--luno-layout-modal-shadow)] focus:outline-none', // 基础样式
            'data-[state=open]:animate-contentShow',    // Radix 动画辅助类
            'data-[state=closed]:animate-contentHide',  // Radix 动画辅助类
            contentClassName                            // 用户自定义内容区 class
          )}
        >
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export const Dialog = DialogRoot;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;
export const DialogTitle = DialogPrimitive.Title;
export const DialogDescription = DialogPrimitive.Description;
