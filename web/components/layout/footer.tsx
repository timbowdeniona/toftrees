'use client'

import {
  Box,
  Container,
  Flex,
  HStack,
  VStack,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react'
import Image from 'next/image'
import Link from 'next/link'
import { FooterConfig } from '../../types'
import siteConfig from '../../data/config'

export interface FooterProps {
  config?: FooterConfig
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  // Fallback to default config if no CMS config is provided
  const copyrightText = config?.copyrightText || siteConfig.footer.copyright
  const navigationLinks = config?.navigationLinks || siteConfig.footer?.links || []
  const additionLinks = config?.additionLinks || []

  return (
    <Box
      bg="#1A1F16"
      color="white"
    >
      <Container maxW="container.2xl" px={{ base: 6, md: "120px" }} py={{ base: 12, md: "120px" }}>
        <Flex
          direction="column"
          gap={{ base: "24px", md: "48px" }}
          align="center"
          justify="center"
        >
          {/* Main Section: Logo and Navigation */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-between"
            w="full"
            maxW="1680px"
          >
            {/* Logo */}
            <Box flexShrink={0} h={{ base: "32px", md: "72px" }} w={{ base: "147px", md: "324px" }} position="relative">
              <Image
                src="/logo-footer.svg"
                alt="All Saints Church Toftrees"
                width={324}
                height={72}
                priority
                style={{ height: '100%', width: 'auto' }}
              />
            </Box>

            {/* Navigation Links - Hidden on mobile */}
            {navigationLinks.length > 0 && (
              <HStack
                spacing="64px"
                align="center"
                display={{ base: 'none', md: 'flex' }}
              >
                {navigationLinks.map((link, index) => (
                  <VStack
                    key={link._key || `${link.url}-${index}`}
                    spacing="4px"
                    align="center"
                    h="24px"
                  >
                    <ChakraLink
                      as={Link}
                      href={link.url}
                      sx={{
                        fontFamily: '"Cormorant Garamond", serif',
                        fontSize: "18px",
                        fontStyle: "normal",
                        fontWeight: 600,
                        lineHeight: "normal",
                        letterSpacing: "2.16px",
                        textTransform: "uppercase",
                        color: "white",
                        textDecoration: "none",
                        _hover: { opacity: 0.8 },
                      }}
                    >
                      {link.label}
                    </ChakraLink>
                    <Box w="0" h="1px" bg="white" />
                  </VStack>
                ))}
              </HStack>
            )}
          </Flex>

          {/* Bottom Section: Copyright and Links */}
          <VStack
            spacing={{ base: "8px", md: 0 }}
            align="center"
            justify="center"
            w="full"
            sx={{
              fontFamily: '"Host Grotesk", sans-serif',
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "150%",
            }}
          >
            {/* Mobile: Stack all items vertically, centered */}
            <VStack
              spacing="8px"
              align="center"
              display={{ base: 'flex', md: 'none' }}
              w="full"
            >
              <Text fontSize="12px" fontWeight={300} lineHeight="150%" color="white">
                {copyrightText}
              </Text>

              {additionLinks.map((link: { _key?: string; label: string; url: string }, index: number) => (
                <ChakraLink
                  key={link._key || `${link.url}-${index}`}
                  as={Link}
                  href={link.url}
                  fontSize="12px"
                  fontWeight={300}
                  lineHeight="150%"
                  color="white"
                  textDecoration="none"
                  _hover={{ textDecoration: 'underline' }}
                >
                  {link.label}
                </ChakraLink>
              ))}

              <Text
                fontSize="12px"
                fontWeight={300}
                lineHeight="150%"
                color="#A3B18A"
                textDecoration="underline"
              >
                Website produced by Timberyard
              </Text>
            </VStack>

            {/* Desktop: Horizontal layout */}
            <Flex
              direction="row"
              align="center"
              justify="space-between"
              w="full"
              display={{ base: 'none', md: 'flex' }}
            >
              <HStack spacing="24px" align="center" color="white">
                <Text fontSize="12px" fontWeight={300} lineHeight="150%">
                  {copyrightText}
                </Text>

                {additionLinks.map((link: { _key?: string; label: string; url: string }, index: number) => (
                  <ChakraLink
                    key={link._key || `${link.url}-${index}`}
                    as={Link}
                    href={link.url}
                    fontSize="12px"
                    fontWeight={300}
                    lineHeight="150%"
                    color="white"
                    textDecoration="none"
                    _hover={{ textDecoration: 'underline' }}
                  >
                    {link.label}
                  </ChakraLink>
                ))}
              </HStack>

              <Text
                fontSize="12px"
                fontWeight={300}
                lineHeight="150%"
                color="#A3B18A"
                textDecoration="underline"
              >
                Website produced by Timberyard
              </Text>
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Box>
  )
}
