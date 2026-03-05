import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
      <Image
        src="/images/explore-bg.png"
        alt=""
        fill
        priority
        quality={85}
        unoptimized
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/45" aria-hidden />

      <section className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center gap-6 py-16 text-silver/90">
        <h1 className="font-heading text-display uppercase tracking-display">
          AMANDA &amp; DUSHYANT
        </h1>

        <p className="font-heading text-body-sm tracking-heading text-silver/80">
          October 2026 • Asheville, North Carolina
        </p>

        <div className="mt-2 space-y-2">
          <p className="font-body text-body-sm text-silver/80">Our wedding celebration is on the horizon.</p>
          <p className="font-body text-body-sm text-silver/80">Details for the full weekend experience will be shared soon.</p>
        </div>

        <p className="mt-2 font-body text-body-sm text-silver/80">In the meantime…</p>

        <Link
          href="/save-the-date"
          className="mt-2 inline-block min-h-[var(--btn-min-h)] rounded-full border border-silver/25 bg-black/40 px-[var(--btn-px)] py-[var(--btn-py)] font-body text-button text-silver/90 shadow-[0_4px_24px_rgba(0,0,0,0.35)] backdrop-blur-md transition hover:bg-white/15"
        >
          SAVE THE DATE
        </Link>
      </section>
    </main>
  );
}
