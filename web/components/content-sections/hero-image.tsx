/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Box, Container } from '@chakra-ui/react'
import Image from 'next/image'
import { urlFor } from '../../sanity/client'

type HeroImageProps = {
  heroBackgroundImage?: any
  heroImageAltText: string
  overlayIconImage?: any
  overlayIconAltText?: string
}

export function HeroImageSection({
  heroBackgroundImage,
  heroImageAltText,
  overlayIconImage,
  overlayIconAltText,
}: HeroImageProps) {
  if (!heroBackgroundImage) return null

  return (
    <Box position="relative" w="full" bg="gray.50" _dark={{ bg: 'gray.900' }}>
      <Container maxW="container.2xl" px={{ base: 4, md: 8 }} py={{ base: 6, md: 10 }}>
        <Box position="relative" overflow="hidden" rounded="xl">
          <Image
            src={urlFor(heroBackgroundImage).url()}
            alt={heroImageAltText}
            width={1600}
            height={600}
            style={{ width: '100%', height: 'auto' }}
            priority
          />

          {overlayIconImage && (
            <Box
              position="absolute"
              bottom={{ base: 4, md: 8 }}
              left={{ base: 4, md: 8 }}
              bg="rgba(0,0,0,0.55)"
              _dark={{ bg: 'rgba(0,0,0,0.7)' }}
              p={{ base: 3, md: 4 }}
              rounded="lg"
            >
              <Image
                src={urlFor(overlayIconImage).url()}
                alt={overlayIconAltText || 'Overlay icon'}
                width={96}
                height={96}
                style={{ width: '64px', height: '64px', objectFit: 'contain' }}
              />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  )
}

