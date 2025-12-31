'use client'

import { useState } from 'react'
import { Box, Flex, IconButton } from '@chakra-ui/react'
import Image from 'next/image'
import { urlFor } from '../../sanity/client'

interface ImageItem {
  image: {
    asset: {
      _ref: string
    }
  }
  imageAltText: string
}

interface MultiImageProps {
  images: ImageItem[]
}

// Arrow icon component
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

export function MultiImageSection({
  images,
}: MultiImageProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return null
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  // Calculate scroll position for mobile carousel
  // First image: 149px, others: 260px, gap: 8px
  const calculateScrollPosition = () => {
    if (currentIndex === 0) return 0
    // First image width + gap + (currentIndex - 1) * (other image width + gap)
    return 149 + 8 + (currentIndex - 1) * (260 + 8)
  }
  
  const scrollPosition = calculateScrollPosition()

  return (
    <Box width="100%" py={{ base: '24px', md: '48px' }}>
      {/* Desktop: Horizontal layout */}
      <Box display={{ base: 'none', md: 'block' }}>
        <Flex
          width="100%"
          alignItems="center"
          gap="8px"
          px="48px"
        >
          {images.map((item, index) => {
            const isFirst = index === 0
            return (
              <Box
                key={index}
                position="relative"
                width={isFirst ? '410px' : '1 0 0'}
                height="550px"
                flexShrink={isFirst ? 0 : 1}
                flexGrow={isFirst ? 0 : 1}
                flexBasis={isFirst ? '410px' : '0'}
                minW={isFirst ? '410px' : '0'}
              >
                <Image
                  src={urlFor(item.image).url()}
                  alt={item.imageAltText}
                  fill
                  style={{ 
                    objectFit: 'cover',
                    objectPosition: '50% 50%',
                  }}
                />
              </Box>
            )
          })}
        </Flex>
      </Box>

      {/* Mobile: Carousel/Slider */}
      <Box display={{ base: 'block', md: 'none' }}>
        {/* Image Carousel */}
        <Box
          position="relative"
          width="100%"
          overflow="hidden"
          px="8px"
        >
          <Flex
            gap="8px"
            alignItems="center"
            style={{
              transform: `translateX(-${scrollPosition}px)`,
              transition: 'transform 0.3s ease-in-out',
            }}
          >
            {images.map((item, index) => {
              // First image: 149px, others: 260px (based on Figma)
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
                    src={urlFor(item.image).url()}
                    alt={item.imageAltText}
                    fill
                    style={{ 
                      objectFit: 'cover',
                      objectPosition: '50% 50%',
                    }}
                  />
                </Box>
              )
            })}
          </Flex>
        </Box>

        {/* Navigation Buttons */}
        <Flex
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          px="8px"
          py="0"
          height="44px"
        >
          <IconButton
            aria-label="Previous image"
            icon={<ArrowIcon direction="left" />}
            onClick={goToPrevious}
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
            onClick={goToNext}
            bg="white"
            size="44px"
            minW="44px"
            h="44px"
            borderRadius="0"
            opacity={currentIndex === images.length - 1 ? 0.5 : 1}
            isDisabled={currentIndex === images.length - 1}
            _hover={{ bg: 'white', opacity: currentIndex === images.length - 1 ? 0.5 : 0.8 }}
            _active={{ bg: 'white', opacity: currentIndex === images.length - 1 ? 0.5 : 0.6 }}
          />
        </Flex>
      </Box>
    </Box>
  )
}

