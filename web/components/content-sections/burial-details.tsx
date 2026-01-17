"use client";

import { Box, Container, Flex, Text, VStack } from "@chakra-ui/react";
import { Grave } from "../../types";

interface BurialDetailsProps {
  grave: Grave;
}

export function BurialDetails({ grave }: BurialDetailsProps) {
  // Get person name
  const getPersonName = (): string => {
    if (grave.persons && grave.persons.length > 0) {
      const firstPerson = grave.persons[0];
      if (firstPerson.name) {
        const name = firstPerson.name.trim();
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
      }
    }
    return grave.familySurname || "Unknown";
  };

  const personName = getPersonName();
  const firstPerson =
    grave.persons && grave.persons.length > 0 ? grave.persons[0] : null;

  // Build detail items
  const detailItems = [];

  if (firstPerson?.dateBurial) {
    detailItems.push({
      label: "Buried Date",
      value: firstPerson.dateBurial,
    });
  }

  if (firstPerson?.age) {
    detailItems.push({
      label: "Age",
      value: String(firstPerson.age),
    });
  }

  if (firstPerson?.official) {
    detailItems.push({
      label: "Official",
      value: firstPerson.official,
    });
  }

  if (firstPerson?.groReference) {
    detailItems.push({
      label: "GRO Record",
      value: firstPerson.groReference,
    });
  }

  if (firstPerson?.baptism) {
    detailItems.push({
      label: "Baptised",
      value: firstPerson.baptism,
    });
  }

  if (firstPerson?.parents) {
    detailItems.push({
      label: "Parents",
      value: firstPerson.parents,
    });
  }

  if (firstPerson?.brcri) {
    detailItems.push({
      label: "Birth Record Civil Registration Index",
      value: firstPerson.brcri,
    });
  }

  return (
    <Box bg="white" w="full">
      <Container
        maxW="container.xl"
        px={{ base: "24px", md: "64px" }}
        py={{ base: "24px", md: "64px" }}
      >
        <Box maxW="800px" mx="auto">
          <VStack spacing="24px" align="stretch" w="full">
            {/* Header */}
            <VStack spacing="16px" align="start" w="full">
              <Text
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: {base: '32px', md: '48px'},
                  fontWeight: 600,
                  lineHeight: "90%",
                  color: "var(--Core-Green, #2E4028)",
                  whiteSpace: "pre-wrap",
                }}
              >
                Burial Details
              </Text>
              <Text
                sx={{
                  fontFamily: '"Host Grotesk", sans-serif',
                  fontSize: "16px",
                  fontWeight: 400,
                  color: "var(--Core-Green, #2E4028)",
                  lineHeight: "normal",
                }}
              >
                Please see below for the details on {personName}.
              </Text>
            </VStack>

            {/* Details List */}
            <VStack spacing={0} align="stretch" w="full">
              {detailItems.map((item, index) => (
                <Flex
                  key={index}
                  justify="space-between"
                  align="start"
                  py="12px"
                  borderBottom="1px solid #D3D3D3"
                >
                  <Text
                    sx={{
                      fontFamily: '"Host Grotesk", sans-serif',
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "var(--Core-Green, #2E4028)",
                      lineHeight: "normal",
                      textAlign: "left",
                    }}
                  >
                    {item.label}
                  </Text>
                  <Text
                    sx={{
                      fontFamily: '"Host Grotesk", sans-serif',
                      fontSize: "16px",
                      fontWeight: 400,
                      color: "var(--Core-Green, #2E4028)",
                      lineHeight: "normal",
                      textAlign: "right",
                    }}
                  >
                    {item.value}
                  </Text>
                </Flex>
              ))}
              {/* Notes Section */}
              {firstPerson?.notes && (
                <Box mt="12px">
                  <VStack spacing="4px" align="start" w="full">
                    <Text
                      sx={{
                        fontFamily: '"Host Grotesk", sans-serif',
                        fontSize: {base: '16px', md: '20px'},
                        fontWeight: 600,
                        color: "var(--Secondary-Dark-Green, #1A1F16)",
                      }}
                    >
                      Notes
                    </Text>
                    <Text
                      sx={{
                        fontFamily: '"Host Grotesk", sans-serif',
                        fontSize: {base: '16px', md: '18px'},
                        fontWeight: 400,
                        color: "var(--Secondary-Dark-Green, #1A1F16)",
                        lineHeight: "1.5",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {firstPerson.notes}
                    </Text>
                  </VStack>
                </Box>
              )}
            </VStack>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}
