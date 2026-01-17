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

// SVG Separator Pattern Component - Using background-image with data URI
function GraveSearchSeparator() {
  // SVG icon as data URI - maintains original 11x10 size and repeats
  const svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none"><path d="M0.353554 10L5.35355 5M10.3536 0L5.35355 5M5.35355 5L10.3536 10L0.353554 0" stroke="#A3B18A"/></svg>'
  const svgPattern = encodeURIComponent(svgString)

  return (
    <Box 
      w="full"
      bg="transparent"
      overflow="hidden"
      position="relative"
      style={{
        backgroundImage: `url("data:image/svg+xml,${svgPattern}")`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: '11px 10px',
        backgroundPosition: '0 50%',
        height: '10px',
      }}
    />
  )
}

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

      // Search by person names (full name, first name, or last name)
      if (grave.persons && Array.isArray(grave.persons)) {
        return grave.persons.some((person) => {
          if (!person.name) return false;
          const personName = person.name.toLowerCase();
          // Check if query matches the full name
          if (personName.includes(query)) {
            return true;
          }
          // Split name into parts (handles formats like "LASTNAME, FIRSTNAME" or "FIRSTNAME LASTNAME")
          const nameParts = personName
            .split(/[,\s]+/)
            .map((part) => part.trim())
            .filter(Boolean);
          // Check if query matches any part of the name (first name or last name)
          return nameParts.some((part) => part.includes(query));
        });
      }

      return false;
    });
    console.log("Search query:", query, "Results:", results.length);
    return results;
  }, [graves, searchQuery]);

  // Helper function to highlight all matching text occurrences
  const highlightMatch = (text: string | undefined, query: string) => {
    if (!text || !query) return text || "";

    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    
    // Find all occurrences of the query
    const matches: Array<{ start: number; end: number }> = [];
    let startIndex = 0;
    
    while (true) {
      const index = lowerText.indexOf(lowerQuery, startIndex);
      if (index === -1) break;
      matches.push({ start: index, end: index + query.length });
      startIndex = index + 1;
    }

    if (matches.length === 0) return text;

    // Build the highlighted result
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    matches.forEach((match, idx) => {
      // Add text before the match
      if (match.start > lastIndex) {
        parts.push(
          <Box 
            key={`before-${idx}`}
            as="span" 
            sx={{
              fontFamily: '"Host Grotesk", sans-serif',
              fontWeight: 400,
            }}
          >
            {text.substring(lastIndex, match.start)}
          </Box>
        );
      }
      
      // Add the highlighted match
      parts.push(
        <Box 
          key={`match-${idx}`}
          as="span" 
          sx={{
            fontFamily: '"Host Grotesk", sans-serif',
            fontWeight: 600,
            textDecoration: "underline",
          }}
        >
          {text.substring(match.start, match.end)}
        </Box>
      );
      
      lastIndex = match.end;
    });

    // Add remaining text after the last match
    if (lastIndex < text.length) {
      parts.push(
        <Box 
          key="after"
          as="span"
          sx={{
            fontFamily: '"Host Grotesk", sans-serif',
            fontWeight: 400,
          }}
        >
          {text.substring(lastIndex)}
        </Box>
      );
    }

    return <>{parts}</>;
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

  const handleReset = () => {
    setSearchQuery("");
    setSearchPerformed(false);
  };

  return (
    <Box>
      {/* Top Separator */}
      <GraveSearchSeparator />
      
      <Box
        py={{ base: "32px", md: "128px" }}
        px={{ base: "24px", md: "10px" }}
        sx={{
          background:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.50) 100%), #A3B18A",
        }}
      >
        <Container maxW="container.lg">
        <VStack spacing={{ base: "24px", md: "32px" }} align="center" justify="center">
          <VStack spacing={{ base: "12px", md: "16px" }} align="center">
            <Heading
              as="h2"
              textAlign="center"
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: { base: "32px", md: "48px" },
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "90%",
                color: "#1A1F16",
                whiteSpace: "pre-wrap",
              }}
            >
              {titleText}
            </Heading>

            {bodyText && bodyText.length > 0 && (
              <Text
                textAlign="center"
                maxW="600px"
                sx={{
                  fontFamily: '"Host Grotesk", sans-serif',
                  fontSize: { base: "16px", md: "18px" },
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "150%",
                  color: "#2E4028",
                  "& p": { 
                    mb: 0,
                    fontFamily: '"Host Grotesk", sans-serif',
                    fontSize: { base: "16px", md: "18px" },
                    fontWeight: 400,
                    lineHeight: "150%",
                    color: "#2E4028",
                  },
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
                    fontSize: { base: "16px", md: "18px" },
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "150%",
                    color: "#1A1F16",
                    _placeholder: {
                      color: "rgba(0, 0, 0, 0.3)",
                      fontFamily: '"Host Grotesk", sans-serif',
                      fontSize: { base: "16px", md: "18px" },
                      fontWeight: 400,
                      lineHeight: "150%",
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
                <Text 
                  textAlign="center" 
                  color="gray.500" 
                  mt={6}
                  sx={{
                    fontFamily: '"Host Grotesk", sans-serif',
                    fontSize: { base: "16px", md: "18px" },
                    fontWeight: 400,
                    lineHeight: "150%",
                  }}
                >
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
                              borderColor="#A3B18A"
                              _hover={{ bg: "gray.50" }}
                              transition="all 0.2s"
                            >
                              <Box flex={1}>
                                <Text
                                  sx={{
                                    fontFamily: '"Host Grotesk", sans-serif',
                                    fontSize: { base: "16px", md: "18px" },
                                    fontWeight: 400,
                                    lineHeight: "150%",
                                    color: "#1A1F16",
                                  }}
                                >
                                  {/* Display family surname if available */}
                                  {grave.familySurname && (
                                    <>
                                      {highlightMatch(
                                        grave.familySurname,
                                        searchQuery
                                      )}
                                      {grave.persons &&
                                        grave.persons.some(
                                          (p) => p.name
                                        ) && (
                                        <span>, </span>
                                      )}
                                    </>
                                  )}
                                  {/* Display all person names */}
                                  {grave.persons &&
                                    grave.persons.length > 0 &&
                                    grave.persons
                                      .map((person) => person.name)
                                      .filter((name): name is string =>
                                        Boolean(name)
                                      )
                                      .map((name, idx, arr) => (
                                        <span key={idx}>
                                          {highlightMatch(name, searchQuery)}
                                          {idx < arr.length - 1 && ", "}
                                        </span>
                                      ))}
                                  {/* Fallback to grave number if no names */}
                                  {!grave.familySurname &&
                                    (!grave.persons ||
                                      grave.persons.length === 0 ||
                                      !grave.persons.some((p) => p.name)) && (
                                    <>Grave {grave.graveNo}</>
                                  )}
                                </Text>
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
                  <Box
                    w="full"
                    maxW="520px"
                    bg="white"
                    borderTopRadius={0}
                    borderRadius="2px"
                    borderTopWidth="1px"
                    borderTopColor="rgba(0, 0, 0, 0.1)"
                    px={{ base: "24px", md: "24px" }}
                    py={{ base: "16px", md: "16px" }}
                  >
                    <Flex
                      align="center"
                      justify="space-between"
                      w="full"
                    >
                      <Text
                        sx={{
                          fontFamily: '"Host Grotesk", sans-serif',
                          fontSize: {base: "16px", md: "18px"},
                          fontStyle: "normal",
                          fontWeight: 700,
                          lineHeight: "150%",
                          color: "var(--Secondary-Dark-Green, #1A1F16)",
                        }}
                      >
                        No Results
                      </Text>
                      <Box
                        as="button"
                        onClick={handleReset}
                        cursor="pointer"
                        sx={{
                          fontFamily: '"Host Grotesk", sans-serif',
                          fontSize: { base: "16px", md: "18px" },
                          fontStyle: "normal",
                          fontWeight: 400,
                          lineHeight: "normal",
                          color: "rgba(0, 0, 0, 0.3)",
                          textDecoration: "underline",
                          bg: "transparent",
                          border: "none",
                          _hover: {
                            opacity: 0.8,
                          },
                        }}
                      >
                        Reset
                      </Box>
                    </Flex>
                  </Box>
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
                  fontSize: { base: "16px", md: "18px" },
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
                maxW="520px"
              />
            </VStack>
          )}
        </VStack>
      </Container>
      </Box>
      
      {/* Bottom Separator */}
      <GraveSearchSeparator />
    </Box>
  );
}