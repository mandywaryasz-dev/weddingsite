import type { ReactNode } from "react";
import { DetailsImage } from "@/components/details/DetailsImage";
import { detailsAsset } from "@/lib/details/assets";

type SharedBackdropGroupProps = {
  children: ReactNode;
};

/**
 * Single shared backdrop for Travel + Stay + Attire + FAQ (plan §2.3, §5.4).
 *
 * Rather than four separate section backgrounds, one warm-blush paper texture
 * is painted once behind the group; the sections inside are transparent and are
 * differentiated only by their eyebrows and the gold-dot dividers between them.
 *
 * The texture is served through next/image (`fill`) rather than a CSS
 * `url()` background so it gets on-demand WebP/resize + a responsive srcset for
 * every visitor. `#F4DFD4` stays as the base colour so the blush shows while the
 * texture streams in. The backdrop art is a one-file swap via the manifest.
 */
export function SharedBackdropGroup({ children }: SharedBackdropGroupProps) {
  return (
    <div className="relative bg-[#F4DFD4]">
      <DetailsImage
        src={detailsAsset("sharedBackdrop")}
        alt=""
        fill
        loading="lazy"
        quality={85}
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
