import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeContextProvider } from '@/context/context'

import LogIn from '@/components/logIn/logIn'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Compteur de passant VL/Pieton',
  description: 'Un compteur pour savoir si un secteur est fréquenté ou pas.',
}

// import { useState } from 'react'
export default function RootLayout({ children }) {

  // const [user, setUser] = useState

  return (
    <html lang="fr">
      <body className={inter.className}>
        <ThemeContextProvider>
          <LogIn />
          {children}
        </ThemeContextProvider>
      </body>
    </html>
  )
}
