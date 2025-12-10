'use client'

import {
  Box,
  BoxProps,
  Container,
  Flex,
} from '@chakra-ui/react'
import { useScroll } from 'framer-motion'

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

  const { scrollY } = useScroll()
  React.useEffect(() => {
    return scrollY.on('change', () => setY(scrollY.get()))
  }, [scrollY])

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
      <Container maxW="container.2xl" px="120px" py="10">
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
          <Navigation links={navigationConfig?.navigationLinks} />
        </Flex>
      </Container>
    </Box>
  )
}
