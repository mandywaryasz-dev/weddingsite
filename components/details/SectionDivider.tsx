/**
 * Gold-dot divider between the sections that share the paper backdrop
 * (Travel · Stay · Attire · FAQ). Decorative only. gold = #C29A60.
 */
export function SectionDivider() {
  return (
    <div
      aria-hidden
      className="mx-auto flex max-w-[520px] items-center justify-center gap-[16px] px-[clamp(20px,6vw,80px)]"
    >
      <span
        className="h-px flex-1"
        style={{ background: "linear-gradient(90deg,transparent,rgba(194,154,96,.55))" }}
      />
      <span className="h-[5px] w-[5px] rounded-full bg-[#C29A60] opacity-75" />
      <span
        className="h-px flex-1"
        style={{ background: "linear-gradient(90deg,rgba(194,154,96,.55),transparent)" }}
      />
    </div>
  );
}
