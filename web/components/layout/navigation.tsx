'use client'

import { HStack } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { NavLink } from '../nav-link'
import siteConfig from '../../data/config'
import { NavigationBarConfig } from '../../types'

interface NavigationProps {
  links?: NavigationBarConfig['navigationLinks'];
}

const Navigation: React.FC<NavigationProps> = ({ links }) => {
  const path = usePathname()
  
  // Use CMS links if provided, otherwise fallback to siteConfig
  const navigationLinks = links && links.length > 0
    ? links.map(link => ({
        href: link.linkUrl,
        label: link.linkText,
        id: link.linkUrl.replace(/^\//, '').replace(/\//g, '-'),
      }))
    : siteConfig.header.links

  return (
    <HStack spacing="2" flexShrink={0}>
      {navigationLinks.map(({ href, id, ...props }, i) => {
        return (
          <NavLink
            alignItems="center"
            display={['none', null, 'flex']}
            href={href || `/#${id}`}
            key={i}
            isActive={!!(href && !!path?.match(new RegExp(href)))}
            color="var(--Core-Green, #2E4028)"
            fontSize="18px"
            fontWeight={600}
            lineHeight="normal"
            letterSpacing="2.16px"
            textTransform="uppercase"
            {...props}
          >
            {props.label}
          </NavLink>
        )
      })}
    </HStack>
  )
}

export default Navigation
