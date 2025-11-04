'use client'

import { AspectRatio, Box, Container, Heading, SimpleGrid, Text, VStack, Button, Link } from '@chakra-ui/react'
import { MarketingLayout } from '../../../components/layout/marketing-layout'
import Image from 'next/image'
import { urlFor } from '../../../sanity/client'
import { PortableText } from '@portabletext/react'

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
          <Button as={Link} href={`/map?grave=${grave._id}`} colorScheme="blue">View on Map</Button>
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

        {grave.inscription && (
          <Box mb="12">
            <Heading as="h2" size="xl" mb="8" textAlign="center">
              Inscription
            </Heading>
            <Box
              maxH="300px"
              overflowY="auto"
              p="4"
              borderWidth="1px"
              borderColor="gray.200"
              rounded="md"
              _dark={{
                borderColor: 'gray.700',
              }}
            >
              <PortableText value={grave.inscription} />
            </Box>
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
                  {person.groReference && (
                    <Box mt="4" borderTopWidth="1px" pt="4">
                      <Heading as="h4" size="sm" mb="1">GRO Record</Heading>
                      <Text>{person.groReference}</Text>
                    </Box>
                  )}
                  {person.baptism && (
                    <Box mt="4" borderTopWidth="1px" pt="4">
                      <Heading as="h4" size="sm" mb="1">Baptism</Heading>
                      <Text>{person.baptism}</Text>
                    </Box>
                  )}
                  {person.parents && (
                    <Box mt="4" borderTopWidth="1px" pt="4">
                      <Heading as="h4" size="sm" mb="1">Parents</Heading>
                      <Text>{person.groReference}</Text>
                    </Box>
                  )}
                  {person.brcri && (
                    <Box mt="4" borderTopWidth="1px" pt="4">
                      <Heading as="h4" size="sm" mb="1">Birth Record Civil Registration Index</Heading>
                      <Text>{person.brcri}</Text>
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

        {grave.headstoneCondition && (
          <Box mt="12">
            <Heading as="h2" size="xl" mb="4" textAlign="center">
              Headstone Condition
            </Heading>
            <Text fontSize="lg" textAlign="center">{grave.headstoneCondition}</Text>
          </Box>
        )}

        {(grave.footstone || grave.footstoneInscription) && (
          <Box mt="12">
            <Heading as="h2" size="xl" mb="4" textAlign="center">
              Footstone
            </Heading>
            {grave.footstone && <Text fontSize="lg" textAlign="center">Footstone present</Text>}
            {grave.footstoneInscription && <Text fontSize="lg" textAlign="center">Inscription: {grave.footstoneInscription}</Text>}
          </Box>
        )}

        {grave.additionalInformation && (
          <Box mt="12">
            <Heading as="h2" size="xl" mb="4" textAlign="center">
              Additional Information
            </Heading>
            <Text fontSize="lg" textAlign="center">{grave.additionalInformation}</Text>
          </Box>
        )}

        {(grave.scenicGraveImage || grave.graveImages) && (
          <Box mt="12">
            <Heading as="h2" size="xl" mb="8" textAlign="center">
              Images
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6">
              {grave.scenicGraveImage && (
                <Box w="full" mx="auto">
                  <AspectRatio ratio={4 / 3} rounded="lg" overflow="hidden">
                    <Image
                      src={urlFor(grave.scenicGraveImage).url()}
                      alt={`Scenic image for grave ${grave.graveNo}`}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </AspectRatio>
                </Box>
              )}
              {grave.graveImages && grave.graveImages.map((image, index) => (
                <Box key={index} w="full" mx="auto">
                  <AspectRatio ratio={4 / 3} rounded="lg" overflow="hidden">
                    <Image
                      src={urlFor(image).url()}
                      alt={`Grave image ${index + 1} for grave ${grave.graveNo}`}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </AspectRatio>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        )}
      </Container>
    </MarketingLayout>
  )
}
