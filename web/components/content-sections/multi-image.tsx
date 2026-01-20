'use client'

import { useState, useRef } from 'react'
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
  spacing,
}: MultiImageProps) {
  const [dragOffset, setDragOffset] = useState(0) // Current drag offset in pixels
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const [dragStartOffset, setDragStartOffset] = useState(0) // Offset when drag started
  const carouselRef = useRef<HTMLDivElement>(null)

  if (!images || images.length === 0) {
    return null
  }

  // Calculate total width: first image 149px, others 260px, gap 8px
  const firstImageWidth = 149
  const otherImageWidth = 260
  const gap = 8
  const totalWidth = firstImageWidth + (images.length - 1) * (otherImageWidth + gap)
  const maxOffset = Math.max(0, totalWidth - (typeof window !== 'undefined' ? window.innerWidth - 16 : 400)) // Subtract container padding

  const goToPrevious = () => {
    const newOffset = Math.max(0, dragOffset - (otherImageWidth + gap))
    setDragOffset(newOffset)
  }

  const goToNext = () => {
    const newOffset = Math.min(maxOffset, dragOffset + (otherImageWidth + gap))
    setDragOffset(newOffset)
  }

  // Touch handlers for free dragging
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0]
    setIsDragging(true)
    setStartX(touch.clientX)
    setStartY(touch.clientY)
    setDragStartOffset(dragOffset) // Save current offset when starting drag
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const touch = e.touches[0]
    const diffX = Math.abs(touch.clientX - startX)
    const diffY = Math.abs(touch.clientY - startY)
    
    // Only prevent default if horizontal swipe is dominant
    if (diffX > diffY && diffX > 10) {
      e.preventDefault()
    }
    
    // Calculate new offset: start offset + (startX - currentX)
    const deltaX = startX - touch.clientX
    const newOffset = Math.max(0, Math.min(maxOffset, dragStartOffset + deltaX))
    setDragOffset(newOffset)
  }

  const handleTouchEnd = () => {
    // Just stop dragging, keep the current position
    setIsDragging(false)
  }

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
    <Box width="100%" {...spacingStyle}>
      {/* Desktop: Horizontal layout */}
      <Box display={{ base: 'none', md: 'block' }}>
        <Flex
          width="100%"
          alignItems="center"
          gap="8px"
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
          ref={carouselRef}
          position="relative"
          width="100%"
          overflow="hidden"
          px="8px"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Flex
            gap="8px"
            alignItems="center"
            style={{
              transform: `translateX(-${dragOffset}px)`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out',
              willChange: isDragging ? 'transform' : 'auto',
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
            opacity={dragOffset >= maxOffset ? 0.5 : 1}
            isDisabled={dragOffset >= maxOffset}
            _hover={{ bg: 'white', opacity: dragOffset >= maxOffset ? 0.5 : 0.8 }}
            _active={{ bg: 'white', opacity: dragOffset >= maxOffset ? 0.5 : 0.6 }}
          />
        </Flex>
      </Box>
    </Box>
  )
}

