import type { BudgetHotel } from "@/lib/details/types";

type BudgetHotelsSectionProps = {
  hotels: BudgetHotel[];
};

export function BudgetHotelsSection({ hotels }: BudgetHotelsSectionProps) {
  return (
    <div className="mt-[clamp(48px,8vw,64px)]">
      <h3 className="mb-[clamp(20px,4vw,28px)] font-heading text-[clamp(1.1rem,3vw,1.35rem)] tracking-[0.06em] text-[color:var(--d-maroon)]">
        Other Great Stays
      </h3>

      <p className="mb-[clamp(24px,5vw,32px)] leading-[1.6] text-[color:var(--d-body)]">
        If you&rsquo;d like something budget-friendly, these are all in Biltmore Village, a short drive from downtown:
      </p>

      <ul className="space-y-4">
        {hotels.map((hotel) => (
          <li
            key={hotel.name}
            className="border-b border-[color:var(--d-hairline)] pb-4 last:border-b-0 last:pb-0"
          >
            <a
              href={hotel.href}
              target="_blank"
              rel="noopener"
              className="font-heading text-[clamp(0.95rem,2.5vw,1.1rem)] tracking-[0.04em] text-[color:var(--d-terracotta)] no-underline hover:underline"
            >
              {hotel.name}
            </a>
            <p className="mt-1 text-[0.95rem] leading-[1.5] text-[color:var(--d-body-soft)]">
              {hotel.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
