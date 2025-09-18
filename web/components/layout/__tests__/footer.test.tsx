import { render, screen } from '@testing-library/react'
import { Footer } from '../footer'
import siteConfig from '../../../data/config'

// Mock the siteConfig
jest.mock('../../../data/config', () => ({
  __esModule: true,
  default: {
    logo: () => <span>Logo</span>,
    seo: {
      description: 'Test Description',
    },
    footer: {
      copyright: 'Test Copyright',
      links: [
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
      ],
    },
  },
}));

describe('Footer', () => {
  it('renders the copyright text', () => {
    render(<Footer />)
    expect(screen.getByText('Test Copyright')).toBeInTheDocument()
  })

  it('renders footer links', () => {
    render(<Footer />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})
