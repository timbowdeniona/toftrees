'use client'

import { Box, Container, Grid, GridItem, Heading, VStack, Link as ChakraLink } from '@chakra-ui/react'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '../../sanity/client'

interface ImageTextProps {
  image: {
    asset: {
      _ref: string
    }
  }
  imageAltText: string
  imagePosition: 'left' | 'right'
  title: string
  bodyText: any[]
  hyperlinkLabel?: string
  hyperlinkUrl?: string
}

export function ImageTextSection({
  image,
  imageAltText,
  imagePosition,
  title,
  bodyText,
  hyperlinkLabel,
  hyperlinkUrl,
}: ImageTextProps) {
  const imageOrder = imagePosition === 'left' ? { base: 1, md: 1 } : { base: 1, md: 2 }
  const textOrder = imagePosition === 'left' ? { base: 2, md: 2 } : { base: 2, md: 1 }

  return (
    <Box py={{ base: 12, md: 20 }}>
      <Container maxW="container.xl">
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
          gap={{ base: 8, md: 12 }}
          alignItems="center"
        >
          <GridItem order={imageOrder}>
            <Box
              position="relative"
              width="100%"
              height={{ base: '300px', md: '400px' }}
              rounded="lg"
              overflow="hidden"
            >
              <Image
                src={urlFor(image).url()}
                alt={imageAltText}
                fill
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </GridItem>
          <GridItem order={textOrder}>
            <VStack spacing={6} align="stretch">
              <Heading as="h2" size="xl">
                {title}
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
              {hyperlinkLabel && hyperlinkUrl && (
                <Box>
                  <ChakraLink
                    as={Link}
                    href={hyperlinkUrl}
                    color="blue.600"
                    _dark={{ color: 'blue.400' }}
                    fontWeight="semibold"
                    fontSize="lg"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    {hyperlinkLabel} →
                  </ChakraLink>
                </Box>
              )}
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}

