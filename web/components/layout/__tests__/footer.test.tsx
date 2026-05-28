import { render, screen } from '@testing-library/react'
import { Footer } from '../footer'

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
        { url: '/about', label: 'About' },
        { url: '/contact', label: 'Contact' },
      ],
    },
  },
}));

describe('Footer', () => {
  it('renders the copyright text', () => {
    render(<Footer />)
    expect(screen.getAllByText('Test Copyright')[0]).toBeInTheDocument()
  })

  it('renders footer links', () => {
    render(<Footer />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })
})
