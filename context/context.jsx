'use client'

import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext({})

export const ThemeContextProvider = ({ children }) => {
  
  const [background, setBackground] = useState('lightgreen')
  const [ user, setUser ] = useState(null)

  return (
    <ThemeContext.Provider value={{ user, setUser, background, setBackground }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => useContext(ThemeContext)