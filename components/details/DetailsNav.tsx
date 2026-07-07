import { clsx } from "clsx";

type DetailsNavProps = {
  /** True once the page has scrolled past the hero threshold. */
  scrolled: boolean;
  menuOpen: boolean;
  onOpenMenu: () => void;
};

/**
 * Fixed top nav. Transparent over the hero; frosted/blurred once scrolled
 * (plan §5.1). Presentational — scroll + menu state live in DetailsChrome.
 */
export function DetailsNav({ scrolled, menuOpen, onOpenMenu }: DetailsNavProps) {
  return (
    <nav
      className={clsx(
        "fixed left-0 top-0 z-[60] flex w-full items-center justify-between border-b px-[clamp(18px,5vw,46px)] py-[14px] transition-[background,border-color,box-shadow] duration-[400ms]",
        scrolled
          ? "border-[rgba(122,46,52,0.12)] bg-[rgba(250,246,238,0.92)] shadow-[0_6px_24px_rgba(122,46,52,0.06)] backdrop-blur-[10px]"
          : "border-transparent bg-transparent"
      )}
    >
      <a
        href="#top"
        className="font-heading text-[13px] font-semibold tracking-[0.22em] text-[color:var(--d-maroon)] no-underline"
      >
        D&nbsp;&amp;&nbsp;A
      </a>
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={menuOpen}
        aria-haspopup="dialog"
        onClick={onOpenMenu}
        className="flex min-h-[var(--btn-min-h)] items-center gap-[10px] border-none bg-transparent px-[4px] py-[8px] font-heading text-[11px] tracking-[0.2em] text-[color:var(--d-maroon)]"
      >
        <span>MENU</span>
        <span className="flex w-[22px] flex-col gap-[4px]">
          <span className="block h-[1.5px] w-full bg-[color:var(--d-maroon)]" />
          <span className="block h-[1.5px] w-[70%] bg-[color:var(--d-maroon)]" />
          <span className="block h-[1.5px] w-full bg-[color:var(--d-maroon)]" />
        </span>
      </button>
    </nav>
  );
}
