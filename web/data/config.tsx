import { Box } from '@chakra-ui/react'
import { NextSeoProps } from 'next-seo'

const siteConfig = {
  logo: () => <Box>Toftrees</Box>,
  seo: {
    title: 'Toftrees Churchyard',
    description: 'A history of the graves in the Toftrees churchyard in Norfolk.',
  } as NextSeoProps,
  termsUrl: '#',
  privacyUrl: '#',
  header: {
    links: [
      {
        id: 'home',
        label: 'Home',
        href: '/',
      },
      {
        id: 'graves',
        label: 'Graves',
        href: '/graves',
      },
      {
        id: 'history',
        label: 'Project History',
        href: '/history',
      },
    ],
  },
  footer: {
    copyright: (
      <>
        © 2025 Toftrees Churchyard Project
      </>
    ),
    links: [],
  },
}

export default siteConfig
