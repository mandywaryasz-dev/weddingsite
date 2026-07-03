import { DetailsImage } from "@/components/details/DetailsImage";
import { MapPinIcon, PhoneIcon, GlobeIcon, InfoIcon } from "@/components/icons";
import { detailsAsset, type DetailsAssetKey } from "@/lib/details/assets";
import type { Hotel } from "@/lib/details/types";

type HotelCardProps = {
  hotel: Hotel;
};

export function HotelCard({ hotel }: HotelCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-[2rem] border border-[rgba(199,164,93,0.5)] bg-[rgba(251,247,240,0.75)] shadow-[0_30px_80px_rgba(122,46,52,0.12)] backdrop-blur-[16px]">
      <div className="relative h-[clamp(180px,26vw,224px)] overflow-hidden">
        <DetailsImage
          src={detailsAsset(hotel.imageKey as DetailsAssetKey)}
          alt={hotel.imageAlt}
          fill
          loading="lazy"
          quality={85}
          sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 33rem"
          className="object-cover"
          style={{ objectPosition: "center 40%" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg,rgba(58,23,28,0) 55%,rgba(58,23,28,.32))" }}
        />
        <span className="absolute left-4 top-4 rounded-full bg-[rgba(251,247,240,0.9)] px-3 py-[6px] font-heading text-[9px] tracking-[0.16em] text-[color:var(--d-maroon)]">
          {hotel.badge}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-[clamp(22px,4vw,30px)]">
        <h3 className="mb-4 whitespace-pre-line font-heading font-semibold leading-[1.25] tracking-[0.06em] text-[color:var(--d-maroon)] text-[clamp(1.15rem,3vw,1.4rem)]">
          {hotel.name}
        </h3>

        <div className="flex flex-1 flex-col gap-[11px] text-[1.06rem] text-[color:var(--d-body-soft)]">
          <span className="flex items-start gap-[11px]">
            <MapPinIcon className="mt-[2px] flex-none" />
            {hotel.address}
          </span>
          <span className="flex items-center gap-[11px]">
            <PhoneIcon className="flex-none" />
            <a
              href={`tel:${hotel.phone.replace(/[^\d+]/g, "")}`}
              className="text-[color:var(--d-body-soft)] no-underline"
            >
              {hotel.phone}
            </a>
          </span>
          <span className="flex items-center gap-[11px]">
            <GlobeIcon className="flex-none" />
            <a
              href={hotel.website.href}
              target="_blank"
              rel="noopener"
              className="border-b border-[rgba(122,46,52,0.25)] text-[color:var(--d-body-soft)] no-underline"
            >
              {hotel.website.label}
            </a>
          </span>
        </div>

        <p className="mt-4 flex items-start gap-[9px] font-body italic leading-[1.45] text-[color:var(--d-body-muted)] text-[0.96rem]">
          <InfoIcon className="mt-[3px] flex-none" />
          {hotel.note}
        </p>

        <a
          href={hotel.cta.href}
          {...(hotel.cta.external ? { target: "_blank", rel: "noopener" } : {})}
          className="mt-6 flex min-h-[var(--btn-min-h)] items-center justify-center gap-[10px] rounded-full bg-[color:var(--d-maroon)] p-4 font-heading text-[11px] tracking-[0.16em] text-[color:var(--d-on-maroon)] no-underline shadow-[0_8px_22px_rgba(122,46,52,0.22)] transition hover:bg-[#8A3A40]"
        >
          {hotel.cta.label} <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
