/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Box, Container, Flex, Link as ChakraLink, VStack } from '@chakra-ui/react'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

// SVG Separator Pattern Component - Using background-image with data URI
function TextComponent2Separator() {
  // SVG icon as data URI - maintains original 11x10 size and repeats
  const svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none"><path d="M0.353554 10L5.35355 5M10.3536 0L5.35355 5M5.35355 5L10.3536 10L0.353554 0" stroke="#A3B18A"/></svg>'
  const svgPattern = encodeURIComponent(svgString)

  return (
    <Box 
      w="full"
      bg="transparent"
      overflow="hidden"
      position="relative"
      bottom="-10px"
      style={{
        backgroundImage: `url("data:image/svg+xml,${svgPattern}")`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: '11px 10px',
        backgroundPosition: '0 50%',
        height: '10px',
      }}
    />
  )
}

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
  containerPadding?: {
    mobile?: {
      top?: number
      bottom?: number
    }
    web?: {
      top?: number
      bottom?: number
    }
  }
  maxWidth?: number
  iconDecorator?: boolean
}

const backgroundColorMap = {
  white: '#FFFFFF',
  lightGreen: '#D2D8C5',
}

export function TextComponent2({
  title,
  column1,
  column2,
  backgroundColor = 'white',
  ctaLabel,
  ctaUrl,
  spacing,
  containerPadding,
  maxWidth,
  iconDecorator,
}: TextComponent2Props) {
  const bgColor = backgroundColorMap[backgroundColor]

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

  const containerPaddingStyle = containerPadding
    ? {
        pt:
          containerPadding.mobile?.top !== undefined && containerPadding.web?.top !== undefined
            ? { base: `${containerPadding.mobile.top}px`, md: `${containerPadding.web.top}px` }
            : containerPadding.mobile?.top !== undefined
            ? `${containerPadding.mobile.top}px`
            : containerPadding.web?.top !== undefined
            ? `${containerPadding.web.top}px`
            : undefined,
        pb:
          containerPadding.mobile?.bottom !== undefined && containerPadding.web?.bottom !== undefined
            ? { base: `${containerPadding.mobile.bottom}px`, md: `${containerPadding.web.bottom}px` }
            : containerPadding.mobile?.bottom !== undefined
            ? `${containerPadding.mobile.bottom}px`
            : containerPadding.web?.bottom !== undefined
            ? `${containerPadding.web.bottom}px`
            : undefined,
      }
    : {}

  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('TextComponent2 rendered:', {
      title,
      column1: column1 ? { hasTitle: !!column1.columnTitle, hasBody: !!column1.bodyText } : null,
      column2: column2 ? { hasTitle: !!column2.columnTitle, hasBody: !!column2.bodyText } : null,
      backgroundColor,
      ctaLabel,
      ctaUrl,
      containerPadding,
      containerPaddingStyle,
    })
  }

  return (
    <Box
      px={{ base: 6, md: 0 }}
      bg={bgColor}
      {...spacingStyle}
      position="relative"
    >
      <Container
        maxW={maxWidth ? `${maxWidth}px` : "container.xl"}
        px={0}
        {...containerPaddingStyle}
      >
        <VStack spacing={{ base: 4, md: '32px' }} align="stretch">
          {/* Title */}
          {title && (
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
          )}

          {/* Two Columns */}
          {(column1?.bodyText || column2?.bodyText) ? (
            <Flex
              direction={{ base: 'column', md: 'row' }}
              gap={{ base: 6, md: '64px' }}
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
                    <PortableText
                      value={column1.bodyText}
                      components={{
                        marks: {
                          fontSize: ({
                            children,
                            value,
                          }: {
                            children: React.ReactNode
                            value?: { web?: number; mobile?: number }
                          }) => {
                            const sx: Record<string, unknown> = {}

                            if (value?.web || value?.mobile) {
                              if (value.web && value.mobile) {
                                sx.fontSize = {
                                  base: `${value.mobile}px`,
                                  md: `${value.web}px`,
                                }
                              } else if (value.web) {
                                sx.fontSize = `${value.web}px`
                              } else if (value.mobile) {
                                sx.fontSize = `${value.mobile}px`
                              }
                            }

                            return (
                              <Box as="span" sx={sx}>
                                {children}
                              </Box>
                            )
                          },
                        },
                      }}
                    />
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
                    <PortableText
                      value={column2.bodyText}
                      components={{
                        marks: {
                          fontSize: ({
                            children,
                            value,
                          }: {
                            children: React.ReactNode
                            value?: { web?: number; mobile?: number }
                          }) => {
                            const sx: Record<string, unknown> = {}

                            if (value?.web || value?.mobile) {
                              if (value.web && value.mobile) {
                                sx.fontSize = {
                                  base: `${value.mobile}px`,
                                  md: `${value.web}px`,
                                }
                              } else if (value.web) {
                                sx.fontSize = `${value.web}px`
                              } else if (value.mobile) {
                                sx.fontSize = `${value.mobile}px`
                              }
                            }

                            return (
                              <Box as="span" sx={sx}>
                                {children}
                              </Box>
                            )
                          },
                        },
                      }}
                    />
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
      
      {/* Icon Decorator Separator */}
      {iconDecorator && (
        <Box position="absolute" bottom="0" left="0" right="0" w="full">
          <TextComponent2Separator />
        </Box>
      )}
    </Box>
  )
}

