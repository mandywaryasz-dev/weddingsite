"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import clsx from "clsx";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  eyebrow?: ReactNode;
  lede?: ReactNode;
  description?: ReactNode;
  headerAdornment?: ReactNode;
  trigger?: ReactNode;
  children: ReactNode;
  contentClassName?: string;
  bodyClassName?: string;
  className?: string;
};

export function Modal({
  open,
  onOpenChange,
  title,
  eyebrow,
  lede,
  description,
  headerAdornment,
  trigger,
  children,
  contentClassName,
  bodyClassName,
  className
}: ModalProps) {
  const modalDescription = description ?? lede ?? "Dialog content.";
  const visibleLede = lede ?? description;
  const showDescriptionVisibly = lede === undefined && description !== undefined;

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
            "fixed left-1/2 top-1/2 z-50 w-[min(94vw,860px)] max-h-[88svh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[2rem] border border-ivory/25 bg-[linear-gradient(165deg,rgba(255,255,255,0.2),rgba(255,255,255,0.05))] p-6 text-ivory shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl data-[state=open]:animate-modal-in data-[state=closed]:animate-modal-out sm:p-8",
            contentClassName,
            className
          )}
        >
          <header className="relative z-10 mb-8 border-b border-ivory/10 pb-7 pr-16 sm:mb-10 sm:pb-8 sm:pr-20">
            <Dialog.Close asChild>
              <button
                type="button"
                className="absolute right-0 top-0 rounded-full border border-ivory/18 bg-black/20 px-3 py-1.5 font-heading text-micro uppercase tracking-label text-ivory/72 transition hover:border-ivory/28 hover:bg-white/10 hover:text-ivory"
              >
                Close
              </button>
            </Dialog.Close>

            {eyebrow ? (
              <p className="font-heading text-micro uppercase tracking-[0.24em] text-gold/88">
                {eyebrow}
              </p>
            ) : null}

            <Dialog.Title className="mt-4 max-w-[28rem] font-body text-[clamp(2rem,1.55rem+1vw,2.75rem)] leading-[1.02] text-ivory">
              {title}
            </Dialog.Title>

            {showDescriptionVisibly ? (
              <Dialog.Description className="mt-4 max-w-[35rem] font-body text-body-sm leading-[1.55] text-ivory/78">
                {description}
              </Dialog.Description>
            ) : (
              <Dialog.Description className="sr-only">{modalDescription}</Dialog.Description>
            )}

            {lede !== undefined ? (
              <div className="mt-4 max-w-[35rem] font-body text-body-sm leading-[1.55] text-ivory/78">{visibleLede}</div>
            ) : null}

            {headerAdornment ? (
              <div data-testid="modal-header-adornment" className="mt-6">
                {headerAdornment}
              </div>
            ) : null}
          </header>

          <div data-testid="modal-body" className={clsx("relative z-10", bodyClassName)}>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
