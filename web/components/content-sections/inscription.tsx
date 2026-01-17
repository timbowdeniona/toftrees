'use client'

import { Box, Container, Text, VStack } from '@chakra-ui/react'
import { Grave } from '../../types'

// SVG Separator Pattern Component - Using background-image with data URI
function InscriptionSeparator() {
  // SVG icon as data URI - maintains original 11x10 size and repeats
  const svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none"><path d="M0.353554 10L5.35355 5M10.3536 0L5.35355 5M5.35355 5L10.3536 10L0.353554 0" stroke="#A3B18A"/></svg>'
  const svgPattern = encodeURIComponent(svgString)

  return (
    <Box 
      w="full"
      bg="transparent"
      overflow="hidden"
      position="relative"
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

interface InscriptionProps {
  grave: Grave
}

export function Inscription({ grave }: InscriptionProps) {
  if (!grave.inscription || grave.inscription.length === 0) {
    return null
  }

  // Convert inscription blocks to array of text lines
  const inscriptionLines = grave.inscription
    .map((block) => {
      if (block.children) {
        return block.children.map((child) => child.text || '').join('')
      }
      return ''
    })
    .filter((text) => text.trim().length > 0)

  if (inscriptionLines.length === 0) {
    return null
  }

  return (
    <Box w="full" bg="white" px={{base: "24px", md:"88px"}} py={{base:"24px", md:"64px"}} position="relative">
      <Container maxW="824px">
        <VStack spacing="32px" align="center" w="full" maxW="824px" mx="auto" position="relative">
          {/* Top Separator */}
          <Box w="full">
            <InscriptionSeparator />
          </Box>

          {/* Content */}
          <VStack spacing="16px" align="center" w="full">
            {/* Title */}
            <Text
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: {base: '32px', md: '48px'},
                fontStyle: 'normal',
                fontWeight: 600,
                lineHeight: '90%',
                color: 'var(--Secondary-Dark-Green, #1A1F16)',
                textAlign: 'center',
              }}
            >
              Inscription
            </Text>

            {/* Inscription Text */}
            <VStack spacing="0" align="center" w="full">
              {inscriptionLines.map((line, index) => (
                <Text
                  key={index}
                  sx={{
                    fontFamily: '"Host Grotesk", sans-serif',
                    fontSize: '18px',
                    fontWeight: 300,
                    lineHeight: '1.5',
                    color: '#1A1F16',
                    textAlign: 'center',
                    whiteSpace: 'pre-wrap',
                    mb: index < inscriptionLines.length - 1 ? '0px' : '0',
                  }}
                >
                  {line}
                </Text>
              ))}
            </VStack>
          </VStack>

          {/* Bottom Separator */}
          <Box w="full">
            <InscriptionSeparator />
          </Box>

          {/* Side Borders */}
          <Box
            position="absolute"
            left={{ base: '0px', md: '-1px' }}
            top={0}
            bottom={0}
            w="1px"
            bg="#A3B18A"
          />
          <Box
            position="absolute"
            left={{ base: '-4px', md: '-5px' }}
            top={0}
            bottom={0}
            w="1px"
            bg="#A3B18A"
          />
          <Box
            position="absolute"
            right={{ base: '0px', md: '-1px' }}
            top={0}
            bottom={0}
            w="1px"
            bg="#A3B18A"
          />
          <Box
            position="absolute"
            right={{ base: '-4px', md: '-5px' }}
            top={0}
            bottom={0}
            w="1px"
            bg="#A3B18A"
          />
        </VStack>
      </Container>
    </Box>
  )
}

