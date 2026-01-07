'use client'

import { Box, Flex, VisuallyHidden, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../../sanity/client'
import siteConfig from '../../data/config'

export interface LogoProps {
  href?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  logoImage?: {
    asset: {
      _ref: string;
    };
  };
  titleText?: string;
}

export const Logo = ({ href = '/', onClick, logoImage, titleText }: LogoProps) => {
  const displayTitle = titleText || siteConfig.seo?.title || 'Toftrees'
  
  return (
    <Flex h="8" flexShrink="0" alignItems="center">
      <ChakraLink
        as={Link}
        href={href}
        display="flex"
        alignItems="center"
        p="1"
        borderRadius="sm"
        onClick={onClick}
        _hover={{ textDecoration: 'none' }}
      >
        {/* Always use logo-navigation.svg for header, or CMS logo if provided */}
        {logoImage ? (
          <Box height="32px" position="relative" flexShrink={0}>
            <Image
              src={urlFor(logoImage).url()}
              alt={displayTitle}
              width={134}
              height={31}
              style={{ height: '100%', width: 'auto' }}
              priority
            />
          </Box>
        ) : (
          <Box height="32px" position="relative" flexShrink={0}>
            <Image
              src="/logo-navigation.svg"
              alt="All Saints Church Toftrees"
              width={134}
              height={31}
              style={{ height: '100%', width: 'auto' }}
              priority
            />
          </Box>
        )}
        <VisuallyHidden>{displayTitle}</VisuallyHidden>
      </ChakraLink>
    </Flex>
  )
}
