/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Box, Container, Flex } from '@chakra-ui/react'
import { PortableText } from '@portabletext/react'

interface HeadingBodyTextProps {
  heading: string
  bodyText: any[]
}

export function HeadingBodyTextSection({ heading, bodyText }: HeadingBodyTextProps) {
  return (
    <Box py={{ base: 8, md: 32 }} px={{ base: 6, md: 0 }}>
      <Container maxW="container.xl" px={0}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: 4, md: 16 }}
          align="start"
        >
          {/* Left Column - Heading */}
          <Box flex="1 0 0" minW={0} w={{ base: 'full', md: 'auto' }}>
            <Box
              as="h2"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { base: '40px', md: '64px' },
                fontWeight: 600,
                lineHeight: { base: '1.15', md: '0.9' },
                color: '#2E4028',
                whiteSpace: 'pre-wrap',
                w: 'full',
              }}
            >
              {heading}
            </Box>
          </Box>

          {/* Right Column - Body Text */}
          <Box
            flex="1 0 0"
            minW={0}
            w={{ base: 'full', md: 'auto' }}
            display={{ base: 'block', md: 'flex' }}
            alignItems={{ md: 'flex-end' }}
            alignSelf={{ md: 'stretch' }}
          >
            <Box
              sx={{
                fontFamily: '"Host Grotesk", sans-serif',
                fontSize: { base: '18px', md: '20px' },
                fontWeight: 300,
                lineHeight: '1.5',
                color: '#1A1F16',
                whiteSpace: 'pre-wrap',
                w: 'full',
                '& p': {
                  mb: { base: '24px', md: '16px' },
                  '&:last-child': {
                    mb: 0,
                  },
                },
              }}
            >
              <PortableText value={bodyText} />
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

