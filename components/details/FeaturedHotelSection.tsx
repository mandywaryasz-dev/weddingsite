import { DetailsImage } from "@/components/details/DetailsImage";
import { RoomRatesPopover } from "@/components/details/RoomRatesPopover";
import { MapPinIcon, PhoneIcon, GlobeIcon } from "@/components/icons";
import { detailsAsset, type DetailsAssetKey } from "@/lib/details/assets";
import type { FeaturedHotel } from "@/lib/details/types";

type FeaturedHotelSectionProps = {
  hotel: FeaturedHotel;
};

/**
 * Editorial two-column feature for the couple's primary pick (plan: Stay §).
 * Image constrained left, narrative right; stacks on mobile. The "OUR HOTEL"
 * eyebrow establishes this as the hero pick above the budget list below.
 */
export function FeaturedHotelSection({ hotel }: FeaturedHotelSectionProps) {
  return (
    <div className="grid grid-cols-1 gap-[clamp(24px,5vw,44px)] sm:grid-cols-[clamp(320px,44%,460px)_1fr] sm:items-start">
      {/* Image — constrained, gold hairline frame to tie into the palette */}
      <div className="relative overflow-hidden rounded-[1.5rem] border border-[rgba(199,164,93,0.5)] shadow-[0_24px_60px_rgba(122,46,52,0.14)]">
        <div className="relative h-[clamp(300px,58vw,420px)]">
          <DetailsImage
            src={detailsAsset(hotel.imageKey as DetailsAssetKey)}
            alt={hotel.imageAlt}
            fill
            priority
            quality={85}
            sizes="(max-width: 639px) 92vw, (max-width: 1023px) 44vw, 460px"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* Content — flows right on desktop, below on mobile */}
      <div className="flex flex-col">
        <p className="font-heading text-[11px] uppercase tracking-[0.34em] text-[color:var(--d-copper)]">
          {hotel.eyebrow}
        </p>

        <h3 className="mt-3 whitespace-pre-line font-heading font-semibold leading-[1.3] tracking-[0.06em] text-[color:var(--d-maroon)] text-[clamp(1.35rem,4vw,1.6rem)]">
          <a
            href={hotel.website.href}
            target="_blank"
            rel="noopener"
            className="text-inherit no-underline transition hover:text-[color:var(--d-terracotta)]"
          >
            {hotel.name}
          </a>
        </h3>

        <p className="mt-[clamp(16px,3vw,22px)] leading-[1.6] text-[color:var(--d-body)]">
          {hotel.body}
        </p>

        {/* Location + contact facts, grouped */}
        <div className="mt-[clamp(20px,3.5vw,28px)] space-y-[10px] text-[0.95rem] text-[color:var(--d-body-soft)]">
          <span className="flex items-center gap-[10px]">
            <MapPinIcon className="flex-none" />
            {hotel.location}
          </span>
          <span className="flex items-center gap-[10px]">
            <PhoneIcon className="flex-none" />
            <a
              href={`tel:${hotel.phone.replace(/[^\d+]/g, "")}`}
              className="text-[color:var(--d-terracotta)] no-underline hover:underline"
            >
              {hotel.phone}
            </a>
          </span>
          <span className="flex items-center gap-[10px]">
            <GlobeIcon className="flex-none" />
            <a
              href={hotel.website.href}
              target="_blank"
              rel="noopener"
              className="border-b border-[color:var(--d-terracotta)] text-[color:var(--d-terracotta)] no-underline"
            >
              {hotel.website.label}
            </a>
          </span>
        </div>

        {/* Rate overview trigger — answers "how much?" right before the reserve note */}
        {hotel.roomRates ? (
          <div className="mt-[clamp(24px,4vw,32px)]">
            <RoomRatesPopover rates={hotel.roomRates} />
          </div>
        ) : null}

        {/* CTA — or, while the booking link is down, a note to reserve through us */}
        <div className="mt-[clamp(16px,2.5vw,20px)]">
          {hotel.cta ? (
            <a
              href={hotel.cta.href}
              {...(hotel.cta.external ? { target: "_blank", rel: "noopener" } : {})}
              className="inline-flex min-h-[var(--btn-min-h)] items-center justify-center rounded-full bg-[color:var(--d-maroon)] px-[var(--btn-px)] py-[var(--btn-py)] text-center font-heading text-[11px] tracking-[0.16em] text-[color:var(--d-on-maroon)] no-underline shadow-[0_8px_22px_rgba(122,46,52,0.22)] transition hover:bg-[#8A3A40]"
            >
              {hotel.cta.label}
            </a>
          ) : hotel.bookingNote ? (
            <p className="leading-[1.6] text-[color:var(--d-body)]">
              {hotel.bookingNote.lead}{" "}
              {hotel.bookingNote.contacts.map((contact, i) => (
                <span key={contact.href}>
                  {i > 0 && " or "}
                  <a
                    href={contact.href}
                    className="whitespace-nowrap text-[color:var(--d-terracotta)] no-underline hover:underline"
                  >
                    {contact.display}
                  </a>
                </span>
              ))}{" "}
              {hotel.bookingNote.trail}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
