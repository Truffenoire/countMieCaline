import { Inter } from 'next/font/google'
import './globals.css'
import LogIn from '@/components/logIn/logIn'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Compteur de passant VL/Pieton',
  description: 'Un compteur pour savoir si un secteur est fréquenté ou pas.',
}

export default function RootLayout({ children }) {

  return (
    <html lang="fr">
      <body className={inter.className}>
        <LogIn />
        {children}
      </body>
    </html>
  )
}
