import { ColorModeScript } from '@chakra-ui/react'
import { Provider } from './provider'
import themeConfig from '../theme/config'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=Host+Grotesk:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ColorModeScript initialColorMode={themeConfig.initialColorMode} />
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}