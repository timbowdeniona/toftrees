import { ColorModeScript } from '@chakra-ui/react'
import { Provider } from './provider'
import themeConfig from '../theme/config'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ColorModeScript initialColorMode={themeConfig.initialColorMode} />
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}