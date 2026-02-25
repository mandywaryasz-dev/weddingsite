"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode, useId } from "react";
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
  const descriptionId = useId();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/55 backdrop-blur-md transition-opacity duration-300 data-[state=closed]:opacity-0 data-[state=open]:opacity-100" />
        <Dialog.Content
          aria-describedby={description ? descriptionId : undefined}
          className={clsx(
            "glass-modal fixed left-1/2 top-1/2 z-50 w-[min(92vw,760px)] -translate-x-1/2 -translate-y-1/2 rounded-[1.75rem] p-6 text-ivory shadow-2xl data-[state=open]:animate-modal-in data-[state=closed]:animate-modal-out sm:p-8",
            className
          )}
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(100%_70%_at_0%_0%,rgba(255,255,255,0.22),transparent_50%)]" />
          <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-white/10" />
          <header className="mb-4 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="font-heading text-2xl text-ivory">{title}</Dialog.Title>
              {description ? (
                <Dialog.Description id={descriptionId} className="mt-2 text-base text-textMuted">
                  {description}
                </Dialog.Description>
              ) : null}
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="glass-pill px-4 py-2 text-[11px] font-heading uppercase tracking-[0.16em] text-ivory"
              >
                Close
              </button>
            </Dialog.Close>
          </header>
          <div className="relative z-10">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
