'use client'

import { Box, Flex } from '@chakra-ui/react'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '../../sanity/client'

interface LogoTextProps {
  logo: {
    asset: {
      _ref: string
    }
  }
  imageAltText: string
  logoPosition?: 'left' | 'right'
  bodyText: Array<Record<string, unknown>>
  backgroundColor?: string
  spacing?: {
    mobile?: {
      top?: number
      bottom?: number
    }
    web?: {
      top?: number
      bottom?: number
    }
  }
}

export function LogoTextSection({
  logo,
  imageAltText,
  logoPosition = 'right',
  bodyText,
  backgroundColor,
  spacing,
}: LogoTextProps) {
  const bgColor = backgroundColor || 'rgba(255, 255, 255, 0.9)'
  const isLogoLeft = logoPosition === 'left'

  const spacingStyle = spacing
    ? {
        pt:
          spacing.mobile?.top !== undefined && spacing.web?.top !== undefined
            ? { base: `${spacing.mobile.top}px`, md: `${spacing.web.top}px` }
            : spacing.mobile?.top !== undefined
            ? `${spacing.mobile.top}px`
            : spacing.web?.top !== undefined
            ? `${spacing.web.top}px`
            : undefined,
        pb:
          spacing.mobile?.bottom !== undefined && spacing.web?.bottom !== undefined
            ? { base: `${spacing.mobile.bottom}px`, md: `${spacing.web.bottom}px` }
            : spacing.mobile?.bottom !== undefined
            ? `${spacing.mobile.bottom}px`
            : spacing.web?.bottom !== undefined
            ? `${spacing.web.bottom}px`
            : undefined,
      }
    : {}

  return (
    <Box
      width="100%"
      bg={bgColor}
      px={{ base: '24px', md: '48px' }}
      {...spacingStyle}
      borderRadius="4px"
    >
      <Flex
        direction={{ base: 'column', md: 'row' }}
        py={{ base: '32px', md: '48px' }}
        gap="24px"
        alignItems={{ base: 'center', md: 'flex-start' }}
      >
        {isLogoLeft && (
          <Box
            position="relative"
            width="100px"
            height="100px"
            flexShrink={0}
            overflow="hidden"
            order={{ base: 1, md: 1 }}
          >
            <Image
              src={urlFor(logo).url()}
              alt={imageAltText}
              fill
              style={{
                objectFit: 'cover',
                objectPosition: '50% 50%',
              }}
            />
          </Box>
        )}

        <Box
          flex="1 0 0"
          order={{ base: 2, md: isLogoLeft ? 2 : 1 }}
          sx={{
            fontFamily: '"Host Grotesk", sans-serif',
            fontSize: '20px',
            fontWeight: 300,
            lineHeight: '1.5',
            color: '#1A1F16',
            textAlign: { base: 'left', md: isLogoLeft ? 'left' : 'right' },
            '& p': {
              mb: '16px',
              '&:last-child': {
                mb: 0,
              },
            },
          }}
        >
          <PortableText
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            value={bodyText as any}
          />
        </Box>

        {!isLogoLeft && (
          <Box
            position="relative"
            width="100px"
            height="100px"
            flexShrink={0}
            borderRadius="50%"
            overflow="hidden"
            border="2px solid"
            borderColor="#007fa1"
            order={{ base: 1, md: 2 }}
          >
            <Image
              src={urlFor(logo).url()}
              alt={imageAltText}
              fill
              style={{
                objectFit: 'cover',
                objectPosition: '50% 50%',
              }}
            />
          </Box>
        )}
      </Flex>
    </Box>
  )
}

