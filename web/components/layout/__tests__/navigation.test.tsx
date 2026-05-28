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
