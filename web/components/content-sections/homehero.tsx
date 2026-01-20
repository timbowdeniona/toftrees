/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '../../sanity/client'
import { useState } from 'react'

type HomeheroProps = {
  pageBreadcrumb?: string
  title?: string
  bodyText?: any[]
  backgroundImage?: any
  backgroundImageAltText?: string
  bannerColour?: string
  enableGraveSearch?: boolean
  searchPlaceholder?: string
  searchQuery?: string
  setSearchQuery?: (query: string) => void
}

export function Homehero({
  pageBreadcrumb,
  title,
  bodyText,
  backgroundImage,
  backgroundImageAltText,
  bannerColour,
  enableGraveSearch,
  searchPlaceholder,
  searchQuery: externalSearchQuery,
  setSearchQuery: externalSetSearchQuery,
}: HomeheroProps) {
  const [internalSearchQuery, setInternalSearchQuery] = useState('')
  
  // Use external search query if provided, otherwise use internal state
  const searchQuery = externalSearchQuery !== undefined ? externalSearchQuery : internalSearchQuery
  const setSearchQuery = externalSetSearchQuery || setInternalSearchQuery

  if (!title && !bodyText) return null

  const backgroundColor = bannerColour || '#e0e6db' // Default light green
  // If background is dark green (#2E4028), use white text; otherwise use Core Green
  const isDarkGreen = backgroundColor?.toUpperCase().replace('#', '') === '2E4028'
  const textColor = isDarkGreen ? '#FFFFFF' : 'var(--Core-Green, #2E4028)'
  const titleColor = isDarkGreen ? '#FFFFFF' : 'var(--Core-Green, #2E4028)'
  const bodyTextColor = isDarkGreen ? '#A3B18A' : 'var(--Core-Green, #2E4028)'

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    
    // Update search query (will trigger filter in list view)
    setSearchQuery(searchQuery.trim())
  }

  return (
    <Box
      position="relative"
      w="full"
      bg={backgroundColor}
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
        pt={{base: !enableGraveSearch ? '48px': '48px', sm: '120px'}}
        pb={{ base: !enableGraveSearch ? '48px' : '24px', sm: '120px' }}
        px={{ base: '24px', sm: 0 }}
      >
        <VStack spacing={0} align="center">
          {/* Breadcrumb */}
          {pageBreadcrumb && (
            <Text
              sx={{
                fontFamily: '"Host Grotesk", sans-serif',
                fontSize: '12px',
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: 'normal',
                letterSpacing: '1.44px',
                textTransform: 'uppercase',
                color: isDarkGreen ? '#A3B18A' : textColor,
                mb: { base: '20px', sm: '10px' },
              }}
            >
              {pageBreadcrumb}
            </Text>
          )}

          {/* Title and Body Text Group */}
          <VStack spacing={{ base: '24px', sm: '16px' }} align="center" textAlign="center">
            {/* Title */}
            {title && (
              <Heading
                as="h1"
                maxW="4xl"
                sx={{
                  color: titleColor,
                  textAlign: 'center',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: { base: '40px', sm: '64px' },
                  fontStyle: 'normal',
                  fontWeight: 600,
                  lineHeight: '90%',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {title}
              </Heading>
            )}

            {/* Body Text */}
            {bodyText && bodyText.length > 0 && (
              <Box
                maxW="800px"
                sx={{
                  color: isDarkGreen ? '#A3B18A' : bodyTextColor,
                  textAlign: 'center',
                  fontFamily: '"Host Grotesk", sans-serif',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: 300,
                  lineHeight: '150%',
                }}
              >
                <PortableText value={bodyText} />
              </Box>
            )}
                {/* Grave Search Section */}
          {enableGraveSearch && (
            <VStack spacing={4} w="full" maxW="520px">
              <Text
                sx={{
                  fontFamily: '"Host Grotesk", sans-serif',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  lineHeight: '150%',
                  color: '#FFF',
                }}
              >
                Find a grave
              </Text>
              <Box
                w="full"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                bg="white"
                border="1px solid rgba(0, 0, 0, 0.1)"
                borderRadius="2px"
                overflow="hidden"
              >
                <Box
                  as="input"
                  type="text"
                  placeholder={searchPlaceholder || 'Enter surname'}
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchQuery(e.target.value)
                  }}
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                      handleSearch()
                    }
                  }}
                  flex="1"
                  px="24px"
                  py="24px"
                  border="none"
                  outline="none"
                  bg="transparent"
                  sx={{
                    fontFamily: '"Host Grotesk", sans-serif',
                    fontSize: '18px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '150%',
                    color: '#000',
                    _placeholder: {
                      color: 'rgba(0, 0, 0, 0.30)',
                      fontFamily: '"Host Grotesk", sans-serif',
                      fontSize: { base: '16px', sm: '18px' },
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '150%',
                    },
                    '&:focus': {
                      outline: 'none',
                    },
                  }}
                />
                <Box
                  as="button"
                  onClick={handleSearch}
                  w="64px"
                  h="44px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="white"
                  border="none"
                  cursor="pointer"
                  _hover={{ bg: 'transparent' }}
                  _active={{ bg: 'transparent' }}
                >
                  <svg
                    width="19"
                    height="8"
                    viewBox="0 0 19 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect y="3.5" width="16" height="1" fill="#2E4028" />
                    <path
                      d="M18.5 4H18.3738M18.3738 4C16.2492 3.89744 12 2.95385 12 0M18.3738 4C16.2492 4.10256 12 5.04615 12 8"
                      stroke="#2E4028"
                      strokeWidth="1"
                    />
                  </svg>
                </Box>
              </Box>
            </VStack>
          )}
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

