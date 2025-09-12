import { extendTheme } from '@chakra-ui/react'
import '@fontsource-variable/inter'

import components from './components'
import { fontSizes } from './foundations/typography'

const themeConfig = {
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
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
}

export default themeConfig
