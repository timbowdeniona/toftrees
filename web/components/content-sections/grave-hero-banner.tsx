'use client'

import { Box, Container, Flex, Text, VStack, IconButton } from '@chakra-ui/react'
import Image from 'next/image'
import { urlFor } from '../../sanity/client'
import { useState, useRef } from 'react'
import { Grave } from '../../types'
import Link from 'next/link'

// Arrow icon component for slider
function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="19"
      height="8"
      viewBox="0 0 19 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: direction === 'left' ? 'rotate(180deg)' : 'none' }}
    >
      <path
        d="M18.3536 4.35355C18.5488 4.15829 18.5488 3.84171 18.3536 3.64645L15.1716 0.464466C14.9763 0.269204 14.6597 0.269204 14.4645 0.464466C14.2692 0.659728 14.2692 0.976311 14.4645 1.17157L17.2929 4L14.4645 6.82843C14.2692 7.02369 14.2692 7.34027 14.4645 7.53553C14.6597 7.7308 14.9763 7.7308 15.1716 7.53553L18.3536 4.35355ZM0 4.5H18V3.5H0V4.5Z"
        fill="#2E4028"
      />
    </svg>
  )
}

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

  // Calculate scroll position for mobile carousel
  // First image: 149px, others: 260px, gap: 8px
  const calculateMobileScrollPosition = () => {
    if (currentImageIndex === 0) return 0
    // First image width + gap + (currentIndex - 1) * (other image width + gap)
    return 149 + 8 + (currentImageIndex - 1) * (260 + 8)
  }
  
  const mobileScrollPosition = calculateMobileScrollPosition()

  // Calculate layout based on number of images
  const hasImages = allImages.length > 0
  const hasMoreThanTwoImages = allImages.length > 2
  
  // Text flex: 50% if 1-2 images, 33.333% if more than 2 images, full width if no images
  const textFlex = hasImages 
    ? (hasMoreThanTwoImages ? '0 0 33.333%' : '0 0 50%')
    : '1'
  
  // Image flex: 50% if 1-2 images, 66.666% if more than 2 images
  const imageFlex = hasMoreThanTwoImages ? '0 0 66.666%' : '0 0 50%'
  
  // Text alignment: center if no images, left if has images
  const textAlign = hasImages ? { base: 'center', sm: 'flex-start' } : { base: 'center', sm: 'center' }
  const textJustify = hasImages ? { base: 'flex-start', sm: 'center' } : { base: 'flex-start', sm: 'center' }
  const textMaxW = hasImages ? 'none' : { base: 'full', sm: 'container.xl' }
  const textMx = hasImages ? '0' : { base: '0', sm: 'auto' }

  return (
    <Box bg={bannerColour} w="full" position="relative">
      <Box 
        position="relative"
        py={{ base: '48px', sm: '64px' }}
        w="full"
        px={0}
      >
        <Flex 
          direction={{ base: 'column', sm: 'row' }} 
          gap={0}
          align="stretch"
          justify={hasImages ? 'flex-start' : 'center'}
          w="full"
        >
          {/* Text Content - First on Mobile */}
          <Flex
            flex={{ base: '1', sm: textFlex }}
            direction="column"
            justify={textJustify}
            align={textAlign}
            gap={0}
            minH={{ base: 'auto', sm: '523px' }}
            h={{ base: 'auto', sm: '523px' }}
            pl={{ base: '24px', sm: '88px' }}
            pr={{ base: '24px', sm: hasImages ? '64px' : '88px' }}
            py={0}
            maxW={textMaxW}
            mx={textMx}
            w={{ base: 'full', sm: hasImages ? 'auto' : 'full' }}
          >
            {/* Breadcrumb */}
            <Flex
              gap={{ base: 2, sm: 4 }}
              align="center"
              justify={{ base: 'center', sm: hasImages ? 'flex-start' : 'center' }}
              flexWrap="wrap"
              mb={{ base: '16px', sm: '32px' }}
            >
              <Box
                as={Link}
                href="/"
                _hover={{ opacity: 0.8 }}
                transition="opacity 0.2s ease"
              >
                <Text
                  sx={{
                    fontFamily: '"Host Grotesk", sans-serif',
                    fontSize: '12px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    color: '#A3B18A',
                    textTransform: 'uppercase',
                    letterSpacing: '1.44px',
                    lineHeight: 'normal',
                  }}
                >
                  HOME
                </Text>
              </Box>
              <Text
                sx={{
                  fontFamily: '"Host Grotesk", sans-serif',
                  fontSize: '12px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  color: '#A3B18A',
                  textTransform: 'uppercase',
                  letterSpacing: '1.44px',
                  lineHeight: 'normal',
                }}
              >
                /
              </Text>
              <Box
                as={Link}
                href="/graves"
                _hover={{ opacity: 0.8 }}
                transition="opacity 0.2s ease"
              >
                <Text
                  sx={{
                    fontFamily: '"Host Grotesk", sans-serif',
                    fontSize: '12px',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    color: '#A3B18A',
                    textTransform: 'uppercase',
                    letterSpacing: '1.44px',
                    lineHeight: 'normal',
                  }}
                >
                  GRAVES
                </Text>
              </Box>
              <Text
                sx={{
                  fontFamily: '"Host Grotesk", sans-serif',
                  fontSize: '12px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  color: '#A3B18A',
                  textTransform: 'uppercase',
                  letterSpacing: '1.44px',
                  lineHeight: 'normal',
                }}
              >
                /
              </Text>
              <Text
                sx={{
                  fontFamily: '"Host Grotesk", sans-serif',
                  fontSize: '12px',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  color: '#A3B18A',
                  textTransform: 'uppercase',
                  letterSpacing: '1.44px',
                  lineHeight: 'normal',
                }}
              >
                {personName.toUpperCase()}
              </Text>
            </Flex>

            {/* Person Name */}
            <Text
              as="h1"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { base: '40px', sm: '64px' },
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: { base: '1.1', sm: '0.9' },
                color: '#FFFFFF',
                whiteSpace: 'pre-wrap',
                textAlign: { base: 'center', sm: hasImages ? 'left' : 'center' },
                mt: 0,
                mb: 0,
              }}
            >
              {personName}
            </Text>

            {/* Grave Information */}
            <VStack 
              spacing={0} 
              align={{ base: 'center', sm: hasImages ? 'stretch' : 'center' }} 
              mt={{ base: '16px', sm: '32px' }}
              w="full"
            >
              <VStack spacing={0} align={{ base: 'center', sm: hasImages ? 'stretch' : 'center' }} w="full">
                {buriedDate && (
                  <>
                    <Box
                      w="full"
                      borderTop="1px solid rgba(163, 177, 138, 0.3)"
                    />
                    <Flex
                      justify="space-between"
                      align="start"
                      py={{ base: '12px', sm: '12px' }}
                      borderBottom="1px solid rgba(163, 177, 138, 0.3)"
                      gap={{ base: '8px', sm: 0 }}
                      w="full"
                      direction="row"
                    >
                      <Text
                        sx={{
                          fontFamily: '"Host Grotesk", sans-serif',
                          fontSize: {base: '18px', md: '16px'},
                          fontStyle: 'normal',
                          fontWeight: 600,
                          color: '#A3B18A',
                          flexShrink: 0,
                          lineHeight: 'normal',
                          textAlign: 'left',
                        }}
                      >
                        Buried Date
                      </Text>
                      <Text
                        sx={{
                          fontFamily: '"Host Grotesk", sans-serif',
                          fontSize: {base: '18px', md: '16px'},
                          fontStyle: 'normal',
                          fontWeight: 400,
                          color: '#A3B18A',
                          textAlign: 'right',
                          lineHeight: 'normal',
                        }}
                      >
                        {buriedDate}
                      </Text>
                    </Flex>
                  </>
                )}
                {graveNo && (
                  <>
                    {!buriedDate && (
                      <Box
                        w="full"
                        borderTop="1px solid rgba(163, 177, 138, 0.3)"
                      />
                    )}
                    <Flex
                      justify="space-between"
                      align="start"
                      py={{ base: '12px', sm: '12px' }}
                      borderBottom="1px solid rgba(163, 177, 138, 0.3)"
                      gap={{ base: '8px', sm: 0 }}
                      w="full"
                      direction="row"
                    >
                      <Text
                        sx={{
                          fontFamily: '"Host Grotesk", sans-serif',
                          fontSize: {base: '18px', md: '16px'},
                          fontStyle: 'normal',
                          fontWeight: 600,
                          color: '#A3B18A',
                          flexShrink: 0,
                          lineHeight: 'normal',
                          textAlign: 'left',
                        }}
                      >
                        Grave #
                      </Text>
                      <Text
                        sx={{
                          fontFamily: '"Host Grotesk", sans-serif',
                          fontSize: {base: '18px', md: '16px'},
                          fontStyle: 'normal',
                          fontWeight: 400,
                          color: '#A3B18A',
                          textAlign: 'right',
                          lineHeight: 'normal',
                        }}
                      >
                        {graveNo}
                      </Text>
                    </Flex>
                  </>
                )}
              </VStack>

              {/* More Info Link */}
              {moreInfoLink?.url && (
                <>
                  <Box
                    w={{ base: 'full', sm: 'auto' }}
                    borderTop="1px solid rgba(163, 177, 138, 0.3)"
                    mt={{ base: '0px', sm: '0px' }}
                  />
                  <Box 
                    as={Link} 
                    href={moreInfoLink.url} 
                    _hover={{ opacity: 0.8 }}
                    transition="opacity 0.2s ease"
                    py={{ base: '12px', sm: '12px' }}
                    w={{ base: 'full', sm: 'auto' }}
                  >
                    <Text
                      sx={{
                        fontFamily: '"Host Grotesk", sans-serif',
                        fontSize: { base: '16px', sm: '18px' },
                        fontStyle: 'normal',
                        fontWeight: 600,
                        color: '#A3B18A',
                        textTransform: 'uppercase',
                        letterSpacing: { base: '1.92px', sm: '2.16px' },
                        lineHeight: 'normal',
                        textAlign: { base: 'center', sm: hasImages ? 'left' : 'center' },
                        textDecoration: 'underline',
                      }}
                    >
                      {moreInfoLink.label ? moreInfoLink.label.toUpperCase() : 'MORE INFO'}
                    </Text>
                  </Box>
                </>
              )}
            </VStack>
          </Flex>

          {/* Desktop: Right Side - Image Carousel */}
          {allImages.length > 0 && (
            <Box
              display={{ base: 'none', sm: 'block' }}
              flex={{ base: '1', sm: imageFlex }}
              position="relative"
              h="523px"
              w="auto"
            >
              {allImages.length === 1 ? (
                // Single image - no carousel
                <Box 
                  position="relative" 
                  w="full" 
                  h="full" 
                  overflow="hidden"
                >
                  <Image
                    src={urlFor(allImages[0].image).url()}
                    alt={allImages[0].alt}
                    fill
                    priority
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
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
                        transition="opacity 0.3s ease-in-out"
                        pointerEvents={index === currentImageIndex ? 'auto' : 'none'}
                        zIndex={index === currentImageIndex ? 1 : 0}
                      >
                        {/* Desktop: Multi-image layout */}
                        <Flex gap="8px" h="full">
                          {/* Large image on left */}
                          <Box
                            flex="1"
                            position="relative"
                            h="full"
                            minW="0"
                            overflow="hidden"
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
                              overflow="hidden"
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
                              overflow="hidden"
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

                  {/* Desktop Carousel Controls */}
                  {allImages.length > 1 && (
                    <Flex
                      position="absolute"
                      bottom="16px"
                      right="16px"
                      gap={2}
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
                        bg="rgba(255, 255, 255, 0.5)"
                        _hover={{ bg: 'rgba(255, 255, 255, 0.9)', opacity: 1 }}
                        size="44px"
                        borderRadius="0"
                        transition="all 0.2s ease"
                      />
                      <IconButton
                        aria-label="Next image"
                        icon={
                          <Box 
                            w="18.5px" 
                            h="8px" 
                            position="relative"
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
                        onClick={handleNext}
                        bg="rgba(255, 255, 255, 0.5)"
                        _hover={{ bg: 'rgba(255, 255, 255, 0.9)', opacity: 1 }}
                        size="44px"
                        borderRadius="0"
                        transition="all 0.2s ease"
                      />
                    </Flex>
                  )}
                </>
              )}
            </Box>
          )}
        </Flex>
      </Box>

      {/* Mobile: Image Slider Below Text Block */}
      {allImages.length > 0 && (
        <Box
          display={{ base: 'block', sm: 'none' }}
          w="full"
          bg="white"
        >
          {/* Image Carousel */}
          <Box
            position="relative"
            w="full"
            overflow="hidden"
            px="8px"
            pt="8px"
          >
            <Flex
              gap="8px"
              alignItems="center"
              style={{
                transform: `translateX(-${mobileScrollPosition}px)`,
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              {allImages.map((img, index) => {
                const width = index === 0 ? '149px' : '260px'
                return (
                  <Box
                    key={index}
                    position="relative"
                    width={width}
                    height="200px"
                    flexShrink={0}
                  >
                    <Image
                      src={urlFor(img.image).url()}
                      alt={img.alt}
                      fill
                      priority={index === 0}
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                    />
                  </Box>
                )
              })}
            </Flex>
          </Box>

          {/* Navigation Buttons */}
          {allImages.length > 1 && (
            <Flex
              w="full"
              justifyContent="space-between"
              alignItems="center"
              px="8px"
              py="0"
              h="44px"
            >
              <IconButton
                aria-label="Previous image"
                icon={<ArrowIcon direction="left" />}
                onClick={handlePrevious}
                bg="white"
                size="44px"
                minW="44px"
                h="44px"
                borderRadius="0"
                _hover={{ bg: 'white', opacity: 0.8 }}
                _active={{ bg: 'white', opacity: 0.6 }}
              />
              <IconButton
                aria-label="Next image"
                icon={<ArrowIcon direction="right" />}
                onClick={handleNext}
                bg="white"
                size="44px"
                minW="44px"
                h="44px"
                borderRadius="0"
                opacity={currentImageIndex === allImages.length - 1 ? 0.5 : 1}
                isDisabled={currentImageIndex === allImages.length - 1}
                _hover={{ bg: 'white', opacity: currentImageIndex === allImages.length - 1 ? 0.5 : 0.8 }}
                _active={{ bg: 'white', opacity: currentImageIndex === allImages.length - 1 ? 0.5 : 0.6 }}
              />
            </Flex>
          )}
        </Box>
      )}
    </Box>
  )
}
