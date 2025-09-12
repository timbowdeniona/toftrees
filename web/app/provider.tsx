'use client'

import { SaasProvider } from '@saas-ui/react'
import { extendTheme } from '@chakra-ui/react'
import themeConfig from '#theme'

const theme = extendTheme(themeConfig)

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SaasProvider theme={theme}>
      {children}
    </SaasProvider>
  )
}

