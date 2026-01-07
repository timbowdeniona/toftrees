'use client'

import { Box, Container, Flex, Text, VStack } from '@chakra-ui/react'
import { Grave } from '../../types'

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
    <Box w="full" bg="white" position="relative">
      <Container maxW="container.xl" px={{ base: '24px', md: '88px' }} py={{ base: '32px', md: '64px' }}>
        <VStack spacing="32px" align="center" w="full" maxW="824px" mx="auto" position="relative">
          {/* Decorative Top Border */}
          <Flex w="full" justify="center" align="center" gap="0">
            {Array.from({ length: 11 }).map((_, i) => (
              <Box
                key={`top-${i}`}
                w="10px"
                h="10px"
                position="relative"
                sx={{
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: '-3.54%',
                    bg: '#A3B18A',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  },
                }}
              />
            ))}
          </Flex>

          {/* Content */}
          <VStack spacing="16px" align="center" w="full">
            {/* Title */}
            <Text
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { base: '36px', md: '48px' },
                fontWeight: 600,
                lineHeight: '0.9',
                color: '#1A1F16',
              }}
            >
              Inscription
            </Text>

            {/* Inscription Text */}
            <Box
              sx={{
                fontFamily: '"Host Grotesk", sans-serif',
                fontSize: '18px',
                fontWeight: 300,
                lineHeight: '1.5',
                color: '#1A1F16',
                textAlign: 'center',
                w: 'min-content',
                minW: 'full',
              }}
            >
              {inscriptionLines.map((line, index) => (
                <Text
                  key={index}
                  mb={0}
                  sx={{
                    fontFamily: '"Host Grotesk", sans-serif',
                    fontSize: '18px',
                    fontWeight: 300,
                    lineHeight: '1.5',
                    color: '#1A1F16',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {line}
                </Text>
              ))}
            </Box>
          </VStack>

          {/* Decorative Bottom Border */}
          <Flex w="full" justify="center" align="center" gap="0">
            {Array.from({ length: 11 }).map((_, i) => (
              <Box
                key={`bottom-${i}`}
                w="10px"
                h="10px"
                position="relative"
                sx={{
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: '-3.54%',
                    bg: '#A3B18A',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  },
                }}
              />
            ))}
          </Flex>

          {/* Side Borders */}
          <Box
            position="absolute"
            left={{ base: '-24px', md: '-1px' }}
            top={0}
            bottom={0}
            w="1px"
            bg="#A3B18A"
          />
          <Box
            position="absolute"
            left={{ base: '-20px', md: '-5px' }}
            top={0}
            bottom={0}
            w="1px"
            bg="#A3B18A"
          />
          <Box
            position="absolute"
            right={{ base: '-24px', md: '-1px' }}
            top={0}
            bottom={0}
            w="1px"
            bg="#A3B18A"
          />
          <Box
            position="absolute"
            right={{ base: '-20px', md: '-5px' }}
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

