/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Box, Container, Heading, VStack } from '@chakra-ui/react'
import { PortableText } from '@portabletext/react'

interface HeadingBodyTextProps {
  heading: string
  bodyText: any[]
}

export function HeadingBodyTextSection({ heading, bodyText }: HeadingBodyTextProps) {
  return (
    <Box py={{ base: 12, md: 20 }}>
      <Container maxW="container.lg">
        <VStack spacing={6} align="stretch">
          <Heading as="h2" size="xl" textAlign="center">
            {heading}
          </Heading>
          <Box
            fontSize="lg"
            sx={{
              '& p': { mb: 4 },
              '& h2': { fontSize: '2xl', fontWeight: 'bold', mt: 8, mb: 4 },
              '& h3': { fontSize: 'xl', fontWeight: 'semibold', mt: 6, mb: 3 },
              '& h4': { fontSize: 'lg', fontWeight: 'medium', mt: 4, mb: 2 },
              '& ul, & ol': { ml: 6, mb: 4 },
              '& li': { mb: 2 },
              '& strong': { fontWeight: 'bold' },
              '& em': { fontStyle: 'italic' },
            }}
          >
            <PortableText value={bodyText} />
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

