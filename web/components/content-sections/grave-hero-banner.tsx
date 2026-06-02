'use client'

import { Box, Container, Flex, Text, VStack, IconButton } from '@chakra-ui/react'
import Image from 'next/image'
import { urlFor } from '../../sanity/client'
import { useState, useRef, useEffect } from 'react'
import { Grave } from '../../types'
import { formatPersonName } from '../../utils/name-parser'
import Link from 'next/link'

// Arrow icon component for slider
function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      width="28"
      height="12"
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
  const scrollRef = useRef<HTMLDivElement>(null)

  // Get person name from grave data
  const getPersonName = (): string => {
    if (grave.persons && grave.persons.length > 0) {
      const firstPerson = grave.persons[0]
      return formatPersonName(firstPerson.name)
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

  // Manage display images state to support rotation when exactly 2 images are loaded
  const [displayImages, setDisplayImages] = useState<typeof allImages>(allImages)

  // Reset displayImages state when grave ID changes
  useEffect(() => {
    setDisplayImages(allImages)
  }, [grave._id])

  // Determine aspect ratio helper
  const getAspectRatio = (ref?: string): number => {
    if (!ref) return 1
    const match = ref.match(/-(\d+)x(\d+)-/)
    if (match) {
      const width = parseInt(match[1], 10)
      const height = parseInt(match[2], 10)
      return width / height
    }
    return 1
  }

  // Pre-process images using displayImages state
  const allImagesWithAspect = displayImages.map((img) => ({
    ...img,
    aspect: getAspectRatio(img.image?.asset?._ref),
  }))

  type ColumnType =
    | { type: 'portrait'; img: typeof allImagesWithAspect[0] }
    | { type: 'landscape'; imgs: typeof allImagesWithAspect }

  const columns: ColumnType[] = []
  let pendingLandscape: typeof allImagesWithAspect[0] | null = null

  allImagesWithAspect.forEach((img) => {
    const isPortrait = img.aspect < 1
    if (isPortrait) {
      if (pendingLandscape) {
        columns.push({ type: 'landscape', imgs: [pendingLandscape] })
        pendingLandscape = null
      }
      columns.push({ type: 'portrait', img })
    } else {
      if (pendingLandscape) {
        columns.push({ type: 'landscape', imgs: [pendingLandscape, img] })
        pendingLandscape = null
      } else {
        pendingLandscape = img
      }
    }
  })

  if (pendingLandscape) {
    columns.push({ type: 'landscape', imgs: [pendingLandscape] })
  }

  const personName = getPersonName()
  const personNameLower = personName.toLowerCase()
  const buriedDate = getBuriedDate()
  const graveNo = grave.graveNo

  const scrollLeft = () => {
    if (allImages.length === 2) {
      setDisplayImages((prev) => [prev[1], prev[0]])
    } else if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (allImages.length === 2) {
      setDisplayImages((prev) => [prev[1], prev[0]])
    } else if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

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
    <Box bg={bannerColour} w="full" position="relative" overflow="hidden" data-testid="grave-hero-banner">
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
              minW="0"
            >
              <Box
                ref={scrollRef}
                w="full"
                h="full"
                overflowX="auto"
                sx={{
                  '&::-webkit-scrollbar': { display: 'none' },
                  scrollbarWidth: 'none',
                }}
              >
                <Flex h="full" gap="16px" w="max-content" pr="32px">
                  {columns.map((col, index) => {
                    if (col.type === 'portrait') {
                      const width = 523 * col.img.aspect
                      return (
                        <Box key={index} position="relative" h="523px" w={`${width}px`} flexShrink={0}>
                          <Image
                            src={urlFor(col.img.image).url()}
                            alt={col.img.alt}
                            fill
                            style={{ objectFit: 'contain' }}
                            sizes={`${Math.round(width)}px`}
                          />
                        </Box>
                      )
                    } else {
                      const isSingle = col.imgs.length === 1
                      let width: number
                      if (isSingle) {
                        width = 523 * col.imgs[0].aspect
                      } else {
                        const totalHeight = 523 - 16
                        const invAspectSum = (1 / col.imgs[0].aspect) + (1 / col.imgs[1].aspect)
                        width = totalHeight / invAspectSum
                      }
                      
                      return (
                        <Flex key={index} direction="column" h="523px" w={`${width}px`} gap="16px" flexShrink={0}>
                          {col.imgs.map((img, jIndex) => {
                            const itemHeight = isSingle ? 523 : (width / img.aspect)
                            return (
                              <Box key={jIndex} position="relative" h={`${itemHeight}px`} w="full">
                                <Image
                                  src={urlFor(img.image).url()}
                                  alt={img.alt}
                                  fill
                                  style={{ objectFit: 'contain' }}
                                  sizes={`${Math.round(width)}px`}
                                />
                              </Box>
                            )
                          })}
                        </Flex>
                      )
                    }
                  })}
                </Flex>
              </Box>

              {/* Navigation Buttons */}
              {(columns.length > 1 || allImages.length === 2) && (
                <Flex
                  position="absolute"
                  bottom="16px"
                  right="16px"
                  gap={2}
                  zIndex={10}
                >
                  <IconButton
                    aria-label="Scroll left"
                    icon={<ArrowIcon direction="left" />}
                    onClick={scrollLeft}
                    bg="rgba(255, 255, 255, 0.5)"
                    _hover={{ bg: 'rgba(255, 255, 255, 0.9)', opacity: 1 }}
                    w="56px"
                    h="56px"
                    minW="56px"
                    borderRadius="0"
                    transition="all 0.2s ease"
                  />
                  <IconButton
                    aria-label="Scroll right"
                    icon={<ArrowIcon direction="right" />}
                    onClick={scrollRight}
                    bg="rgba(255, 255, 255, 0.5)"
                    _hover={{ bg: 'rgba(255, 255, 255, 0.9)', opacity: 1 }}
                    w="56px"
                    h="56px"
                    minW="56px"
                    borderRadius="0"
                    transition="all 0.2s ease"
                  />
                </Flex>
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
          py="16px"
        >
          <Box
            position="relative"
            w="full"
            overflowX="auto"
            px="16px"
            sx={{
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
            }}
          >
            <Flex gap="8px" w="max-content">
              {allImagesWithAspect.map((img, index) => {
                const height = 240
                const width = height * img.aspect
                return (
                  <Box
                    key={index}
                    position="relative"
                    h={`${height}px`}
                    w={`${width}px`}
                    flexShrink={0}
                  >
                    <Image
                      src={urlFor(img.image).url()}
                      alt={img.alt}
                      fill
                      priority={index === 0}
                      style={{ objectFit: 'contain' }}
                      sizes={`${Math.round(width)}px`}
                    />
                  </Box>
                )
              })}
            </Flex>
          </Box>
        </Box>
      )}
    </Box>
  )
}
