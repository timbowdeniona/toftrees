'use client'

import { Box, Container, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { MarketingLayout } from '../../components/layout/marketing-layout'
import Link from 'next/link'

import { Grave } from '../../types';

export default function GravesPageClient({ graves }: { graves: Grave[] }) {
  return (
    <MarketingLayout>
      <Container maxW="container.xl" py="20">
        <Heading as="h1" size="2xl" textAlign="center" mb="12">
          Graves
        </Heading>
        {graves.length > 0 ? (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing="6">
            {graves.map((grave) => (
              <Link href={`/graves/${grave._id}`} key={grave._id}>
                <Box
                  bg="white"
                  rounded="lg"
                  p="6"
                  shadow="md"
                  _hover={{ shadow: 'xl', bg: 'gray.800', color: 'white', _dark: { bg: 'gray.700' } }}
                  transition="all 0.2s ease-in-out"
                  borderWidth="1px"
                  borderColor="gray.200"
                  _dark={{ 
                    bg: 'gray.800',
                    borderColor: 'gray.700' 
                  }}
                  textAlign="center"
                >
                  <Heading as="h2" size="md" mb="2">
                    {`Grave ${grave.graveNo}`}
                  </Heading>
                  <Text>{grave.familySurname}</Text>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        ) : (
          <Text textAlign="center">No graves found.</Text>
        )}
      </Container>
    </MarketingLayout>
  )
}
