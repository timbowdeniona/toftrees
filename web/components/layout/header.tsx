'use client'

import {
  Box,
  BoxProps,
  Container,
  Flex,
} from '@chakra-ui/react'

import * as React from 'react'

import { Logo } from './logo'
import Navigation from './navigation'
import { NavigationBarConfig } from '../../types'

export interface HeaderProps extends Omit<BoxProps, 'children'> {
  navigationConfig?: NavigationBarConfig;
}

export const Header = ({ navigationConfig, ...props }: HeaderProps) => {
  const ref = React.useRef<HTMLHeadingElement>(null)
  const [y, setY] = React.useState(0)
  const { height = 0 } = ref.current?.getBoundingClientRect() ?? {}

  React.useEffect(() => {
    const handleScroll = () => {
      setY(window.scrollY)
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Box
      ref={ref}
      as="header"
      top="0"
      w="full"
      position="fixed"
      zIndex="sticky"
      bg="#FFFFFF"
      borderColor="gray.200"
      transitionProperty="common"
      transitionDuration="normal"
      boxShadow={y > height ? 'md' : 'none'}
      borderBottomWidth="1px"
      {...props}
    >
      <Container maxW="container.2xl" px={{ base: "24px", md: "32px", lg: "120px" }} py={{base: "16px", md: "40px"}}>
        <Flex width="full" align="center" justify="space-between">
          <Logo
            logoImage={navigationConfig?.logoImage}
            titleText={navigationConfig?.titleText}
            onClick={(e) => {
              if (window.location.pathname === '/') {
                e.preventDefault()

                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
              }
            }}
          />
          <Navigation links={navigationConfig?.navigationLinks} navigationConfig={navigationConfig} />
        </Flex>
      </Container>
    </Box>
  )
}
