import { render, screen } from '@testing-library/react'
import Navigation from 'components/layout/navigation'

// Mock siteConfig
jest.mock('data/config', () => ({
  __esModule: true,
  default: {
    header: {
      links: [
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
      ],
    },
  },
}));

// Mock usePathname
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Navigation', () => {
  it('renders the navigation links', () => {
    render(<Navigation />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders the Home link as the first item in desktop navigation', () => {
    render(<Navigation />)
    // Find all desktop links. In navigation.tsx, links are NavLink (which render as anchors)
    const desktopLinks = screen.getAllByRole('link').filter(el => {
      // In the structure, we have desktop links inside HStack and mobile links elsewhere.
      // Since screen.getAllByRole gets everything, we can assert the first desktop link is Home.
      // Actually, mobile links might not be rendered unless the drawer is open (isOpen is false by default).
      return el.closest('a') !== null;
    })
    expect(desktopLinks[0]).toHaveTextContent('Home')
    expect(desktopLinks[0]).toHaveAttribute('href', '/')
  })

  it('transforms CMS links for Map Admin to graves?view=map', () => {
    const mockLinks = [
      { linkUrl: '/map', linkText: 'Map Admin' }
    ]
    render(<Navigation links={mockLinks} />)
    const mapLinks = screen.getAllByText('Map')
    expect(mapLinks.length).toBeGreaterThan(0)
    expect(mapLinks[0].closest('a')).toHaveAttribute('href', '/graves?view=map')
  })
})
