"use client"
import Link from "next/link"
import { useThemeContext } from "@/context/context.jsx"


function index() {

    const { background, setBackground } = useThemeContext()


    return (
        <div style={{
            'background': background,
            'border': '3px solid black'
        }}>
            <Link href="/" className="btn btn-succes">Retour</Link>
            <button onClick={() => setBackground('red')}>Clic me !</button>
        </div>
    )
}

export default index
