import type { ReactNode } from "react";
import { DetailsImage } from "@/components/details/DetailsImage";
import { detailsAsset } from "@/lib/details/assets";

type SharedBackdropGroupProps = {
  children: ReactNode;
};

/**
 * Single shared backdrop for Travel + Stay + Attire (plan §2.3, §5.4).
 *
 * Rather than three separate section backgrounds, one flat gradient/tone is
 * painted once here; the three sections inside are transparent and are
 * differentiated only by their own eyebrows, dividers, and floral accents.
 * The backdrop art is a one-file swap through the asset manifest.
 */
export function SharedBackdropGroup({ children }: SharedBackdropGroupProps) {
  return (
    <div className="relative bg-[image:var(--d-grad-shared)]">
      <DetailsImage
        src={detailsAsset("sharedBackdrop")}
        alt=""
        fill
        loading="lazy"
        sizes="100vw"
        className="pointer-events-none object-cover opacity-60 mix-blend-multiply"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
