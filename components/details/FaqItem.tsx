import type { FaqQa } from "@/lib/details/types";

type FaqItemProps = {
  item: FaqQa;
};

/**
 * Native <details> accordion (keyboard + no-JS for free). The marker rotates
 * +→× and the summary color shifts purely via the `group-open` variant, so this
 * stays a server component (plan §5.5). The whole summary row is the tap target
 * and meets the 48px minimum (§5.7).
 */
export function FaqItem({ item }: FaqItemProps) {
  return (
    <details className="group border-b border-[color:var(--d-hairline)]">
      <summary className="flex min-h-[var(--btn-min-h)] cursor-pointer list-none items-center gap-4 px-[4px] py-[20px] font-heading tracking-[0.04em] text-[color:var(--d-maroon)] text-[clamp(0.98rem,2.6vw,1.1rem)] group-open:text-[color:var(--d-terracotta)] [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden
          className="inline-block w-[18px] flex-none text-center font-body text-[24px] leading-none text-[color:var(--d-gold)] transition-transform duration-300 group-open:rotate-45"
        >
          +
        </span>
        {item.q}
      </summary>
      <p className="m-0 px-[4px] pb-[22px] pl-[38px] leading-[1.6] text-[color:var(--d-body-soft)] text-[clamp(1.02rem,2.5vw,1.16rem)]">
        {item.a}
      </p>
    </details>
  );
}
