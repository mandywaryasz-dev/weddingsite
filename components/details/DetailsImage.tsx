import Image, { type ImageProps } from "next/image";

/**
 * Thin wrapper over next/image for details-page art.
 *
 * The current art under /images/details is placeholder SVG; next/image cannot
 * optimize SVG without `dangerouslyAllowSVG`, so we transparently set
 * `unoptimized` for `.svg` sources. When final raster art (jpg/png/webp) is
 * dropped into the same paths, optimization + `sizes` srcsets kick in
 * automatically with no code change (plan §2.4, §5.7).
 */
export function DetailsImage(props: ImageProps) {
  const isSvg = typeof props.src === "string" && props.src.endsWith(".svg");
  // `alt` is required by callers and forwarded via {...props}; the linter can't
  // see through the spread.
  // eslint-disable-next-line jsx-a11y/alt-text
  return <Image {...props} unoptimized={props.unoptimized ?? isSvg} />;
}
