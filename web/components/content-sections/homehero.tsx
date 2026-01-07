/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '../../sanity/client'

type HomeheroProps = {
  pageBreadcrumb?: string
  title?: string
  bodyText?: any[]
  backgroundImage?: any
  backgroundImageAltText?: string
  bannerColour?: string
}

export function Homehero({
  pageBreadcrumb,
  title,
  bodyText,
  backgroundImage,
  backgroundImageAltText,
  bannerColour,
}: HomeheroProps) {
  if (!title && !bodyText) return null

  const backgroundColor = bannerColour || '#e0e6db' // Default light green
  const textColor = '#1a4d3a' // Dark green for text

  return (
    <Box
      position="relative"
      w="full"
      bg={backgroundColor}
      minH="400px"
      display="flex"
      alignItems="center"
      overflow="hidden"
    >
      {/* Background Image Overlay */}
      {backgroundImage && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          opacity={0.15}
          zIndex={0}
        >
          <Image
            src={urlFor(backgroundImage).url()}
            alt={backgroundImageAltText || 'Background'}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </Box>
      )}

      {/* Content */}
      <Container
        maxW="container.xl"
        position="relative"
        zIndex={1}
        py={{ base: 12, sm: '120px' }}
      >
        <VStack spacing={6} textAlign="center">
          {/* Breadcrumb */}
          {pageBreadcrumb && (
            <Text
              fontSize="sm"
              color={textColor}
              textTransform="uppercase"
              letterSpacing="wide"
              fontWeight="medium"
              fontFamily="sans-serif"
            >
              {pageBreadcrumb}
            </Text>
          )}

          {/* Title */}
          {title && (
            <Heading
              as="h1"
              maxW="4xl"
              sx={{
                color: 'var(--Core-Green, #2E4028)',
                textAlign: 'center',
                fontFamily: '"Cormorant Garamond"',
                fontSize: { base: '40px', sm: '64px' },
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '90%',
              }}
            >
              {title}
            </Heading>
          )}

          {/* Body Text */}
          {bodyText && bodyText.length > 0 && (
            <Box
              maxW="2xl"
              sx={{
                color: 'var(--Core-Green, #2E4028)',
                textAlign: 'center',
                fontFamily: '"Host Grotesk"',
                fontSize: '18px',
                fontStyle: 'normal',
                fontWeight: 300,
                lineHeight: '150%',
              }}
            >
              <PortableText value={bodyText} />
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  )
}

