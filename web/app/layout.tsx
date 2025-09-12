import { ColorModeScript } from '@chakra-ui/react'
import themeConfig from '#theme'
import { Provider } from './provider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const colorMode = themeConfig.config.initialColorMode

  return (
    <html lang="en" data-theme={colorMode} style={{ colorScheme: colorMode }}>
      <head />
      <body className={`chakra-ui-${colorMode}`}>
        <ColorModeScript initialColorMode={colorMode} />
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}