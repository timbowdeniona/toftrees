'use client'

import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { SaasProvider } from '@saas-ui/react'
import '@fontsource-variable/inter'

import components from './components'
import { fontSizes } from './foundations/typography'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        color: 'gray.900',
        bg: 'white',
        fontSize: 'lg',
        _dark: {
          color: 'white',
          bg: 'gray.900',
        },
      },
    }),
  },
  fonts: {
    heading: 'Inter Variable, Inter, sans-serif',
    body: 'Inter Variable, Inter, sans-serif',
  },
  fontSizes,
  components,
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <SaasProvider theme={theme}>{children}</SaasProvider>
}
