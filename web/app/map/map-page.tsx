'use client'

import { Box, Container, Heading, Text } from '@chakra-ui/react'
import { MarketingLayout } from '../../components/layout/marketing-layout'
import Image from 'next/image'
import { urlFor } from '../../sanity/client'
import Link from 'next/link'
import { ImageMap, Hotspot } from '../../types'

export default function MapPageClient({ imageMap }: { imageMap: ImageMap }) {
  if (!imageMap) {
    return (
      <MarketingLayout>
        <Container maxW="container.xl" py="20">
          <Text textAlign="center">No map found.</Text>
        </Container>
      </MarketingLayout>
    )
  }

  return (
    <MarketingLayout>
      <Container maxW="container.xl" py="20">
        <Heading as="h1" size="2xl" textAlign="center" mb="12">
          {imageMap.title}
        </Heading>
        {imageMap.image ? (
          <Box position="relative">
            <Image
              src={urlFor(imageMap.image).url()}
              alt={imageMap.title}
              width={2000}
              height={1000}
            />
            {imageMap.hotspots?.map((hotspot: Hotspot) => (
              <Link href={`/graves/${hotspot.grave._ref}`} key={hotspot._key}>
                <Box
                  position="absolute"
                  top={`${hotspot.y}%`}
                  left={`${hotspot.x}%`}
                  width="10px"
                  height="10px"
                  bg="red.500"
                  borderRadius="full"
                  transform="translate(-50%, -50%)"
                />
              </Link>
            ))}
          </Box>
        ) : (
          <Text textAlign="center">No map image found.</Text>
        )}
      </Container>
    </MarketingLayout>
  )
}
