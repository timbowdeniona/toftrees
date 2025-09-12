import { HStack } from '@chakra-ui/react'
import { usePathname } from 'next/navigation'
import { NavLink } from '../nav-link'
import siteConfig from '../../data/config'

const Navigation: React.FC = () => {
  const path = usePathname()

  return (
    <HStack spacing="2" flexShrink={0}>
      {siteConfig.header.links.map(({ href, id, ...props }, i) => {
        return (
          <NavLink
            display={['none', null, 'block']}
            href={href || `/#${id}`}
            key={i}
            isActive={!!(href && !!path?.match(new RegExp(href)))}
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
