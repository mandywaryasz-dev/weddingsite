"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import clsx from "clsx";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  trigger?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  trigger,
  children,
  className
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] transition-opacity duration-200 data-[state=closed]:opacity-0 data-[state=open]:opacity-100" />
        <Dialog.Content
          aria-describedby={description ? "modal-description" : undefined}
          className={clsx(
            "fixed left-1/2 top-1/2 z-50 w-[min(92vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-gold/30 bg-forest/95 p-6 text-ivory shadow-2xl data-[state=open]:animate-modal-in data-[state=closed]:animate-modal-out",
            className
          )}
        >
          <header className="mb-4 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="font-heading text-2xl text-ivory">{title}</Dialog.Title>
              {description ? (
                <Dialog.Description id="modal-description" className="mt-2 text-base text-textMuted">
                  {description}
                </Dialog.Description>
              ) : null}
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="rounded-full border border-gold/40 px-3 py-1 text-xs font-heading uppercase tracking-[0.14em] text-gold"
              >
                Close
              </button>
            </Dialog.Close>
          </header>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
