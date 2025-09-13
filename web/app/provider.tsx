'use client'

import { ThemeProvider } from '../theme/provider'

export function Provider({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>
}

