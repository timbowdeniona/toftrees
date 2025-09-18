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
})
