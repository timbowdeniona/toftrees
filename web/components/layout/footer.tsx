'use client'

import {
  Box,
  Container,
  Flex,
  HStack,
  Stack,
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

  const privacyLink =
    config?.privacyPolicyLabel && config?.privacyPolicyUrl
      ? { label: config.privacyPolicyLabel, url: config.privacyPolicyUrl }
      : null

  const termsLink =
    config?.termsLabel && config?.termsUrl
      ? { label: config.termsLabel, url: config.termsUrl }
      : null

  return (
    <Box
      bg="#0d120e"
      color="#dcd7c9"
      borderTopWidth="1px"
      borderColor="rgba(255,255,255,0.06)"
    >
      <Container maxW="container.2xl" px={{ base: 6, md: 120 }} py={{ base: 8, md: 120 }}>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 8, md: 10 }}
          align={{ base: 'flex-start', md: 'center' }}
          justify="space-between"
        >
          <Stack spacing={4}>
            <Flex align="center" gap={3}>
              <Box flexShrink={0} height="36px">
                <Image
                  src="/logo-footer.svg"
                  alt="All Saints Church Toftrees"
                  width={180}
                  height={40}
                  priority
                  style={{ height: '100%', width: 'auto' }}
                />
              </Box>
            </Flex>
          </Stack>

          {navigationLinks.length > 0 && (
            <HStack
              spacing={{ base: 4, md: 8 }}
              flexWrap="wrap"
              justify={{ base: 'flex-start', md: 'flex-end' }}
            >
              {navigationLinks.map((link, index) => (
                <ChakraLink
                  key={link._key || `${link.url}-${index}`}
                  as={Link}
                  href={link.url}
                  color="#e8e3d6"
                  fontSize="18px"
                  fontWeight={600}
                  lineHeight="normal"
                  letterSpacing="2.16px"
                  textTransform="uppercase"
                  _hover={{ color: 'white', textDecoration: 'underline' }}
                >
                  {link.label}
                </ChakraLink>
              ))}
            </HStack>
          )}
        </Stack>

        <HStack
          spacing={6}
          mt={{ base: 6, md: 8 }}
          flexWrap="wrap"
          justify={{ base: 'flex-start', md: 'flex-start' }}
          fontSize="12px"
          fontWeight={300}
          lineHeight="150%"
          color="rgba(220,215,201,0.8)"
        >
          <Text fontSize="12px" fontWeight={300} lineHeight="150%">
            {copyrightText}
          </Text>

          {privacyLink && (
            <ChakraLink
              as={Link}
              href={privacyLink.url}
              fontSize="12px"
              fontWeight={300}
              lineHeight="150%"
              _hover={{ color: 'white', textDecoration: 'underline' }}
            >
              {privacyLink.label}
            </ChakraLink>
          )}

          {termsLink && (
            <ChakraLink
              as={Link}
              href={termsLink.url}
              fontSize="12px"
              fontWeight={300}
              lineHeight="150%"
              _hover={{ color: 'white', textDecoration: 'underline' }}
            >
              {termsLink.label}
            </ChakraLink>
          )}
        </HStack>
      </Container>
    </Box>
  )
}
