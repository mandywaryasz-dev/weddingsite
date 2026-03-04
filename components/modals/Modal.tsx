"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import clsx from "clsx";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: ReactNode;
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
  const modalDescription = description ?? "Dialog content.";

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay
          data-testid="modal-overlay"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[3px] transition-opacity duration-300 data-[state=closed]:opacity-0 data-[state=open]:opacity-100"
        />
        <Dialog.Content
          data-testid="modal-content"
          className={clsx(
            "fixed left-1/2 top-1/2 z-50 w-[min(92vw,760px)] max-h-[86svh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-ivory/25 bg-[linear-gradient(165deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04))] p-6 text-ivory shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl data-[state=open]:animate-modal-in data-[state=closed]:animate-modal-out sm:p-7",
            className
          )}
        >
          <header className="mb-4">
            <div className="flex items-start justify-between gap-4">
              <Dialog.Title className="font-heading text-body tracking-display text-ivory">{title}</Dialog.Title>
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="rounded-full border border-ivory/50 bg-black/25 px-3 py-1 text-micro font-heading uppercase tracking-micro text-ivory transition hover:bg-white/20"
                >
                  Close
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Description className={clsx("mt-2 text-base text-ivory/85", description ? "" : "sr-only")}>
              {modalDescription}
            </Dialog.Description>
          </header>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
