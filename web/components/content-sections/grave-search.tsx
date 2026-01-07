"use client";

import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Link as ChakraLink,
  List,
  ListItem,
  Flex,
} from "@chakra-ui/react";
import { PortableText } from "@portabletext/react";
import { FaChevronRight } from "react-icons/fa";
import { useState, useMemo, useEffect } from "react";
import { client } from "../../sanity/client";
import { Grave } from "../../types";
import NextLink from "next/link";

interface GraveSearchProps {
  titleText: string;
  bodyText?: Array<{
    _type: string;
    _key: string;
    [key: string]: unknown;
  }>;
  searchBarPlaceholder: string;
  hyperlinkLabel?: string;
  hyperlinkUrl?: string;
}

export function GraveSearchSection({
  titleText,
  bodyText,
  searchBarPlaceholder,
  hyperlinkLabel,
  hyperlinkUrl,
}: GraveSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [graves, setGraves] = useState<Grave[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false);

  useEffect(() => {
    async function fetchGraves() {
      try {
        // Fetch all graves (both published and draft for search functionality)
        // In production, you might want to filter only published ones
        const fetchedGraves = await client.fetch<Grave[]>(`*[_type == "grave"]{
          _id,
          graveNo,
          familySurname,
          persons
        } | order(graveNo)`);
        console.log("Fetched graves:", fetchedGraves.length);
        setGraves(fetchedGraves);
      } catch (error) {
        console.error("Error fetching graves:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchGraves();
  }, []);

  const filteredGraves = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.toLowerCase().trim();
    const results = graves.filter((grave) => {
      // Search by grave number
      if (grave.graveNo?.toString().toLowerCase().includes(query)) {
        return true;
      }

      // Search by family surname
      if (grave.familySurname?.toLowerCase().includes(query)) {
        return true;
      }

      // Search by person names
      if (grave.persons && Array.isArray(grave.persons)) {
        return grave.persons.some((person) =>
          person.name?.toLowerCase().includes(query)
        );
      }

      return false;
    });
    console.log("Search query:", query, "Results:", results.length);
    return results;
  }, [graves, searchQuery]);

  // Helper function to highlight matching text
  const highlightMatch = (text: string | undefined, query: string) => {
    if (!text || !query) return text || "";

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const index = lowerText.indexOf(lowerQuery);

    if (index === -1) return text;

    const before = text.substring(0, index);
    const match = text.substring(index, index + query.length);
    const after = text.substring(index + query.length);

    return (
      <>
        <Box as="span" fontWeight="normal">{before}</Box>
        <Box as="span" fontWeight="bold" textDecoration="underline">
          {match}
        </Box>
        <Box as="span" fontWeight="normal">{after}</Box>
      </>
    );
  };

  const handleSearch = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (searchQuery.trim()) {
      setSearchPerformed(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    // Auto-search as user types (optional - you can remove this if you prefer search only on submit)
    if (value.trim()) {
      setSearchPerformed(true);
    } else {
      setSearchPerformed(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box
      py={{ base: 12, md: "128px" }}
      px={{ base: 4, md: "10px" }}
      sx={{
        background:
          "linear-gradient(0deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.50) 100%), #A3B18A",
      }}
    >
      <Container maxW="container.lg">
        <VStack spacing="24px" align="center" justify="center">
          <VStack spacing="16px" align="center">
            <Heading
              as="h2"
              textAlign="center"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "48px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "90%",
                color: "#1A1F16",
              }}
            >
              {titleText}
            </Heading>

            {bodyText && bodyText.length > 0 && (
              <Text
                textAlign="center"
                sx={{
                  fontFamily: '"Host Grotesk", sans-serif',
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "150%",
                  color: "#2E4028",
                  "& p": { mb: 0 },
                }}
              >
                <PortableText value={bodyText} />
              </Text>
            )}
          </VStack>

          <Box as="form" onSubmit={handleSearch} w="full" maxW="520px">
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                bg="white"
                border="1px solid rgba(0, 0, 0, 0.1)"
                borderRadius="2px"
                overflow="hidden"
              >
                <Box
                  as="input"
                  type="text"
                  placeholder={searchBarPlaceholder}
                  value={searchQuery}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  flex="1"
                  px="24px"
                  py="16px"
                  border="none"
                  outline="none"
                  bg="transparent"
                  sx={{
                    fontFamily: '"Host Grotesk", sans-serif',
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "150%",
                    color: "#1A1F16",
                    _placeholder: {
                      color: "rgba(0, 0, 0, 0.3)",
                    },
                    "&:focus": {
                      outline: "none",
                    },
                  }}
                />
                <Box
                  as="button"
                  onClick={handleSearch}
                  w="64px"
                  h="44px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="white"
                  border="none"
                  cursor="pointer"
                  type="button"
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                >
                  <svg
                    width="19"
                    height="8"
                    viewBox="0 0 19 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect y="3.5" width="16" height="1" fill="#2E4028" />
                    <path
                      d="M18.5 4H18.3738M18.3738 4C16.2492 3.89744 12 2.95385 12 0M18.3738 4C16.2492 4.10256 12 5.04615 12 8"
                      stroke="#2E4028"
                      strokeWidth="1"
                    />
                  </svg>
                </Box>
              </Box>
              {isLoading ? (
                <Text textAlign="center" color="gray.500" mt={6}>
                  Loading graves...
                </Text>
              ) : searchPerformed ? (
                filteredGraves.length > 0 ? (
                  <Box
                    w="full"
                    maxW="520px"
                    bg="white"
                    borderTopRadius={0}
                    borderRadius="2px"
                    borderTopWidth="1px"
                    borderTopColor="rgba(0, 0, 0, 0.1)"
                    overflow="hidden"
                  >
                    <Box
                      maxH="320px"
                      overflowY="auto"
                      sx={{
                        "&::-webkit-scrollbar": {
                          width: "8px",
                        },
                        "&::-webkit-scrollbar-track": {
                          bg: "gray.100",
                          borderRadius: "4px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          bg: "gray.400",
                          borderRadius: "4px",
                          "&:hover": {
                            bg: "gray.500",
                          },
                        },
                      }}
                    >
                      <List spacing={0}>
                        {filteredGraves.map((grave, index) => (
                          <ListItem key={grave._id}>
                            <Flex
                              as={NextLink}
                              href={`/graves/${grave._id}`}
                              align="center"
                              justify="space-between"
                              p={4}
                              borderBottom={
                                index < filteredGraves.length - 1
                                  ? "1px solid"
                                  : "none"
                              }
                              borderColor="gray.200"
                              _hover={{ bg: "gray.50" }}
                              transition="all 0.2s"
                            >
                              <Box flex={1}>
                                {grave.familySurname ? (
                                  <Text
                                    fontSize="md"
                                    fontWeight="normal"
                                    color="#1A1F16"
                                  >
                                    {highlightMatch(
                                      grave.familySurname,
                                      searchQuery
                                    )}
                                  </Text>
                                ) : grave.persons &&
                                  grave.persons.length > 0 ? (
                                  <Text
                                    fontSize="md"
                                    fontWeight="normal"
                                    color="#1A1F16"
                                  >
                                    {grave.persons
                                      .map((person) => person.name)
                                      .filter((name): name is string =>
                                        Boolean(name)
                                      )
                                      .map((name, idx) => (
                                        <span key={idx}>
                                          {idx > 0 && ", "}
                                          {highlightMatch(name, searchQuery)}
                                        </span>
                                      ))}
                                  </Text>
                                ) : (
                                  <Text
                                    fontSize="md"
                                    fontWeight="normal"
                                    color="#1A1F16"
                                  >
                                    Grave {grave.graveNo}
                                  </Text>
                                )}
                              </Box>
                              <Box ml={4}>
                                <FaChevronRight color="gray.400" size={14} />
                              </Box>
                            </Flex>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </Box>
                ) : (
                  <Text
                    textAlign="center"
                    color="gray.600"
                    _dark={{ color: "gray.400" }}
                    mt={6}
                  >
                    No graves found.
                  </Text>
                )
              ) : null}
          </Box>

          {hyperlinkLabel && hyperlinkUrl && (
            <VStack spacing="4px" align="center">
              <ChakraLink
                as={NextLink}
                href={hyperlinkUrl}
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "normal",
                  letterSpacing: "2.16px",
                  textTransform: "uppercase",
                  color: "#2E4028",
                  textDecoration: "none",
                  _hover: { opacity: 0.8 },
                }}
              >
                {hyperlinkLabel}
              </ChakraLink>
              <Box
                w="full"
                h="1px"
                bg="#2E4028"
              />
            </VStack>
          )}
        </VStack>
      </Container>
    </Box>
  );
}