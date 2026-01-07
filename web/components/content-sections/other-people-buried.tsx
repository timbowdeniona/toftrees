'use client'

import { Box, Container, Flex, Text, VStack, Button, Collapse } from '@chakra-ui/react'
import { Grave } from '../../types'
import { useState } from 'react'

interface OtherPeopleBuriedProps {
  grave: Grave
}

export function OtherPeopleBuried({ grave }: OtherPeopleBuriedProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  // Get all persons except the first one (first person is shown in hero banner)
  const otherPeople = grave.persons && grave.persons.length > 1
    ? grave.persons.slice(1)
    : []

  if (otherPeople.length === 0) {
    return null
  }

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  const getPersonName = (person: { name?: string }): string => {
    if (!person.name) return 'Unknown'
    const name = person.name.trim()
    if (name.includes(',')) {
      return name
    }
    const parts = name.split(/\s+/)
    if (parts.length > 1) {
      const lastName = parts[parts.length - 1]
      const firstName = parts.slice(0, -1).join(' ')
      return `${lastName}, ${firstName}`
    }
    return name
  }

  const getDetailItems = (person: typeof otherPeople[0]) => {
    const items = []

    if (person.dateBurial) {
      items.push({ label: 'Buried Date', value: person.dateBurial })
    }
    if (person.age) {
      items.push({ label: 'Age', value: String(person.age) })
    }
    if (person.official) {
      items.push({ label: 'Official', value: person.official })
    }
    if (person.groReference) {
      items.push({ label: 'GRO Record', value: person.groReference })
    }
    if (person.baptism) {
      items.push({ label: 'Baptised', value: person.baptism })
    }
    if (person.parents) {
      items.push({ label: 'Parents', value: person.parents })
    }
    if (person.brcri) {
      items.push({ label: 'Birth Record Civil Registration Index', value: person.brcri })
    }

    return items
  }

  return (
    <Box
      w="full"
      bg="rgba(163, 177, 138, 0.5)"
      sx={{
        backgroundImage: 'linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%), linear-gradient(90deg, rgba(163, 177, 138, 1) 0%, rgba(163, 177, 138, 1) 100%)',
      }}
    >
      <Container maxW="container.xl" px={{ base: '24px', md: '32px' }} py={{ base: '64px', md: '128px' }}>
        <VStack spacing="48px" align="center" w="full">
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
            Other People Buried in this Grave
          </Text>

          {/* People List */}
          <VStack spacing="24px" align="start" w="full" maxW="800px">
            {otherPeople.map((person, index) => {
              const personName = getPersonName(person)
              const year = person.year || ''
              const detailItems = getDetailItems(person)
              const isExpanded = expandedIndex === index

              return (
                <Box key={person._key || index} w="full">
                  {/* Person Button */}
                  <Button
                    variant="ghost"
                    w="full"
                    px={{ base: '24px', md: '64px' }}
                    py={0}
                    h="auto"
                    minH="auto"
                    onClick={() => toggleExpand(index)}
                    justifyContent="space-between"
                    alignItems="end"
                    position="relative"
                    _hover={{ bg: 'transparent' }}
                    _active={{ bg: 'transparent' }}
                  >
                    <Flex align="center" gap="16px" flex="1">
                      {/* Chevron Icon */}
                      <Box
                        w="14px"
                        h="14px"
                        position="relative"
                        transform={isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'}
                        transition="transform 0.3s ease"
                      >
                        <Box
                          position="absolute"
                          top="50%"
                          left="50%"
                          transform="translate(-50%, -50%)"
                          w="8px"
                          h="1px"
                          bg="#1A1F16"
                          _before={{
                            content: '""',
                            position: 'absolute',
                            right: 0,
                            top: '50%',
                            transform: 'translateY(-50%) rotate(45deg)',
                            w: '4px',
                            h: '1px',
                            bg: '#1A1F16',
                          }}
                          _after={{
                            content: '""',
                            position: 'absolute',
                            right: 0,
                            top: '50%',
                            transform: 'translateY(-50%) rotate(-45deg)',
                            w: '4px',
                            h: '1px',
                            bg: '#1A1F16',
                          }}
                        />
                      </Box>

                      {/* Person Name */}
                      <Text
                        sx={{
                          fontFamily: '"Cormorant Garamond", serif',
                          fontSize: { base: '24px', md: '32px' },
                          fontWeight: 600,
                          lineHeight: '0.9',
                          color: '#1A1F16',
                          textAlign: 'left',
                        }}
                      >
                        {personName}
                      </Text>
                    </Flex>

                    {/* Year */}
                    {year && (
                      <Text
                        sx={{
                          fontFamily: '"Host Grotesk", sans-serif',
                          fontSize: '18px',
                          fontWeight: 600,
                          lineHeight: '1.5',
                          color: '#1A1F16',
                        }}
                      >
                        {year}
                      </Text>
                    )}
                  </Button>

                  {/* Expandable Details */}
                  <Collapse in={isExpanded} animateOpacity>
                    <Box px={{ base: '24px', md: '64px' }} py={0} overflow="hidden">
                      <VStack spacing={0} align="stretch" w="full">
                        {detailItems.map((item, itemIndex) => (
                          <Flex
                            key={itemIndex}
                            justify="space-between"
                            align="start"
                            py="12px"
                            borderBottom="1px solid #A3B18A"
                          >
                            <Text
                              sx={{
                                fontFamily: '"Host Grotesk", sans-serif',
                                fontSize: '16px',
                                fontWeight: 600,
                                color: '#2E4028',
                              }}
                            >
                              {item.label}
                            </Text>
                            <Text
                              sx={{
                                fontFamily: '"Host Grotesk", sans-serif',
                                fontSize: '16px',
                                fontWeight: 400,
                                color: '#2E4028',
                              }}
                            >
                              {item.value}
                            </Text>
                          </Flex>
                        ))}

                        {/* Notes */}
                        {person.notes && (
                          <Box py="12px">
                            <VStack spacing="4px" align="start" w="full">
                              <Text
                                sx={{
                                  fontFamily: '"Host Grotesk", sans-serif',
                                  fontSize: '16px',
                                  fontWeight: 600,
                                  color: '#2E4028',
                                }}
                              >
                                Notes
                              </Text>
                              <Text
                                sx={{
                                  fontFamily: '"Host Grotesk", sans-serif',
                                  fontSize: '16px',
                                  fontWeight: 400,
                                  color: '#2E4028',
                                  whiteSpace: 'pre-wrap',
                                }}
                              >
                                {person.notes}
                              </Text>
                            </VStack>
                          </Box>
                        )}
                      </VStack>
                    </Box>
                  </Collapse>

                  {/* Divider (except last item) */}
                  {index < otherPeople.length - 1 && (
                    <Box px={{ base: '24px', md: '64px' }} py={0} mt="24px">
                      <Box h="1px" w="full" bg="#A3B18A" />
                    </Box>
                  )}
                </Box>
              )
            })}
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

