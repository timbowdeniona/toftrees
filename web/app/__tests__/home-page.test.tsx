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
  contentSections: [
    {
      _type: 'heroBanner',
      _key: 'hero-1',
      title: 'Toftrees Churchyard',
      bodyText: [
        {
          _type: 'block',
          _key: 'block-1',
          children: [
            {
              _type: 'span',
              _key: 'span-1',
              text: 'A history of the graves in the Toftrees churchyard in Norfolk.',
            },
          ],
        },
      ],
      backgroundImage: {
        asset: {
          _ref: 'image-ref',
        },
      },
      backgroundImageAltText: 'Toftrees Church',
    },
    {
      _type: 'headingBodyText',
      _key: 'history-1',
      heading: 'A Short History',
      bodyText: [
        {
          _type: 'block',
          _key: 'block-2',
          children: [
            {
              _type: 'span',
              _key: 'span-2',
              text: 'This is a short history of the church.',
            },
          ],
        },
      ],
    },
  ],
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
