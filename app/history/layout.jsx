"use client"
import Link from "next/link";
import { useThemeContext } from "@/context/context.jsx"

export default function HistoryLayout({children }) {
  const { user, setUser } = useThemeContext()

  return (
    <>
    {user ?
      <section>
        <nav className="flex justify-around">
          <Link href="/" className="btn btn-succes">Retour</Link>
          <Link href="/stats" className="btn btn-succes">Stats</Link>
        </nav>
        {children}
      </section>
      
      :
      
      <section>
        <nav className="flex justify-around">
          <Link href="/" className="btn btn-succes">Retour</Link>
        </nav>
        {children}
      </section>
    }
    </>
    
  )
}
