/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Box, Flex, Link as ChakraLink } from '@chakra-ui/react'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../../sanity/client'

interface ImageTextProps {
  image: {
    asset: {
      _ref: string
    }
  }
  imageAltText: string
  imagePosition: 'left' | 'right'
  title: string
  bodyText: any[]
  hyperlinkLabel?: string
  hyperlinkUrl?: string
  textBackgroundColor?: string
}

// Timeline separator graphic component (SVG pattern)
function TimelineSeparator() {
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <svg
        width="81"
        height="11"
        viewBox="0 0 81 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.353516 10.3535L5.35352 5.35352M10.3535 0.353516L5.35352 5.35352M5.35352 5.35352L10.3535 10.3535L0.353516 0.353516"
          stroke="#A3B18A"
        />
        <path
          d="M10.3535 10.3535L15.3535 5.35352M20.3535 0.353516L15.3535 5.35352M15.3535 5.35352L20.3535 10.3535L10.3535 0.353516"
          stroke="#A3B18A"
        />
        <path
          d="M20.3535 10.3535L25.3535 5.35352M30.3535 0.353516L25.3535 5.35352M25.3535 5.35352L30.3535 10.3535L20.3535 0.353516"
          stroke="#A3B18A"
        />
        <path
          d="M30.3535 10.3535L35.3535 5.35352M40.3535 0.353516L35.3535 5.35352M35.3535 5.35352L40.3535 10.3535L30.3535 0.353516"
          stroke="#A3B18A"
        />
        <path
          d="M40.3535 10.3535L45.3535 5.35352M50.3535 0.353516L45.3535 5.35352M45.3535 5.35352L50.3535 10.3535L40.3535 0.353516"
          stroke="#A3B18A"
        />
        <path
          d="M50.3535 10.3535L55.3535 5.35352M60.3535 0.353516L55.3535 5.35352M55.3535 5.35352L60.3535 10.3535L50.3535 0.353516"
          stroke="#A3B18A"
        />
        <path
          d="M60.3535 10.3535L65.3535 5.35352M70.3535 0.353516L65.3535 5.35352M65.3535 5.35352L70.3535 10.3535L60.3535 0.353516"
          stroke="#A3B18A"
        />
        <path
          d="M70.3535 10.3535L75.3535 5.35352M80.3535 0.353516L75.3535 5.35352M75.3535 5.35352L80.3535 10.3535L70.3535 0.353516"
          stroke="#A3B18A"
        />
      </svg>
    </Box>
  )
}

export function ImageTextSection({
  image,
  imageAltText,
  imagePosition,
  title,
  bodyText,
  hyperlinkLabel,
  hyperlinkUrl,
  textBackgroundColor,
}: ImageTextProps) {
  // Use custom color if provided, otherwise default to Light Beige from Figma design
  const bgColor = textBackgroundColor || '#FBFAF7'

  return (
    <Box>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="stretch"
      >
        {/* Image */}
        <Box
          flex="1 0 0"
          order={{ base: 1, md: imagePosition === 'left' ? 1 : 2 }}
          position="relative"
          height={{ base: '300px', md: '696px' }}
          minH={{ base: '300px', md: '696px' }}
        >
          <Image
            src={urlFor(image).url()}
            alt={imageAltText}
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>

        {/* Text Block */}
        <Box
          flex="1 0 0"
          order={{ base: 2, md: imagePosition === 'left' ? 2 : 1 }}
          bg={bgColor}
          px={{ base: '24px', md: '88px' }}
          py={{ base: '48px', md: '128px' }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
        >
          <Box display="flex" flexDirection="column" gap="32px" alignItems="flex-start">
            {/* Timeline Separator */}
            <Box display="flex" justifyContent="flex-start">
              <TimelineSeparator />
            </Box>

            {/* Title */}
            <Box
              maxW="628px"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { base: '40px', md: '64px' },
                fontWeight: 600,
                lineHeight: '0.9',
                color: '#2E4028',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              {title}
            </Box>

            {/* Body Text */}
            <Box
              sx={{
                fontFamily: '"Host Grotesk", sans-serif',
                fontSize: '20px',
                fontWeight: 300,
                lineHeight: '1.5',
                color: '#1A1F16',
                whiteSpace: 'pre-wrap',
                '& p': {
                  mb: '16px',
                  '&:last-child': {
                    mb: 0,
                  },
                },
              }}
            >
              <PortableText value={bodyText} />
            </Box>

            {/* CTA */}
            {hyperlinkLabel && hyperlinkUrl && (
              <Box>
                <ChakraLink
                  as={Link}
                  href={hyperlinkUrl}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#2E4028',
                    textTransform: 'uppercase',
                    letterSpacing: '1.92px',
                    lineHeight: 'normal',
                    textDecoration: 'none',
                    _hover: {
                      textDecoration: 'none',
                      opacity: 0.8,
                    },
                  }}
                >
                  {hyperlinkLabel}
                  <Box
                    as="span"
                    sx={{
                      display: 'inline-block',
                      width: '18.5px',
                      height: '8px',
                      position: 'relative',
                      flexShrink: 0,
                      '&::after': {
                        content: '"→"',
                        fontSize: '16px',
                        lineHeight: '8px',
                        display: 'block',
                        color: '#2E4028',
                      },
                    }}
                  />
                </ChakraLink>
              </Box>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

