import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'ojas-theme'
const ThemeContext = createContext(null)

function readStored() {
  if (typeof window === 'undefined') return null
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved === 'light' || saved === 'dark' ? saved : null
  } catch {
    /* private mode — treat it as "no choice made yet" */
    return null
  }
}

function systemTheme() {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/** Mirrors the inline script in index.html so the first paint already matches. */
function resolveInitialTheme() {
  return readStored() ?? systemTheme()
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(resolveInitialTheme)

  /**
   * True once the visitor has picked a theme themselves. Until then the site
   * keeps following the operating system, which is why the choice is only
   * written to storage on an explicit toggle.
   */
  const [chosen, setChosen] = useState(() => readStored() !== null)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    root.style.colorScheme = theme
  }, [theme])

  useEffect(() => {
    if (!chosen) return
    try {
      window.localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      /* nothing to persist to — the theme still applies for this session */
    }
  }, [theme, chosen])

  useEffect(() => {
    if (chosen) return undefined
    const query = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (event) => setTheme(event.matches ? 'dark' : 'light')
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [chosen])

  const chooseTheme = useCallback((next) => {
    if (next !== 'light' && next !== 'dark') return
    setChosen(true)
    setTheme(next)
  }, [])

  const toggleTheme = useCallback(() => {
    setChosen(true)
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  const value = useMemo(
    () => ({ theme, setTheme: chooseTheme, toggleTheme, isDark: theme === 'dark' }),
    [theme, chooseTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside <ThemeProvider>')
  return context
}
