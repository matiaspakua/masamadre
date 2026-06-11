import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-6">Error · 404</p>
      <h1 className="display text-[clamp(3rem,12vw,8rem)]">
        Sobre<span className="italic text-levain">fermentada</span>
      </h1>
      <p className="mt-6 max-w-reading text-ink/75">
        Esta página subió demasiado y se vino abajo. Aquí no hay nada que
        hornear.
      </p>
      <Link
        href="/"
        className="mt-10 font-mono text-sm uppercase tracking-[0.2em] text-levain underline-offset-4 hover:underline"
      >
        ← Volver al fermento
      </Link>
    </main>
  );
}
