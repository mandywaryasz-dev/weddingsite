import type { ReactNode } from "react";
import { detailsAsset } from "@/lib/details/assets";

type SharedBackdropGroupProps = {
  children: ReactNode;
};

/**
 * Single shared backdrop for Travel + Stay + Attire + FAQ (plan §2.3, §5.4).
 *
 * Rather than four separate section backgrounds, one warm-blush paper texture
 * is painted once here as a cover background; the sections inside are
 * transparent and are differentiated only by their eyebrows and the gold-dot
 * dividers between them. The backdrop art is a one-file swap via the manifest.
 */
export function SharedBackdropGroup({ children }: SharedBackdropGroupProps) {
  return (
    <div
      className="relative bg-[#F4DFD4] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${detailsAsset("sharedBackdrop")})` }}
    >
      {children}
    </div>
  );
}
