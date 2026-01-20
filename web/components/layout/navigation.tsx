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
import { useEffect, useRef, useState } from 'react'

interface NavigationProps {
  links?: NavigationBarConfig['navigationLinks'];
  navigationConfig?: NavigationBarConfig;
}

const Navigation: React.FC<NavigationProps> = ({ links, navigationConfig }) => {
  const path = usePathname()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const desktopNavRef = useRef<HTMLDivElement>(null)
  const [showHamburger, setShowHamburger] = useState(false)
  const [navSpacing, setNavSpacing] = useState(64) // Start with 64px spacing
  
  // Use CMS links if provided, otherwise fallback to siteConfig
  const cmsLinks = links && links.length > 0
    ? links.map(link => ({
        href: link.linkUrl,
        label: link.linkText,
        id: link.linkUrl.replace(/^\//, '').replace(/\//g, '-'),
      }))
    : siteConfig.header.links
  
  // Desktop links (without Home)
  const desktopLinks = cmsLinks
  
  // Mobile/Hamburger links (with Home at the beginning)
  const mobileLinks = [
    { href: '/', label: 'Home', id: 'home' },
    ...cmsLinks
  ]

  // Adjust spacing based on overflow (only on xl breakpoint and above)
  useEffect(() => {
    const adjustSpacing = () => {
      // Only check on xl breakpoint (1280px) and above
      const isXlBreakpoint = window.innerWidth >= 1280
      
      if (!isXlBreakpoint) {
        // Below xl, always show hamburger and reset spacing
        setShowHamburger(true)
        setNavSpacing(64)
        return
      }

      if (desktopNavRef.current) {
        const container = desktopNavRef.current
        const hasOverflow = container.scrollWidth > container.clientWidth
        
        // Adjust spacing based on overflow
        setNavSpacing((currentSpacing) => {
          if (hasOverflow && currentSpacing > 16) {
            // Reduce spacing by 8px increments when overflow
            return Math.max(16, currentSpacing - 8)
          } else if (!hasOverflow && currentSpacing < 64) {
            // Increase spacing back up when no overflow
            return Math.min(64, currentSpacing + 8)
          }
          return currentSpacing
        })
        
        // Only show hamburger if spacing is at minimum (16px) and still overflow
        setShowHamburger(hasOverflow && navSpacing <= 16)
      }
    }

    // Delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      adjustSpacing()
    }, 100)

    // Check on resize with debounce
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(adjustSpacing, 150)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Use ResizeObserver for more accurate detection
    let resizeObserver: ResizeObserver | null = null
    if (desktopNavRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        setTimeout(adjustSpacing, 50)
      })
      resizeObserver.observe(desktopNavRef.current)
    }

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [desktopLinks])
  
  // Recheck overflow when spacing changes
  useEffect(() => {
    if (desktopNavRef.current && window.innerWidth >= 1280) {
      const timeoutId = setTimeout(() => {
        if (desktopNavRef.current) {
          const hasOverflow = desktopNavRef.current.scrollWidth > desktopNavRef.current.clientWidth
          setShowHamburger(hasOverflow && navSpacing <= 16)
        }
      }, 50)
      return () => clearTimeout(timeoutId)
    }
  }, [navSpacing])

  return (
    <>
      {/* Desktop Navigation - Hidden on md and below, or when overflow */}
      <HStack 
        ref={desktopNavRef}
        spacing={`${navSpacing}px`}
        flexShrink={0} 
        display={{ base: 'none', xl: 'flex' }}
        visibility={{ base: 'hidden', xl: showHamburger ? 'hidden' : 'visible' }}
        overflow="hidden"
        position={{ xl: showHamburger ? 'absolute' : 'relative' }}
      >
        {desktopLinks.map(({ href, id, ...props }, i) => {
          return (
            <Box
              key={i}
              position="relative"
              display="inline-block"
              sx={{
                "&:hover .nav-link-line": {
                  width: "100%",
                },
              }}
            >
              <NavLink
                alignItems="center"
                href={href || `/#${id}`}
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
                  whiteSpace: "nowrap",
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
              <Box
                className="nav-link-line"
                position="absolute"
                bottom="0"
                left="50%"
                transform="translateX(-50%)"
                w="0"
                h="1px"
                bg="var(--Core-Green, #2E4028)"
                transition="width 0.3s ease"
                zIndex={1}
              />
            </Box>
          )
        })}
      </HStack>

      {/* Mobile/Tablet Hamburger Menu Button - Visible on md and below, or when overflow */}
      <Box 
        display={{ base: 'flex', xl: showHamburger ? 'flex' : 'none' }} 
        flexShrink={0} 
        h={{ base: "32px", xl: "60px" }} 
        alignItems="flex-end"
      >
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
            <Text>MENU</Text>
            {/* Hamburger Icon */}
            <Box
              position="relative"
              w="20px"
              h="16px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap="4px"
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
          sx={{
            animation: "slideInFromRight 0.3s ease-out",
            "@keyframes slideInFromRight": {
              "0%": {
                transform: "translateX(100%)",
              },
              "100%": {
                transform: "translateX(0)",
              },
            },
          }}
        >
          {/* Header with Logo and Close Button */}
          <Flex
            justify="space-between"
            align="flex-end"
            px={{ base: "24px", md: "32px", lg: "120px" }}
            py={{ base: "16px", md: "40px" }}
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
                fontFamily: 'Cormorant Garamond, sans-serif',
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
            px={{ base: "24px", md: "32px", lg: "120px" }}
            pt={{ base: 0, md: "80px" }}
            pb={{ base: 0, md: "64px" }}
            minH={{ base: "calc(100vh - 120px)", md: "calc(100vh - 120px)" }}
            justify="center"
            h={{ base: "calc(100vh - 120px)", md: "auto" }}
          >
            {mobileLinks.map(({ href, id, ...props }, i) => {
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
                    fontSize: { base: "40px", xl: "40px" },
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
