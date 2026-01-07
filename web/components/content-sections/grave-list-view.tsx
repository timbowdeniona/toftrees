"use client";

import { Box, Container, Flex, Text, VStack, Popover, PopoverTrigger, PopoverContent, PopoverArrow, IconButton } from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { Grave, ImageMap, Hotspot } from "../../types";
import Image from "next/image";
import { urlFor } from "../../sanity/client";
import Link from "next/link";
import { AlphabetNavigation } from "./alphabet-navigation";

type ViewType = "list" | "map";

interface GraveListViewProps {
  graves?: Grave[];
  imageMap?: ImageMap;
  searchQuery?: string;
}

export function GraveListView({
  graves = [],
  imageMap,
  searchQuery = "",
}: GraveListViewProps) {
  const [viewType, setViewType] = useState<ViewType>("list");
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  // Filter hotspots based on search query for map view
  const filteredHotspots = useMemo(() => {
    if (!imageMap?.hotspots) return [];
    if (!searchQuery.trim()) return imageMap.hotspots;

    const query = searchQuery.toLowerCase().trim();
    return imageMap.hotspots.filter((hotspot) => {
      const grave = hotspot.grave && typeof hotspot.grave === 'object' && '_id' in hotspot.grave ? hotspot.grave : null;
      if (!grave) return false;

      // Search by family surname
      if (grave.familySurname?.toLowerCase().includes(query)) {
        return true;
      }

      // Search by person names
      if (grave.persons && grave.persons.length > 0) {
        return grave.persons.some((person) =>
          person.name?.toLowerCase().includes(query)
        );
      }

      // Search by grave number
      if (grave.graveNo?.toString().includes(query)) {
        return true;
      }

      return false;
    });
  }, [imageMap, searchQuery]);


  // Filter graves based on search query
  const filteredGraves = useMemo(() => {
    if (!searchQuery.trim()) return graves;

    const query = searchQuery.toLowerCase().trim();
    return graves.filter((grave) => {
      // Search by family surname
      if (grave.familySurname?.toLowerCase().includes(query)) {
        return true;
      }

      // Search by person names
      if (grave.persons && grave.persons.length > 0) {
        return grave.persons.some((person) =>
          person.name?.toLowerCase().includes(query)
        );
      }

      // Search by grave number
      if (grave.graveNo?.toString().includes(query)) {
        return true;
      }

      return false;
    });
  }, [graves, searchQuery]);

  // Group graves by first letter of surname
  const groupedGraves = useMemo(() => {
    const groups: Record<string, Grave[]> = {};

    filteredGraves.forEach((grave) => {
      const surname = grave.familySurname || "";
      const firstLetter = surname.charAt(0).toUpperCase();
      if (firstLetter && /[A-Z]/.test(firstLetter)) {
        if (!groups[firstLetter]) {
          groups[firstLetter] = [];
        }
        groups[firstLetter].push(grave);
      }
    });

    // Sort each group by surname
    Object.keys(groups).forEach((letter) => {
      groups[letter].sort((a, b) => {
        const surnameA = (a.familySurname || "").toUpperCase();
        const surnameB = (b.familySurname || "").toUpperCase();
        return surnameA.localeCompare(surnameB);
      });
    });

    // Sort letters alphabetically
    return Object.keys(groups)
      .sort()
      .reduce(
        (acc, letter) => {
          acc[letter] = groups[letter];
          return acc;
        },
        {} as Record<string, Grave[]>
      );
  }, [filteredGraves]);

  // Get earliest year from persons for each grave
  const getEarliestYear = (grave: Grave): string => {
    if (!grave.persons || grave.persons.length === 0) return "";
    const years = grave.persons
      .map((person) => person.year)
      .filter((year): year is number => typeof year === "number");
    if (years.length === 0) return "";
    return Math.min(...years).toString();
  };

  return (
    <Box id="grave-list-view" w="full" py={{ base: "32px", md: "32px" }}>
      <Container maxW="100%" px={0}>
        <VStack spacing={8} align="stretch">
          {/* Toggle Navigation */}
          <Flex justify="center" gap="64px" align="start" py="32px">
            <Box
              as="button"
              onClick={() => setViewType("list")}
              cursor="pointer"
              display="flex"
              flexDirection="column"
              gap="4px"
              alignItems="center"
              position="relative"
            >
              <Text
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "normal",
                  color: "#2E4028",
                  textTransform: "uppercase",
                  letterSpacing: "2.16px",
                }}
              >
                List View
              </Text>
              <Box
                h="1px"
                w="full"
                bg={viewType === "list" ? "#2E4028" : "transparent"}
                flexShrink={0}
              />
            </Box>
            <Box
              as="button"
              onClick={() => setViewType("map")}
              cursor="pointer"
              display="flex"
              flexDirection="column"
              gap="4px"
              alignItems="center"
              position="relative"
            >
              <Text
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: "18px",
                  fontWeight: 600,
                  lineHeight: "normal",
                  color: "#2E4028",
                  textTransform: "uppercase",
                  letterSpacing: "2.16px",
                }}
              >
                Map View
              </Text>
              <Box
                h="1px"
                w="full"
                bg={viewType === "map" ? "#2E4028" : "transparent"}
                flexShrink={0}
              />
            </Box>
          </Flex>

          {/* List View */}
          {viewType === "list" && (
            <Box
              w="full"
              position="relative"
              py="128px"
            >
              {/* Alphabet Navigation - Absolute positioned, 24px from left */}
              <Box 
                display={{ base: "none", md: "block" }} 
                position="absolute"
                left="24px"
                top="128px"
                pt="40px"
              >
                <AlphabetNavigation />
              </Box>

              {/* List - Centered */}
              <Box position="relative" maxW="544px" mx="auto">
              {/* Sticky Header */}
              <Box
                position="sticky"
                top="0"
                bg="white"
                zIndex={10}
                py="8px"
                borderBottom="1px solid #2E4028"
                mb="24px"
              >
                <Flex justify="space-between" align="end">
                  <Text
                    sx={{
                      fontFamily: '"Host Grotesk", sans-serif',
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "normal",
                      color: "#6B7A52",
                      textTransform: "uppercase",
                      letterSpacing: "2.24px",
                    }}
                  >
                    Name
                  </Text>
                  <Text
                    sx={{
                      fontFamily: '"Host Grotesk", sans-serif',
                      fontSize: "14px",
                      fontWeight: 600,
                      lineHeight: "normal",
                      color: "#6B7A52",
                      textTransform: "uppercase",
                      letterSpacing: "2.24px",
                    }}
                  >
                    Burial Year
                  </Text>
                </Flex>
              </Box>

              {/* Grave List by Letter */}
              {Object.keys(groupedGraves).length === 0 ? (
                <Box py="48px" textAlign="center">
                  <Text
                    sx={{
                      fontFamily: '"Host Grotesk", sans-serif',
                      fontSize: "18px",
                      color: "#2E4028",
                    }}
                  >
                    {searchQuery
                      ? `No graves found matching "${searchQuery}"`
                      : "No graves available"}
                  </Text>
                </Box>
              ) : (
                <VStack spacing={0} align="stretch">
                  {Object.entries(groupedGraves).map(
                    ([letter, letterGraves]) => (
                      <Box key={letter} py="24px" id={`letter-section-${letter}`}>
                        {/* Letter Header */}
                        <Box
                          display="flex"
                          alignItems="center"
                          justifyContent="flex-start"
                          pb="24px"
                          pt={0}
                          px={0}
                          w="full"
                        >
                          <Text
                            sx={{
                              fontFamily: '"Cormorant Garamond", serif',
                              fontSize: "48px",
                              fontWeight: 600,
                              lineHeight: "normal",
                              color: "#2E4028",
                              textTransform: "uppercase",
                              letterSpacing: "5.76px",
                              whiteSpace: "pre-wrap",
                              textAlign: "left",
                            }}
                          >
                            {letter}
                          </Text>
                        </Box>

                        {/* Grave Items */}
                        <VStack spacing={0} align="stretch" w="full">
                          {letterGraves.map((grave) => {
                            const earliestYear = getEarliestYear(grave);
                            // Format name as "LASTNAME, FIRSTNAME" or just surname if no persons
                            let displayName = "";
                            if (grave.persons && grave.persons.length > 0) {
                              const names = grave.persons
                                .map((p) => {
                                  const name = p.name || "";
                                  if (!name) return "";
                                  // If name contains comma, assume it's already formatted
                                  if (name.includes(",")) return name;
                                  // Otherwise format as "LASTNAME, FIRSTNAME"
                                  const parts = name.trim().split(/\s+/);
                                  if (parts.length > 1) {
                                    const lastName = parts[parts.length - 1];
                                    const firstName = parts
                                      .slice(0, -1)
                                      .join(" ");
                                    return `${lastName.toUpperCase()}, ${firstName.toUpperCase()}`;
                                  }
                                  return name.toUpperCase();
                                })
                                .filter(Boolean);
                              displayName =
                                names.join(", ") ||
                                grave.familySurname?.toUpperCase() ||
                                "";
                            } else {
                              displayName =
                                grave.familySurname?.toUpperCase() || "";
                            }

                            return (
                              <Box
                                key={grave._id}
                                position="relative"
                                py="8px"
                                px={0}
                                w="full"
                                borderBottom="1px solid #D9D9D9"
                                overflow="hidden"
                                as={Link}
                                href={`/graves/${grave._id}`}
                                _hover={{
                                  bg: "rgba(46, 64, 40, 0.05)",
                                }}
                                transition="background-color 0.2s"
                                cursor="pointer"
                              >
                                <Flex
                                  justify="space-between"
                                  align="start"
                                  position="relative"
                                  gap="16px"
                                  w="full"
                                >
                                  <Text
                                    flex="1"
                                    minW={0}
                                    sx={{
                                      fontFamily: '"Cormorant Garamond", serif',
                                      fontSize: "16px",
                                      fontWeight: 600,
                                      lineHeight: "normal",
                                      color: "#2E4028",
                                      textTransform: "uppercase",
                                      letterSpacing: "1.92px",
                                      wordBreak: "break-word",
                                      overflowWrap: "break-word",
                                    }}
                                  >
                                    {displayName}
                                  </Text>
                                  {earliestYear && (
                                    <Text
                                      flexShrink={0}
                                      sx={{
                                        fontFamily:
                                          '"Host Grotesk", sans-serif',
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        lineHeight: "normal",
                                        color: "#2E4028",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      {earliestYear}
                                    </Text>
                                  )}
                                </Flex>
                              </Box>
                            );
                          })}
                        </VStack>
                      </Box>
                    )
                  )}
                </VStack>
              )}
              </Box>
            </Box>
          )}

          {/* Map View */}
          {viewType === "map" && (
            <Box
              w="full"
              position="relative"
              minH="600px"
              overflow="hidden"
              bg="#f5f5f5"
              borderRadius="4px"
            >
              {imageMap ? (
                <Box
                  position="relative"
                  w="full"
                  h="auto"
                >
                  <Image
                    src={urlFor(imageMap.image).url()}
                    alt="Graveyard Map"
                    width={1856}
                    height={2543}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />

                      {/* Render hotspots as markers */}
                      {(searchQuery.trim() ? filteredHotspots : imageMap.hotspots || []).map((hotspot) => {
                        const grave = hotspot.grave && typeof hotspot.grave === 'object' && '_id' in hotspot.grave ? hotspot.grave : null;
                        const isOpen = selectedHotspot?._key === hotspot._key;
                        const isHighlighted = searchQuery.trim() && filteredHotspots.some(h => h._key === hotspot._key);

                        return (
                        <Popover
                          key={hotspot._key}
                          isOpen={isOpen}
                          onOpen={() => setSelectedHotspot(hotspot)}
                          onClose={() => setSelectedHotspot(null)}
                          placement="auto"
                          closeOnBlur={true}
                          isLazy
                        >
                            <PopoverTrigger>
                              <Box
                                position="absolute"
                                left={`${hotspot.x}%`}
                                top={`${hotspot.y}%`}
                                transform="translate(-50%, -100%)"
                                w={isHighlighted ? "60px" : "50px"}
                                h={isHighlighted ? "60px" : "50px"}
                                cursor="pointer"
                                zIndex={isHighlighted ? 6 : 5}
                                onClick={() => setSelectedHotspot(hotspot)}
                                transition="all 0.2s ease"
                                _hover={{
                                  transform: "translate(-50%, -100%) scale(1.1)",
                                }}
                              >
                                <Image
                                  src="/pointer.svg"
                                  alt="Grave location marker"
                                  width={isHighlighted ? 60 : 50}
                                  height={isHighlighted ? 60 : 50}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                  }}
                                />
                              </Box>
                            </PopoverTrigger>
                            {grave && (
                              <PopoverContent
                                w={{ base: "calc(100vw - 48px)", md: "400px" }}
                                maxW="90vw"
                                maxH="80vh"
                                overflowY="auto"
                                border="none"
                                borderRadius="4px"
                                boxShadow="0px 4px 20px 0px rgba(0, 0, 0, 0.25)"
                                bg="white"
                                p={0}
                                pt="64px"
                                pb={{ base: "24px", md: "44px" }}
                                px={{ base: "24px", md: "32px" }}
                                position="relative"
                                zIndex={9999}
                                sx={{
                                  zIndex: "9999 !important",
                                  position: "fixed",
                                }}
                              >
                                <PopoverArrow bg="white" />
                                
                                {/* Close Button - Absolute positioned */}
                                <IconButton
                                  aria-label="Close"
                                  icon={
                                    <Box position="relative" w="14px" h="11px">
                                      <Box
                                        position="absolute"
                                        left="1.7px"
                                        top="50%"
                                        transform="translateY(-50%) rotate(45deg)"
                                        w="14px"
                                        h="1px"
                                        bg="#2E4028"
                                      />
                                      <Box
                                        position="absolute"
                                        left="1.7px"
                                        top="50%"
                                        transform="translateY(-50%) rotate(-45deg)"
                                        w="14px"
                                        h="1px"
                                        bg="#2E4028"
                                      />
                                    </Box>
                                  }
                                  position="absolute"
                                  top="0"
                                  right="0"
                                  size="44px"
                                  onClick={() => setSelectedHotspot(null)}
                                  bg="rgba(217, 203, 176, 0.3)"
                                  color="#2E4028"
                                  borderRadius="0"
                                  borderTopRightRadius="4px"
                                  _hover={{ bg: "rgba(217, 203, 176, 0.5)" }}
                                  minW="44px"
                                  h="44px"
                                />

                                <VStack spacing={{ base: "16px", md: "32px" }} align="stretch">
                                  {/* Header Section */}
                                  <Flex justify="space-between" align="start" w="full">
                                    <Text
                                      sx={{
                                        fontFamily: '"Cormorant Garamond", serif',
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        color: "#2E4028",
                                        textTransform: "uppercase",
                                        letterSpacing: "1.92px",
                                      }}
                                    >
                                      Grave
                                    </Text>
                                    {grave.graveNo && (
                                      <Text
                                        sx={{
                                          fontFamily: '"Host Grotesk", sans-serif',
                                          fontSize: "16px",
                                          fontWeight: 600,
                                          color: "#2E4028",
                                        }}
                                      >
                                        #{grave.graveNo}
                                      </Text>
                                    )}
                                  </Flex>

                                  {/* Table Headers - Sticky */}
                                  <Box
                                    position="sticky"
                                    top="0"
                                    bg="white"
                                    zIndex={10}
                                    pb="8px"
                                    borderBottom="1px solid #2E4028"
                                    w="full"
                                    overflow="hidden"
                                  >
                                    <Flex justify="space-between" align="end" w="full" gap="16px">
                                      <Text
                                        flex="1"
                                        minW={0}
                                        sx={{
                                          fontFamily: '"Host Grotesk", sans-serif',
                                          fontSize: "14px",
                                          fontWeight: 600,
                                          color: "#6B7A52",
                                          textTransform: "uppercase",
                                          letterSpacing: "2.24px",
                                        }}
                                      >
                                        Name
                                      </Text>
                                      <Text
                                        flexShrink={0}
                                        sx={{
                                          fontFamily: '"Host Grotesk", sans-serif',
                                          fontSize: "14px",
                                          fontWeight: 600,
                                          color: "#6B7A52",
                                          textTransform: "uppercase",
                                          letterSpacing: "2.24px",
                                        }}
                                      >
                                        Burial Year
                                      </Text>
                                    </Flex>
                                  </Box>

                                  {/* Table Rows */}
                                  <VStack spacing={0} align="stretch">
                                    {grave.persons && grave.persons.length > 0 ? (
                                      grave.persons.map((person, index) => {
                                        const totalPersons = grave.persons?.length || 0;
                                        // Format name as "LASTNAME, FIRSTNAME"
                                        let displayName = "";
                                        if (person.name) {
                                          const name = person.name.trim();
                                          if (name.includes(",")) {
                                            displayName = name;
                                          } else {
                                            const parts = name.split(/\s+/);
                                            if (parts.length > 1) {
                                              const lastName = parts[parts.length - 1];
                                              const firstName = parts.slice(0, -1).join(" ");
                                              displayName = `${lastName}, ${firstName}`;
                                            } else {
                                              displayName = name;
                                            }
                                          }
                                        } else if (grave.familySurname) {
                                          displayName = grave.familySurname;
                                        }

                                        return (
                                          <Box
                                            key={index}
                                            position="relative"
                                            py="8px"
                                            borderBottom={index < totalPersons - 1 ? "1px solid #D9D9D9" : "none"}
                                            w="full"
                                            overflow="hidden"
                                          >
                                            <Flex justify="space-between" align="start" w="full" gap="16px">
                                              <Text
                                                flex="1"
                                                minW={0}
                                                sx={{
                                                  fontFamily: '"Cormorant Garamond", serif',
                                                  fontSize: "16px",
                                                  fontWeight: 600,
                                                  color: "#2E4028",
                                                  textTransform: "uppercase",
                                                  letterSpacing: "1.92px",
                                                  wordBreak: "break-word",
                                                  overflowWrap: "break-word",
                                                }}
                                              >
                                                {displayName || grave.familySurname || ""}
                                              </Text>
                                              {person.year && (
                                                <Text
                                                  flexShrink={0}
                                                  sx={{
                                                    fontFamily: '"Host Grotesk", sans-serif',
                                                    fontSize: "16px",
                                                    fontWeight: 600,
                                                    color: "#2E4028",
                                                    textTransform: "uppercase",
                                                  }}
                                                >
                                                  {person.year}
                                                </Text>
                                              )}
                                            </Flex>
                                          </Box>
                                        );
                                      })
                                    ) : (
                                      <Box py="8px" w="full" overflow="hidden">
                                        <Flex justify="space-between" align="start" w="full" gap="16px">
                                          <Text
                                            flex="1"
                                            minW={0}
                                            sx={{
                                              fontFamily: '"Cormorant Garamond", serif',
                                              fontSize: "16px",
                                              fontWeight: 600,
                                              color: "#2E4028",
                                              textTransform: "uppercase",
                                              letterSpacing: "1.92px",
                                              wordBreak: "break-word",
                                              overflowWrap: "break-word",
                                            }}
                                          >
                                            {grave.familySurname || ""}
                                          </Text>
                                        </Flex>
                                      </Box>
                                    )}
                                  </VStack>
                                </VStack>
                              </PopoverContent>
                            )}
                          </Popover>
                        );
                      })}
                </Box>
              ) : (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  minH="600px"
                  color="#2E4028"
                >
                  <Text>Map not available</Text>
                </Box>
              )}
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
