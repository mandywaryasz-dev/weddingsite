"use client";

import { Modal } from "@/components/modals/Modal";
import { saveTheDateContent } from "@/lib/content/saveTheDate";

type StoryModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function StoryModal({ open, onOpenChange }: StoryModalProps) {
  const content = saveTheDateContent.modals.story;

  return (
    <Modal open={open} onOpenChange={onOpenChange} title={content.title} description={content.description}>
      <div className="space-y-3">
        {content.bodyLines.map((line) => (
          <p key={line} className="text-base leading-relaxed text-textMuted sm:text-lg">
            {line}
          </p>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {content.placeholders.map((placeholder) => (
          <article
            key={placeholder.key}
            className="relative overflow-hidden rounded-xl border border-white/20 bg-white/[0.06] px-4 py-5 backdrop-blur-md"
            aria-label={`${placeholder.label} placeholder`}
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_55%)]"
            />
            <p className="font-heading text-xs uppercase tracking-[0.14em] text-gold">{placeholder.label}</p>
            <p className="mt-3 text-sm text-textMuted">{placeholder.caption}</p>
          </article>
        ))}
      </div>
    </Modal>
  );
}
