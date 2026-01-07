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
    <Box position="relative" w="full">
      <Box maxW="container.2xl">
        <Box position="relative" overflow="hidden">
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
              right={{ base: 4, md: '88px' }}
              rounded="lg"
            >
              <Image
                src={urlFor(overlayIconImage).url()}
                alt={overlayIconAltText || 'Overlay icon'}
                width={150}
                height={150}
                style={{ width: '150px', height: '150px', objectFit: 'contain' }}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

