'use client'

import { Box, Container, Heading, SimpleGrid, Text, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { MarketingLayout } from '../../components/layout/marketing-layout'
import Link from 'next/link'
import { Grave } from '../../types'
import { useState, useMemo } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function GravesPageClient({ graves }: { graves: Grave[] }) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredGraves = useMemo(() => {
    if (!searchQuery) {
      return graves
    }
    return graves.filter((grave) =>
      grave.familySurname?.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [graves, searchQuery])

  return (
    <MarketingLayout>
      <Container maxW="container.xl" py="20">
        <Heading as="h1" size="2xl" textAlign="center" mb="12">
          Graves
        </Heading>
        <Box mb="8">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FaSearch color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search by surname..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              bg="white"
              _dark={{ bg: 'gray.700' }}
            />
          </InputGroup>
        </Box>
        {filteredGraves.length > 0 ? (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing="6">
            {filteredGraves.map((grave) => (
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
          <Text textAlign="center">
            {searchQuery ? `No graves found for "${searchQuery}".` : 'No graves found.'}
          </Text>
        )}
      </Container>
    </MarketingLayout>
  )
}
