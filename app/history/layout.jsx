import Link from "next/link";

export default function HistoryLayout({
  children, // will be a page or nested layout
}) {
  return (
    <section>
      <nav className="flex justify-around">
        <Link href="/" className="btn btn-succes">Retour</Link>
        <Link href="/stats" className="btn btn-succes">Stats</Link>
      </nav>
      {children}
    </section>
  )
}
