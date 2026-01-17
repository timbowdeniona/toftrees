'use client'

import { 
  HStack, 
  Box, 
  Button, 
  VStack,
  useDisclosure,
  Flex,
  Text,
  IconButton,
} from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { NavLink } from '../nav-link'
import siteConfig from '../../data/config'
import { NavigationBarConfig } from '../../types'
import { Logo } from './logo'

interface NavigationProps {
  links?: NavigationBarConfig['navigationLinks'];
  navigationConfig?: NavigationBarConfig;
}

const Navigation: React.FC<NavigationProps> = ({ links, navigationConfig }) => {
  const path = usePathname()
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  // Use CMS links if provided, otherwise fallback to siteConfig
  const navigationLinks = links && links.length > 0
    ? links.map(link => ({
        href: link.linkUrl,
        label: link.linkText,
        id: link.linkUrl.replace(/^\//, '').replace(/\//g, '-'),
      }))
    : siteConfig.header.links

  return (
    <>
      {/* Desktop Navigation - Hidden on md and below */}
      <HStack spacing="64px" flexShrink={0} display={{ base: 'none', lg: 'flex' }}>
        {navigationLinks.map(({ href, id, ...props }, i) => {
          return (
            <NavLink
              alignItems="center"
              href={href || `/#${id}`}
              key={i}
              isActive={!!(href && !!path?.match(new RegExp(href)))}
              sx={{
                padding: "0px",
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                letterSpacing: "2.16px",
                textTransform: "uppercase",
                color: "var(--Core-Green, #2E4028)",
                textDecoration: "none",
                bg: "transparent",
                _hover: {
                  opacity: 0.8,
                  bg: "transparent",
                },
                _active: {
                  bg: "transparent",
                },
              }}
              {...props}
            >
              {props.label}
            </NavLink>
          )
        })}
      </HStack>

      {/* Mobile/Tablet Hamburger Menu Button - Visible on md and below */}
      <Box display={{ base: 'flex', lg: 'none' }} flexShrink={0}>
        <Button
          onClick={onOpen}
          variant="ghost"
          bg="transparent"
          p={0}
          h="auto"
          minW="auto"
          _hover={{ bg: 'transparent', opacity: 0.8 }}
          _active={{ bg: 'transparent' }}
          sx={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            letterSpacing: "1.92px",
            textTransform: "uppercase",
            color: "var(--Core-Green, #2E4028)",
          }}
        >
          <HStack spacing="8px" align="center">
            <Box as="span">MENU</Box>
            {/* Hamburger Icon */}
            <Box
              display="flex"
              flexDirection="column"
              gap="4px"
              w="20px"
              h="16px"
              justifyContent="center"
            >
              <Box
                w="100%"
                h="1px"
                bg="var(--Core-Green, #2E4028)"
                transition="all 0.3s ease"
              />
              <Box
                w="100%"
                h="1px"
                bg="var(--Core-Green, #2E4028)"
                transition="all 0.3s ease"
              />
              <Box
                w="100%"
                h="1px"
                bg="var(--Core-Green, #2E4028)"
                transition="all 0.3s ease"
              />
            </Box>
          </HStack>
        </Button>
      </Box>

      {/* Mobile Menu Full-Screen Overlay */}
      {isOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="white"
          zIndex={9999}
          overflowY="auto"
        >
          {/* Header with Logo and Close Button */}
          <Flex
            justify="space-between"
            align="flex-start"
            px={{ base: "24px", md: "32px" }}
            pt={{ base: "24px", md: "32px" }}
            pb="0"
          >
            {/* Logo */}
            <Box>
              <Logo
                logoImage={navigationConfig?.logoImage}
                titleText={navigationConfig?.titleText}
                onClick={(e) => {
                  e.preventDefault()
                  onClose()
                  if (window.location.pathname === '/') {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }}
              />
            </Box>

            {/* Close Button */}
            <Button
              onClick={onClose}
              variant="ghost"
              bg="transparent"
              p={0}
              h="auto"
              minW="auto"
              _hover={{ bg: 'transparent', opacity: 0.8 }}
              _active={{ bg: 'transparent' }}
              sx={{
                fontFamily: '"Host Grotesk", sans-serif',
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 600,
                lineHeight: "normal",
                letterSpacing: "1.44px",
                textTransform: "uppercase",
                color: "var(--Core-Green, #2E4028)",
              }}
            >
              <HStack spacing="8px" align="center">
                <Text>CLOSE</Text>
                <Box
                  position="relative"
                  w="14px"
                  h="14px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box
                    position="absolute"
                    w="14px"
                    h="1px"
                    bg="var(--Core-Green, #2E4028)"
                    transform="rotate(45deg)"
                  />
                  <Box
                    position="absolute"
                    w="14px"
                    h="1px"
                    bg="var(--Core-Green, #2E4028)"
                    transform="rotate(-45deg)"
                  />
                </Box>
              </HStack>
            </Button>
          </Flex>

          {/* Navigation Links */}
          <VStack
            spacing={{ base: "32px", md: "40px" }}
            align="flex-start"
            px={{ base: "24px", md: "32px" }}
            pt={{ base: 0, md: "80px" }}
            pb={{ base: 0, md: "64px" }}
            minH={{ base: "calc(100vh - 120px)", md: "calc(100vh - 120px)" }}
            justify={{ base: "center", md: "flex-start" }}
            h={{ base: "calc(100vh - 120px)", md: "auto" }}
          >
            {navigationLinks.map(({ href, id, ...props }, i) => {
              const isActive = !!(href && !!path?.match(new RegExp(href)))
              return (
                <NavLink
                  key={i}
                  href={href || `/#${id}`}
                  isActive={isActive}
                  onClick={onClose}
                  sx={{
                    padding: "0px",
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: { base: "40px", md: "40px" },
                    fontStyle: "normal",
                    fontWeight: 600,
                    lineHeight: "115%",
                    color: "var(--Core-Green, #2E4028)",
                    textDecoration: "none",
                    textAlign: "left",
                    bg: "transparent",
                    _hover: {
                      opacity: 0.8,
                      bg: "transparent",
                    },
                    _active: {
                      bg: "transparent",
                    },
                  }}
                  {...props}
                >
                  {props.label}
                </NavLink>
              )
            })}
          </VStack>
        </Box>
      )}
    </>
  )
}

export default Navigation
