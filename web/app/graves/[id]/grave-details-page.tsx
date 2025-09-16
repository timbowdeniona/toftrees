'use client'

import { AspectRatio, Box, Container, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { MarketingLayout } from '../../../components/layout/marketing-layout'
import Image from 'next/image'
import { urlFor } from '../../../sanity/client'

import { Grave } from '../../../types';

export default function GraveDetailsPageClient({ grave }: { grave: Grave }) {
  if (!grave) {
    return (
      <MarketingLayout>
        <Container maxW="container.xl" py="20">
          <Text textAlign="center">Grave not found.</Text>
        </Container>
      </MarketingLayout>
    )
  }

  return (
    <MarketingLayout>
      <Container maxW="container.xl" py="20">
        <VStack spacing="8" textAlign="center" mb="12">
          <Heading as="h1" size="2xl">
            Grave No: {grave.graveNo}
          </Heading>
          <Text fontSize="xl" color="muted">Family: {grave.familySurname}</Text>
        </VStack>

        {grave.headstoneImage && (
          <Box w="full" maxW="2xl" mx="auto" mb="12">
            <AspectRatio ratio={4 / 3} rounded="lg" overflow="hidden">
              <Image
                src={urlFor(grave.headstoneImage).url()}
                alt={`Headstone for grave ${grave.graveNo}`}
                fill
                style={{ objectFit: 'contain' }}
              />
            </AspectRatio>
          </Box>
        )}

        {grave.persons && grave.persons.length > 0 && (
          <Box mb="12">
            <Heading as="h2" size="xl" mb="8" textAlign="center">
              Persons Buried
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
              {grave.persons.map((person, index) => (
                <Box
                  key={index}
                  bg="white"
                  rounded="lg"
                  p="6"
                  shadow="md"
                  borderWidth="1px"
                  borderColor="gray.200"
                  _dark={{ 
                    bg: 'gray.800',
                    borderColor: 'gray.700' 
                  }}
                >
                  <Heading as="h3" size="md" mb="2">{person.name}</Heading>
                  <Text mb="2">Buried: {person.dateBurial}</Text>
                  <Text mb="2">Age: {person.age}</Text>
                  {person.official && (
                    <Box mt="4" borderTopWidth="1px" pt="4">
                      <Heading as="h4" size="sm" mb="1">Official</Heading>
                      <Text>{person.official}</Text>
                    </Box>
                  )}
                  {person.notes && (
                    <Box mt="4" borderTopWidth="1px" pt="4">
                      <Heading as="h4" size="sm" mb="1">Notes</Heading>
                      <Text>{person.notes}</Text>
                    </Box>
                  )}
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        )}

        {grave.locationDescription && (
          <Box>
            <Heading as="h2" size="xl" mb="4" textAlign="center">
              Location
            </Heading>
            <Text fontSize="lg" textAlign="center">{grave.locationDescription}</Text>
          </Box>
        )}
      </Container>
    </MarketingLayout>
  )
}
