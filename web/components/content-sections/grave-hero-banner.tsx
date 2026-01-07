'use client'

import { Box, Container, Flex, Text, VStack, IconButton } from '@chakra-ui/react'
import Image from 'next/image'
import { urlFor } from '../../sanity/client'
import { useState, useRef } from 'react'
import { Grave } from '../../types'
import Link from 'next/link'

interface GraveHeroBannerProps {
  grave: Grave
  moreInfoLink?: {
    label?: string
    url?: string
  }
  images?: Array<{
    image: {
      asset: {
        _ref: string
      }
    }
    imageAltText: string
  }>
  bannerColour?: string
}

export function GraveHeroBanner({
  grave,
  moreInfoLink,
  images,
  bannerColour = '#2E4028',
}: GraveHeroBannerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Get person name from grave data
  const getPersonName = (): string => {
    if (grave.persons && grave.persons.length > 0) {
      const firstPerson = grave.persons[0]
      if (firstPerson.name) {
        // Format as "LASTNAME, FIRSTNAME" if not already formatted
        const name = firstPerson.name.trim()
        if (name.includes(',')) {
          return name
        }
        const parts = name.split(/\s+/)
        if (parts.length > 1) {
          const lastName = parts[parts.length - 1]
          const firstName = parts.slice(0, -1).join(' ')
          return `${lastName}, ${firstName}`
        }
        return name
      }
    }
    return grave.familySurname || 'Unknown'
  }

  // Get buried date from first person
  const getBuriedDate = (): string | null => {
    if (grave.persons && grave.persons.length > 0) {
      const firstPerson = grave.persons[0]
      return firstPerson.dateBurial || null
    }
    return null
  }

  // Get all images (from config or fallback to headstone image)
  const allImages = (() => {
    if (images && images.length > 0) {
      return images.map((img) => ({
        image: img.image,
        alt: img.imageAltText,
      }))
    }
    if (grave.headstoneImage) {
      return [
        {
          image: grave.headstoneImage,
          alt: `Headstone for ${getPersonName()}`,
        },
      ]
    }
    return []
  })()

  const personName = getPersonName()
  const personNameLower = personName.toLowerCase()
  const buriedDate = getBuriedDate()
  const graveNo = grave.graveNo

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <Box bg={bannerColour} w="full" position="relative">
      <Container 
        maxW="container.xl" 
        px="0" 
        py="0"
      >
        <Flex 
          direction={{ base: 'column', md: 'row' }} 
          gap={{ base: '32px', md: '64px' }} 
          align="stretch"
          pl={{ base: 0, md: '88px' }}
          pr={{ base: 0, md: '64px' }}
        >
          {/* Left Side - Text Content */}
          <Flex
            flex="1"
            direction="column"
            justify="center"
            gap="10px"
            h={{ base: 'auto', md: '523px' }}
          >
            {/* Breadcrumb */}
            <Flex
              gap="16px"
              align="center"
              sx={{
                fontFamily: '"Host Grotesk", sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                color: '#A3B18A',
                textTransform: 'uppercase',
                letterSpacing: '1.44px',
              }}
            >
              <Text>Home</Text>
              <Text>/</Text>
              <Text>Graves</Text>
              <Text>/</Text>
              <Text>{personNameLower}</Text>
            </Flex>

            {/* Person Name */}
            <Text
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { base: '48px', md: '64px' },
                fontWeight: 600,
                lineHeight: '0.9',
                color: '#FFFFFF',
                whiteSpace: 'pre-wrap',
              }}
            >
              {personName}
            </Text>

            {/* Grave Information */}
            <VStack spacing="32px" align="stretch" mt="32px">
              <VStack spacing={0} align="stretch">
                {buriedDate && (
                  <Flex
                    justify="space-between"
                    align="start"
                    py="12px"
                    borderBottom="1px solid #A3B18A"
                  >
                    <Text
                      sx={{
                        fontFamily: '"Host Grotesk", sans-serif',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#A3B18A',
                      }}
                    >
                      Buried Date
                    </Text>
                    <Text
                      sx={{
                        fontFamily: '"Host Grotesk", sans-serif',
                        fontSize: '16px',
                        fontWeight: 400,
                        color: '#A3B18A',
                      }}
                    >
                      {buriedDate}
                    </Text>
                  </Flex>
                )}
                {graveNo && (
                  <Flex
                    justify="space-between"
                    align="start"
                    py="12px"
                    borderBottom="1px solid #A3B18A"
                  >
                    <Text
                      sx={{
                        fontFamily: '"Host Grotesk", sans-serif',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#A3B18A',
                      }}
                    >
                      Grave #
                    </Text>
                    <Text
                      sx={{
                        fontFamily: '"Host Grotesk", sans-serif',
                        fontSize: '16px',
                        fontWeight: 400,
                        color: '#A3B18A',
                      }}
                    >
                      {graveNo}
                    </Text>
                  </Flex>
                )}
              </VStack>

              {/* More Info Link */}
              {moreInfoLink?.url && (
                <Box as={Link} href={moreInfoLink.url} _hover={{ opacity: 0.8 }}>
                  <VStack spacing="4px" align="center" w="fit-content">
                    <Text
                      sx={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: '18px',
                        fontWeight: 600,
                        color: '#A3B18A',
                        textTransform: 'uppercase',
                        letterSpacing: '2.16px',
                      }}
                    >
                      {moreInfoLink.label || 'More info'}
                    </Text>
                    <Box h="1px" w="full" bg="#A3B18A" />
                  </VStack>
                </Box>
              )}
            </VStack>
          </Flex>

          {/* Right Side - Image Carousel */}
          {allImages.length > 0 && (
            <Box
              flex="1"
              position="relative"
              h={{ base: '300px', md: '523px' }}
            >
              {allImages.length === 1 ? (
                // Single image - no carousel
                <Box position="relative" w="full" h="full">
                  <Image
                    src={urlFor(allImages[0].image).url()}
                    alt={allImages[0].alt}
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                  />
                </Box>
              ) : (
                // Multiple images - carousel with layout
                <>
                  <Box
                    ref={carouselRef}
                    position="relative"
                    w="full"
                    h="full"
                    overflow="hidden"
                  >
                    {allImages.map((img, index) => (
                      <Box
                        key={index}
                        position="absolute"
                        top={0}
                        left={0}
                        w="full"
                        h="full"
                        opacity={index === currentImageIndex ? 1 : 0}
                        transition="opacity 0.3s ease"
                        pointerEvents={index === currentImageIndex ? 'auto' : 'none'}
                      >
                        <Flex gap="8px" h="full">
                          {/* Large image on left */}
                          <Box
                            flex="1"
                            position="relative"
                            h="full"
                            minW="0"
                          >
                            <Image
                              src={urlFor(img.image).url()}
                              alt={img.alt}
                              fill
                              style={{
                                objectFit: 'cover',
                                objectPosition: 'center',
                              }}
                            />
                          </Box>
                          {/* Two smaller images on right */}
                          <Flex
                            direction="column"
                            gap="8px"
                            w="394px"
                            flexShrink={0}
                            h="full"
                          >
                            {/* Top small image */}
                            <Box
                              flex="1"
                              position="relative"
                              minH="0"
                            >
                              <Image
                                src={urlFor(
                                  allImages[(index + 1) % allImages.length]?.image || img.image
                                ).url()}
                                alt={allImages[(index + 1) % allImages.length]?.alt || img.alt}
                                fill
                                style={{
                                  objectFit: 'cover',
                                  objectPosition: 'center',
                                }}
                              />
                            </Box>
                            {/* Bottom small image */}
                            <Box
                              flex="1"
                              position="relative"
                              minH="0"
                            >
                              <Image
                                src={urlFor(
                                  allImages[(index + 2) % allImages.length]?.image || img.image
                                ).url()}
                                alt={allImages[(index + 2) % allImages.length]?.alt || img.alt}
                                fill
                                style={{
                                  objectFit: 'cover',
                                  objectPosition: 'center',
                                }}
                              />
                            </Box>
                          </Flex>
                        </Flex>
                      </Box>
                    ))}
                  </Box>

                  {/* Carousel Controls */}
                  <Flex
                    position="absolute"
                    bottom="16px"
                    right="16px"
                    gap="8px"
                    zIndex={10}
                  >
                    <IconButton
                      aria-label="Previous image"
                      icon={
                        <Box
                          w="18.5px"
                          h="8px"
                          position="relative"
                          transform="rotate(180deg)"
                        >
                          <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                            w="18.5px"
                            h="1px"
                            bg="white"
                            _before={{
                              content: '""',
                              position: 'absolute',
                              right: 0,
                              top: '50%',
                              transform: 'translateY(-50%) rotate(45deg)',
                              w: '6px',
                              h: '1px',
                              bg: 'white',
                            }}
                            _after={{
                              content: '""',
                              position: 'absolute',
                              right: 0,
                              top: '50%',
                              transform: 'translateY(-50%) rotate(-45deg)',
                              w: '6px',
                              h: '1px',
                              bg: 'white',
                            }}
                          />
                        </Box>
                      }
                      onClick={handlePrevious}
                      bg="white"
                      opacity={0.5}
                      _hover={{ opacity: 0.8 }}
                      size="44px"
                      borderRadius="0"
                    />
                    <IconButton
                      aria-label="Next image"
                      icon={
                        <Box w="18.5px" h="8px" position="relative">
                          <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                            w="18.5px"
                            h="1px"
                            bg="white"
                            _before={{
                              content: '""',
                              position: 'absolute',
                              right: 0,
                              top: '50%',
                              transform: 'translateY(-50%) rotate(45deg)',
                              w: '6px',
                              h: '1px',
                              bg: 'white',
                            }}
                            _after={{
                              content: '""',
                              position: 'absolute',
                              right: 0,
                              top: '50%',
                              transform: 'translateY(-50%) rotate(-45deg)',
                              w: '6px',
                              h: '1px',
                              bg: 'white',
                            }}
                          />
                        </Box>
                      }
                      onClick={handleNext}
                      bg="white"
                      _hover={{ opacity: 0.8 }}
                      size="44px"
                      borderRadius="0"
                    />
                  </Flex>
                </>
              )}
            </Box>
          )}

          {/* Mobile Image Carousel */}
          {allImages.length > 0 && (
            <Box
              position="relative"
              w="full"
              h="300px"
              display={{ base: 'block', md: 'none' }}
            >
              {allImages.length === 1 ? (
                // Single image - no carousel
                <Box position="relative" w="full" h="full" borderRadius="4px">
                  <Image
                    src={urlFor(allImages[0].image).url()}
                    alt={allImages[0].alt}
                    fill
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              ) : (
                // Multiple images - carousel
                <>
                  <Box
                    ref={carouselRef}
                    position="relative"
                    w="full"
                    h="full"
                    overflow="hidden"
                    borderRadius="4px"
                  >
                    {allImages.map((img, index) => (
                      <Box
                        key={index}
                        position="absolute"
                        top={0}
                        left={0}
                        w="full"
                        h="full"
                        opacity={index === currentImageIndex ? 1 : 0}
                        transition="opacity 0.3s ease"
                        pointerEvents={index === currentImageIndex ? 'auto' : 'none'}
                      >
                        <Image
                          src={urlFor(img.image).url()}
                          alt={img.alt}
                          fill
                          style={{
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                    ))}
                  </Box>

                  {/* Mobile Carousel Controls */}
                  <Flex
                    position="absolute"
                    bottom="16px"
                    right="16px"
                    gap="8px"
                    zIndex={10}
                  >
                    <IconButton
                      aria-label="Previous image"
                      icon={
                        <Box
                          w="18.5px"
                          h="8px"
                          position="relative"
                          transform="rotate(180deg)"
                        >
                          <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                            w="18.5px"
                            h="1px"
                            bg="white"
                            _before={{
                              content: '""',
                              position: 'absolute',
                              right: 0,
                              top: '50%',
                              transform: 'translateY(-50%) rotate(45deg)',
                              w: '6px',
                              h: '1px',
                              bg: 'white',
                            }}
                            _after={{
                              content: '""',
                              position: 'absolute',
                              right: 0,
                              top: '50%',
                              transform: 'translateY(-50%) rotate(-45deg)',
                              w: '6px',
                              h: '1px',
                              bg: 'white',
                            }}
                          />
                        </Box>
                      }
                      onClick={handlePrevious}
                      bg="white"
                      opacity={0.5}
                      _hover={{ opacity: 0.8 }}
                      size="44px"
                      borderRadius="0"
                    />
                    <IconButton
                      aria-label="Next image"
                      icon={
                        <Box w="18.5px" h="8px" position="relative">
                          <Box
                            position="absolute"
                            top="50%"
                            left="50%"
                            transform="translate(-50%, -50%)"
                            w="18.5px"
                            h="1px"
                            bg="white"
                            _before={{
                              content: '""',
                              position: 'absolute',
                              right: 0,
                              top: '50%',
                              transform: 'translateY(-50%) rotate(45deg)',
                              w: '6px',
                              h: '1px',
                              bg: 'white',
                            }}
                            _after={{
                              content: '""',
                              position: 'absolute',
                              right: 0,
                              top: '50%',
                              transform: 'translateY(-50%) rotate(-45deg)',
                              w: '6px',
                              h: '1px',
                              bg: 'white',
                            }}
                          />
                        </Box>
                      }
                      onClick={handleNext}
                      bg="white"
                      _hover={{ opacity: 0.8 }}
                      size="44px"
                      borderRadius="0"
                    />
                  </Flex>
                </>
              )}
            </Box>
          )}
        </Flex>
      </Container>
    </Box>
  )
}

