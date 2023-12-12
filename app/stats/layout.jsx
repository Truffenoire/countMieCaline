import Link from "next/link";

export default function StatsLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      <nav>
        <Link href="/" className="btn btn-succes">Retour</Link>
      </nav>
      {children}
    </section>
  )
}
