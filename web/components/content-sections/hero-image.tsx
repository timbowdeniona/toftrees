/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Box, VStack, Flex } from '@chakra-ui/react'
import Image from 'next/image'
import { urlFor } from '../../sanity/client'
import { useEffect } from 'react'

// SVG Separator Pattern Component - Using background-image with data URI
function HeroImageSeparator() {
  // SVG icon as data URI - maintains original 11x10 size and repeats
  const svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none"><path d="M0.353554 10L5.35355 5M10.3536 0L5.35355 5M5.35355 5L10.3536 10L0.353554 0" stroke="white"/></svg>'
  const svgPattern = encodeURIComponent(svgString)

  return (
    <Box 
      w="full"
      bg="transparent"
      overflow="hidden"
      position="relative"
      top="-5px"
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

type HeroImageProps = {
  heroBackgroundImage?: any
  heroImageAltText: string
  overlayIconImage?: any
  overlayIconAltText?: string
  bottomSection?: React.ReactNode
  bottomIcons?: Array<{
    image: any
    altText?: string
  }>
}

export function HeroImageSection({
  heroBackgroundImage,
  heroImageAltText,
  overlayIconImage,
  overlayIconAltText,
  bottomSection,
  bottomIcons,
}: HeroImageProps) {
  if (!heroBackgroundImage) return null

  // Duplicate icons for seamless infinite scroll
  const duplicatedIcons = bottomIcons ? [...bottomIcons, ...bottomIcons] : []

  // Inject CSS animation
  useEffect(() => {
    if (bottomIcons && bottomIcons.length > 0) {
      const styleId = 'hero-icon-scroll-animation'
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style')
        style.id = styleId
        style.textContent = `
          @keyframes scrollIcons {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .icon-scroll-container {
            animation: scrollIcons ${bottomIcons.length * 3}s linear infinite;
          }
        `
        document.head.appendChild(style)
      }
    }
  }, [bottomIcons])

  return (
    <VStack spacing={0} align="stretch" w="full">
      <Box position="relative" w="full">
        <Box maxW="container.2xl">
          <Box 
            position="relative" 
            overflow="hidden"
            w="full"
            h={{ base: '281px', sm: 'auto' }}
          >
            <Box
              position="relative"
              w="full"
              h={{ base: '281px', sm: 'auto' }}
            >
              <Image
                src={urlFor(heroBackgroundImage).url()}
                alt={heroImageAltText}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </Box>

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
      
      {/* SVG Separator */}
      <HeroImageSeparator />
      
      {/* Bottom Icons Carousel */}
      {bottomIcons && bottomIcons.length > 0 && (
        <Box
          w="full"
          overflow="hidden"
          bg="white"
          py={{ base: "24px", md: "32px" }}
          position="relative"
        >
          <Flex
            className="icon-scroll-container"
            gap={{ base: "24px", md: "32px" }}
            align="center"
            w="fit-content"
          >
            {duplicatedIcons.map((icon, index) => (
              <Box
                key={index}
                flexShrink={0}
                w={{ base: "48px", md: "64px" }}
                h={{ base: "48px", md: "64px" }}
                position="relative"
              >
                <Image
                  src={urlFor(icon.image).url()}
                  alt={icon.altText || `Icon ${index + 1}`}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </Box>
            ))}
          </Flex>
        </Box>
      )}
      
      {/* Bottom Section */}
      {bottomSection && (
        <Box w="full">
          {bottomSection}
        </Box>
      )}
    </VStack>
  )
}

