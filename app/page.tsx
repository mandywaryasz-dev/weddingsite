import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-heading text-4xl text-ivory">Amanda & Dushyant</p>
      <p className="text-xl text-textMuted">Main wedding page (Phase 2) is coming soon.</p>
      <Link
        href="/save-the-date"
        className="rounded-full border border-gold px-6 py-3 font-heading text-sm uppercase tracking-[0.18em] text-gold transition hover:bg-gold hover:text-forest"
      >
        Enter Save The Date
      </Link>
    </main>
  );
}
