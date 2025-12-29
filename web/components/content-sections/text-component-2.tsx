/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Box, Container, Flex, Link as ChakraLink, VStack } from '@chakra-ui/react'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

interface ColumnData {
  columnTitle?: string
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  bodyText?: any[]
}

interface TextComponent2Props {
  title?: string
  column1?: ColumnData
  column2?: ColumnData
  backgroundColor?: 'white' | 'lightGreen'
  ctaLabel?: string
  ctaUrl?: string
}

const backgroundColorMap = {
  white: '#FFFFFF',
  lightGreen: '#A3B18A',
}

export function TextComponent2({
  title,
  column1,
  column2,
  backgroundColor = 'white',
  ctaLabel,
  ctaUrl,
}: TextComponent2Props) {
  const bgColor = backgroundColorMap[backgroundColor]

  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('TextComponent2 rendered:', {
      title,
      column1: column1 ? { hasTitle: !!column1.columnTitle, hasBody: !!column1.bodyText } : null,
      column2: column2 ? { hasTitle: !!column2.columnTitle, hasBody: !!column2.bodyText } : null,
      backgroundColor,
      ctaLabel,
      ctaUrl,
    })
  }

  return (
    <Box
      py={{ base: 8, md: 32 }}
      px={{ base: 6, md: 0 }}
      bg={bgColor}
    >
      <Container maxW="container.xl" px={0}>
        <VStack spacing={{ base: 4, md: 8 }} align="stretch">
          {/* Title */}
          {title && (
            <Box textAlign="center">
              <Box
                as="h2"
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: { base: '32px', md: '48px' },
                  fontWeight: 600,
                  lineHeight: '0.9',
                  color: '#1A1F16',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {title}
              </Box>
            </Box>
          )}

          {/* Two Columns */}
          {(column1?.bodyText || column2?.bodyText) ? (
            <Flex
              direction={{ base: 'column', md: 'row' }}
              gap={{ base: 6, md: 16 }}
              align="start"
            >
              {/* Column 1 */}
              {column1?.bodyText && (
                <Box flex="1 0 0" minW={0} w={{ base: 'full', md: 'auto' }}>
                  {column1.columnTitle && (
                    <Box
                      as={column1.headingLevel || 'h2'}
                      sx={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: { base: '24px', md: '32px' },
                        fontWeight: 600,
                        mb: { base: 4, md: 6 },
                        color: '#1A1F16',
                      }}
                    >
                      {column1.columnTitle}
                    </Box>
                  )}
                  <Box
                    sx={{
                      fontFamily: '"Host Grotesk", sans-serif',
                      fontSize: { base: '18px', md: '20px' },
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
                      '& a': {
                        color: '#1A1F16',
                        textDecoration: 'underline',
                        _hover: {
                          textDecoration: 'none',
                        },
                      },
                    }}
                  >
                    <PortableText value={column1.bodyText} />
                  </Box>
                </Box>
              )}

              {/* Column 2 */}
              {column2?.bodyText && (
                <Box flex="1 0 0" minW={0} w={{ base: 'full', md: 'auto' }}>
                  {column2.columnTitle && (
                    <Box
                      as={column2.headingLevel || 'h2'}
                      sx={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: { base: '24px', md: '32px' },
                        fontWeight: 600,
                        mb: { base: 4, md: 6 },
                        color: '#1A1F16',
                      }}
                    >
                      {column2.columnTitle}
                    </Box>
                  )}
                  <Box
                    sx={{
                      fontFamily: '"Host Grotesk", sans-serif',
                      fontSize: { base: '18px', md: '20px' },
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
                      '& a': {
                        color: '#1A1F16',
                        textDecoration: 'underline',
                        _hover: {
                          textDecoration: 'none',
                        },
                      },
                    }}
                  >
                    <PortableText value={column2.bodyText} />
                  </Box>
                </Box>
              )}
            </Flex>
          ) : (
            <Box color="gray.500" fontSize="sm" textAlign="center" py={8}>
              No content available. Please add content in Sanity Studio.
            </Box>
          )}

          {/* CTA */}
          {ctaLabel && ctaUrl && (
            <Box
              pt={{ base: 0, md: 0 }}
              display="flex"
              alignItems="center"
            >
              <ChakraLink
                as={Link}
                href={ctaUrl}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
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
                {ctaLabel}
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
        </VStack>
      </Container>
    </Box>
  )
}

