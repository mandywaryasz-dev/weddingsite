import type { Airport } from "@/lib/details/types";

type AirportRowProps = {
  airport: Airport;
};

export function AirportRow({ airport }: AirportRowProps) {
  return (
    <div className="grid grid-cols-[clamp(72px,17vw,104px)_1fr] items-center gap-[clamp(16px,4vw,30px)] border-t border-[color:var(--d-hairline)] px-[2px] py-[clamp(22px,3.4vw,28px)] first:border-t-0">
      <span className="font-heading font-semibold leading-none tracking-[0.1em] text-[color:var(--d-gold)] text-[clamp(1.35rem,4vw,1.9rem)]">
        {airport.code}
      </span>
      <div>
        <h3 className="m-0 flex flex-wrap items-center gap-[10px] font-heading font-semibold tracking-[0.04em] text-[color:var(--d-maroon)] text-[clamp(1rem,2.6vw,1.18rem)]">
          {airport.name}
          {airport.closest ? (
            <span className="whitespace-nowrap rounded-full bg-[color:var(--d-terracotta)] px-[10px] py-[4px] font-heading text-[9px] tracking-[0.14em] text-[#FBF7EF]">
              CLOSEST
            </span>
          ) : null}
        </h3>
        <p className="mt-[6px] leading-[1.5] text-[color:var(--d-body-muted)] text-[clamp(1.02rem,2.5vw,1.14rem)]">
          {airport.detail}
        </p>
      </div>
    </div>
  );
}
