import { render, screen, within } from '@testing-library/react'
import HomePage from 'app/home-page'
import { urlFor } from 'sanity/client'

// Mock the urlFor function
jest.mock('sanity/client', () => ({
  urlFor: jest.fn(() => ({
    url: () => 'https://example.com/image.jpg',
  })),
}));

const mockSettings = {
  churchImage: {
    asset: {
      _ref: 'image-doubled-next-js-and-sanity-io-the-perfect-match-for-a-jamstack-website-building-a-blog-from-scratch-with-a-powerful-cms-and-a-flexible-front-end-framework',
    },
  },
  shortHistory: 'This is a short history of the church.',
};

describe('HomePage', () => {
  it('renders the hero and history sections with the correct data', () => {
    render(<HomePage settings={mockSettings} />)

    // Check for HeroSection content
    expect(screen.getByRole('heading', { name: 'Toftrees Churchyard', level: 1 })).toBeInTheDocument()
    const heroSection = screen.getByRole('heading', { name: 'Toftrees Churchyard', level: 1 }).parentElement;
    expect(within(heroSection).getByText('A history of the graves in the Toftrees churchyard in Norfolk.')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Toftrees Church' })).toBeInTheDocument()

    // Check for HistorySection content
    expect(screen.getByText('A Short History')).toBeInTheDocument()
    expect(screen.getByText('This is a short history of the church.')).toBeInTheDocument()
  })
})
