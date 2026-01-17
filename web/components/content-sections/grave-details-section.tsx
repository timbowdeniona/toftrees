'use client'

import { Box, Container, Flex, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { urlFor } from '../../sanity/client'
import { Grave, ImageMap } from '../../types'

interface GraveDetailsSectionProps {
  grave: Grave
  imageMap?: ImageMap | null
}

export function GraveDetailsSection({ grave, imageMap }: GraveDetailsSectionProps) {
  // Find hotspot for this grave in imageMap
  const hotspot = imageMap?.hotspots?.find(
    (h) => (h.grave as { _id: string })?._id === grave._id
  )

  // Get map image - prefer imageMap, fallback to scenicGraveImage
  const mapImage = imageMap?.image || grave.scenicGraveImage

  // Get marker position from hotspot coordinates
  const markerPosition = hotspot
    ? {
        x: hotspot.x,
        y: hotspot.y,
      }
    : null

  return (
    <Box w="full" bg="#FBFAF7">
      <Container maxW="full" px={{ base: '24px', md: '88px' }} py={{ base: '24px', md: '64px' }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: '32px', md: '120px' }}
          align="stretch"
        >
          {/* Left Side - Text Content */}
          <Flex flex="1" direction="column" gap={{base: '24px', md: '48px'}} align="start">
            {/* Title */}
            <Text
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: {base: '32px', md:'48px'},
                fontWeight: 600,
                lineHeight: '90%',
                color: 'var(--Secondary-Dark-Green, #1A1F16)',
              }}
            >
              Grave Details
            </Text>

            {/* Details Grid */}
            <VStack spacing="24px" align="stretch" w="full">
              {/* Row 1: Location & Headstone Condition */}
              <Flex
                direction={{ base: 'column', md: 'row' }}
                gap="24px"
                align="start"
                w="full"
              >
                {/* Location */}
                <VStack spacing="4px" align="start" flex="1">
                  <Text
                    sx={{
                      fontFamily: '"Host Grotesk", sans-serif',
                      fontSize: '16px',
                      fontWeight: 600,
                      lineHeight: 'normal',
                      letterSpacing: '1.92px',
                      textTransform: 'uppercase',
                      color: 'var(--Core-Green, #2E4028)',
                    }}
                  >
                    Location
                  </Text>
                  <Text
                    sx={{
                      fontFamily: '"Host Grotesk", sans-serif',
                      fontSize: '18px',
                      fontWeight: 300,
                      lineHeight: '150%',
                      color: 'var(--Secondary-Dark-Green, #1A1F16)',
                    }}
                  >
                    {grave.locationDescription || 'Not specified'}
                  </Text>
                </VStack>

                {/* Headstone Condition */}
                <VStack spacing="4px" align="start" flex="1">
                  <Text
                    sx={{
                      fontFamily: '"Host Grotesk", sans-serif',
                      fontSize: '16px',
                      fontWeight: 600,
                      lineHeight: 'normal',
                      letterSpacing: '1.92px',
                      textTransform: 'uppercase',
                      color: 'var(--Core-Green, #2E4028)',
                    }}
                  >
                    Headstone Condition
                  </Text>
                  <Text
                    sx={{
                      fontFamily: '"Host Grotesk", sans-serif',
                      fontSize: '18px',
                      fontWeight: 300,
                      lineHeight: '150%',
                      color: 'var(--Secondary-Dark-Green, #1A1F16)',
                    }}
                  >
                    {grave.headstoneCondition || 'Not specified'}
                  </Text>
                </VStack>
              </Flex>

              {/* Row 2: Footstone & Type of Grave */}
              <Flex
                direction={{ base: 'column', md: 'row' }}
                gap="24px"
                align="start"
                w="full"
              >
                {/* Footstone */}
                <VStack spacing="4px" align="start" flex="1">
                  <Text
                    sx={{
                      fontFamily: '"Host Grotesk", sans-serif',
                      fontSize: '16px',
                      fontWeight: 600,
                      lineHeight: 'normal',
                      letterSpacing: '1.92px',
                      textTransform: 'uppercase',
                      color: 'var(--Core-Green, #2E4028)',
                    }}
                  >
                    FootStone
                  </Text>
                  <Text
                    sx={{
                      fontFamily: '"Host Grotesk", sans-serif',
                      fontSize: '18px',
                      fontWeight: 300,
                      lineHeight: '150%',
                      color: 'var(--Secondary-Dark-Green, #1A1F16)',
                    }}
                  >
                    {grave.footstoneInscription || (grave.footstone ? 'Yes' : 'No')}
                  </Text>
                </VStack>

                {/* Type of Grave - This field doesn't exist in schema, showing placeholder */}
                <VStack spacing="4px" align="start" flex="1">
                  <Text
                    sx={{
                      fontFamily: '"Host Grotesk", sans-serif',
                      fontSize: '16px',
                      fontWeight: 600,
                      lineHeight: 'normal',
                      letterSpacing: '1.92px',
                      textTransform: 'uppercase',
                      color: 'var(--Core-Green, #2E4028)',
                    }}
                  >
                    Type of Grave
                  </Text>
                  <Text
                    sx={{
                      fontFamily: '"Host Grotesk", sans-serif',
                      fontSize: '18px',
                      fontWeight: 300,
                      lineHeight: '150%',
                      color: 'var(--Secondary-Dark-Green, #1A1F16)',
                    }}
                  >
                    Upright
                  </Text>
                </VStack>
              </Flex>

              {/* Row 3: Additional Information */}
              {grave.additionalInformation && (
                <VStack spacing="4px" align="start" w="full">
                  <Text
                    sx={{
                      fontFamily: '"Host Grotesk", sans-serif',
                      fontSize: '16px',
                      fontWeight: 600,
                      lineHeight: 'normal',
                      letterSpacing: '1.92px',
                      textTransform: 'uppercase',
                      color: 'var(--Core-Green, #2E4028)',
                    }}
                  >
                    Additional Information
                  </Text>
                  <Text
                    sx={{
                      fontFamily: '"Host Grotesk", sans-serif',
                      fontSize: '16px',
                      fontWeight: 300,
                      lineHeight: '150%',
                      color: 'var(--Secondary-Dark-Green, #1A1F16)',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {grave.additionalInformation}
                  </Text>
                </VStack>
              )}
            </VStack>
          </Flex>

          {/* Right Side - Map Image */}
          {mapImage && markerPosition && (
            <Box
              flex="1"
              position="relative"
              h={{ base: '400px', md: 'auto' }}
              minH={{ base: '400px', md: '500px' }}
              maxH={{ base: '400px', md: '600px' }}
              overflow="hidden"
              bg="#f0f0f0"
              borderRadius="4px"
            >
              <Box position="relative" w="full" h="full">
                <Image
                  src={urlFor(mapImage).url()}
                  alt="Grave location map"
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />

                {/* Pointer Marker */}
                <Box
                  position="absolute"
                  left={`${markerPosition.x}%`}
                  top={`${markerPosition.y}%`}
                  transform="translate(-50%, -50%)"
                  w="26px"
                  h="auto"
                  zIndex={10}
                  pointerEvents="none"
                >
                  <Image
                    src="/pointer.svg"
                    alt="Location marker"
                    width={26}
                    height={50}
                    style={{
                      width: '26px',
                      height: 'auto',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </Flex>
      </Container>
    </Box>
  )
}

