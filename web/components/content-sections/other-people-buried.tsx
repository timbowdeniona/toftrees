"use client";

import {
  Box,
  Container,
  Flex,
  Text,
  VStack,
  Button,
  Collapse,
} from "@chakra-ui/react";
import { Grave } from "../../types";
import { useState } from "react";

interface OtherPeopleBuriedProps {
  grave: Grave;
}

export function OtherPeopleBuried({ grave }: OtherPeopleBuriedProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Get all persons except the first one (first person is shown in hero banner)
  const otherPeople =
    grave.persons && grave.persons.length > 1 ? grave.persons.slice(1) : [];

  if (otherPeople.length === 0) {
    return null;
  }

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getPersonName = (person: { name?: string }): string => {
    if (!person.name) return "Unknown";
    const name = person.name.trim();
    if (name.includes(",")) {
      return name;
    }
    const parts = name.split(/\s+/);
    if (parts.length > 1) {
      const lastName = parts[parts.length - 1];
      const firstName = parts.slice(0, -1).join(" ");
      return `${lastName}, ${firstName}`;
    }
    return name;
  };

  const getDetailItems = (person: (typeof otherPeople)[0]) => {
    const items = [];

    if (person.dateBurial) {
      items.push({ label: "Buried Date", value: person.dateBurial });
    }
    if (person.age) {
      items.push({ label: "Age", value: String(person.age) });
    }
    if (person.official) {
      items.push({ label: "Official", value: person.official });
    }
    if (person.groReference) {
      items.push({ label: "GRO Record", value: person.groReference });
    }
    if (person.baptism) {
      items.push({ label: "Baptised", value: person.baptism });
    }
    if (person.parents) {
      items.push({ label: "Parents", value: person.parents });
    }
    if (person.brcri) {
      items.push({
        label: "Birth Record Civil Registration Index",
        value: person.brcri,
      });
    }

    return items;
  };

  return (
    <Box
      w="full"
      bg="rgba(163, 177, 138, 0.5)"
      sx={{
        backgroundImage:
          "linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.5) 100%), linear-gradient(90deg, rgba(163, 177, 138, 1) 0%, rgba(163, 177, 138, 1) 100%)",
      }}
    >
      <Container
        maxW="container.xl"
        px={{ base: "24px", md: "32px" }}
        py={{ base: "24px", md: "128px" }}
      >
        <Box maxW="800px" mx="auto">
          <VStack
            spacing={{ base: "24px", md: "48px" }}
            align="stretch"
            w="full"
          >
            {/* Title */}
            <Text
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { base: "32px", md: "48px" },
                fontWeight: 600,
                lineHeight: "90%",
                color: "var(--Secondary-Dark-Green, #1A1F16)",
                textAlign: "center",
              }}
            >
              Other People Buried in this Grave
            </Text>

            {/* People List */}
            <VStack spacing={0} align="stretch" w="full">
              {otherPeople.map((person, index) => {
                const personName = getPersonName(person);
                const year = person.year || "";
                const detailItems = getDetailItems(person);
                const isExpanded = expandedIndex === index;

                return (
                  <Box key={person._key || index} w="full">
                    {/* Person Button */}
                    <Button
                      variant="ghost"
                      w="full"
                      px={0}
                      h="auto"
                      minH="auto"
                      onClick={() => toggleExpand(index)}
                      justifyContent="space-between"
                      alignItems="center"
                      position="relative"
                      _hover={{ bg: "transparent" }}
                      _active={{ bg: "transparent" }}
                    >
                      <Flex align="center" gap="8px" flex="1">
                        {/* Plus Icon */}
                        <Box
                          w="14px"
                          h="14px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          flexShrink={0}
                        >
                          <Text
                            sx={{
                              fontFamily: '"Host Grotesk", sans-serif',
                              fontSize: "16px",
                              fontWeight: 400,
                              color: "var(--Core-Green, #2E4028)",
                              lineHeight: "1",
                            }}
                          >
                            {isExpanded ? "−" : "+"}
                          </Text>
                        </Box>

                        {/* Person Name */}
                        <Text
                          sx={{
                            fontFamily: '"Cormorant Garamond", serif',
                            fontSize: { base: "24px", md: "32px" },
                            fontWeight: 600,
                            lineHeight: "90%",
                            color: "var(--Secondary-Dark-Green, #1A1F16)",
                            textAlign: "left",
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
                            fontSize: "18px",
                            fontWeight: 600,
                            lineHeight: "150%",
                            color: "var(--Secondary-Dark-Green, #1A1F16)",
                            textAlign: "center",
                          }}
                        >
                          {year}
                        </Text>
                      )}
                    </Button>

                    {/* Expandable Details */}
                    <Collapse in={isExpanded} animateOpacity>
                      <Box pl="20px" mt="24px" py={0} overflow="hidden">
                        <VStack spacing={0} align="stretch" w="full">
                          {detailItems.map((item, itemIndex) => {
                            const isLastItem =
                              itemIndex === detailItems.length - 1;
                            const shouldShowBorder =
                              person.notes || !isLastItem;

                            return (
                              <Flex
                                key={itemIndex}
                                justify="space-between"
                                align="start"
                                py="12px"
                                borderBottom={
                                  shouldShowBorder
                                    ? "1px solid #B7BEA3"
                                    : "none"
                                }
                              >
                                <Text
                                  sx={{
                                    fontFamily: '"Host Grotesk", sans-serif',
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    lineHeight: "normal",
                                    color: "var(--Core-Green, #2E4028)",
                                  }}
                                >
                                  {item.label}
                                </Text>
                                <Text
                                  sx={{
                                    fontFamily: '"Host Grotesk", sans-serif',
                                    fontSize: "16px",
                                    fontWeight: 400,
                                    lineHeight: "normal",
                                    color: "var(--Core-Green, #2E4028)",
                                  }}
                                >
                                  {item.value}
                                </Text>
                              </Flex>
                            );
                          })}

                          {/* Notes */}
                          {person.notes && (
                            <Box py="12px">
                              <VStack spacing="4px" align="start" w="full">
                                <Text
                                  sx={{
                                    fontFamily: '"Host Grotesk", sans-serif',
                                    fontSize: "20px",
                                    fontWeight: 600,
                                    color:
                                      "var(--Secondary-Dark-Green, #1A1F16)",
                                  }}
                                >
                                  Notes
                                </Text>
                                <Text
                                  sx={{
                                    fontFamily: '"Host Grotesk", sans-serif',
                                    fontSize: "16px",
                                    fontWeight: 400,
                                    lineHeight: "normal",
                                    color: "var(--Core-Green, #2E4028)",
                                    whiteSpace: "pre-wrap",
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
                      <Box py={{ base: "8px", md: "24px" }}>
                        <Box h="1px" w="full" bg="rgba(46, 64, 40, 0.2)" />
                      </Box>
                    )}
                  </Box>
                );
              })}
            </VStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
