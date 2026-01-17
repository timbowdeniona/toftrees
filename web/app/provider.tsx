'use client'

import { Box } from '@chakra-ui/react'
import { ThemeProvider } from '../theme/provider'

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <Box mt={{ base: '64px', md: '120px' }}>
        {children}
      </Box>
    </ThemeProvider>
  )
}

