import { render, screen, fireEvent } from '@testing-library/react'
import { GraveHeroBanner } from '../grave-hero-banner'

jest.mock('../../../sanity/client', () => ({
  urlFor: jest.fn((source) => ({
    url: () => source?.asset?._ref ? `https://example.com/${source.asset._ref}.jpg` : 'https://example.com/default.jpg',
  })),
}))

// Mock scrollBy on HTMLDivElement prototype since JSDOM does not implement it by default
if (typeof window !== 'undefined' && !HTMLDivElement.prototype.scrollBy) {
  HTMLDivElement.prototype.scrollBy = jest.fn()
}

describe('GraveHeroBanner', () => {
  const mockGrave = {
    _id: '123',
    graveNo: 93,
    familySurname: 'Brett',
    persons: [
      {
        _key: 'person-1',
        name: 'Brett John',
        dateBurial: '1753',
      },
    ],
  }

  // Use realistic Sanity ref format containing -widthxheight- to yield < 1 aspect ratio (portrait)
  const mockTwoImages = [
    {
      image: { asset: { _ref: 'image-123-600x800-jpg' } },
      imageAltText: 'Image One',
    },
    {
      image: { asset: { _ref: 'image-456-600x800-jpg' } },
      imageAltText: 'Image Two',
    },
  ]

  const mockThreeImages = [
    {
      image: { asset: { _ref: 'image-123-600x800-jpg' } },
      imageAltText: 'Image One',
    },
    {
      image: { asset: { _ref: 'image-456-600x800-jpg' } },
      imageAltText: 'Image Two',
    },
    {
      image: { asset: { _ref: 'image-789-600x800-jpg' } },
      imageAltText: 'Image Three',
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders grave details correctly', () => {
    render(<GraveHeroBanner grave={mockGrave} images={[]} />)
    expect(screen.getByText('Brett, John')).toBeInTheDocument()
    expect(screen.getByText('Grave #')).toBeInTheDocument()
    expect(screen.getByText('93')).toBeInTheDocument()
    expect(screen.getByText('Buried Date')).toBeInTheDocument()
    expect(screen.getByText('1753')).toBeInTheDocument()
  })

  it('has overflow hidden on the outer container to clip overflowing pictures and buttons', () => {
    render(<GraveHeroBanner grave={mockGrave} images={[]} />)
    const banner = screen.getByTestId('grave-hero-banner')
    expect(banner).toHaveStyle({ overflow: 'hidden' })
  })

  it('renders navigation buttons and rotates images on click when exactly 2 images are loaded', () => {
    render(<GraveHeroBanner grave={mockGrave} images={mockTwoImages} />)

    // Verify navigation buttons are rendered
    const leftBtn = screen.getByRole('button', { name: /scroll left/i })
    const rightBtn = screen.getByRole('button', { name: /scroll right/i })
    expect(leftBtn).toBeInTheDocument()
    expect(rightBtn).toBeInTheDocument()

    // Query images (Next.js Image components render as img tag with alt)
    let images = screen.getAllByRole('img')
    expect(images[0]).toHaveAttribute('alt', 'Image One')
    expect(images[1]).toHaveAttribute('alt', 'Image Two')

    // Click Scroll Right
    fireEvent.click(rightBtn)

    // Now they should be rotated
    images = screen.getAllByRole('img')
    expect(images[0]).toHaveAttribute('alt', 'Image Two')
    expect(images[1]).toHaveAttribute('alt', 'Image One')

    // Click Scroll Left
    fireEvent.click(leftBtn)

    // Now they should be rotated back
    images = screen.getAllByRole('img')
    expect(images[0]).toHaveAttribute('alt', 'Image One')
    expect(images[1]).toHaveAttribute('alt', 'Image Two')
  })

  it('does not rotate images but instead scrolls when more than 2 images are loaded', () => {
    const scrollBySpy = jest.spyOn(HTMLDivElement.prototype, 'scrollBy').mockImplementation(() => {})

    render(<GraveHeroBanner grave={mockGrave} images={mockThreeImages} />)

    // Verify navigation buttons are rendered
    const leftBtn = screen.getByRole('button', { name: /scroll left/i })
    const rightBtn = screen.getByRole('button', { name: /scroll right/i })
    expect(leftBtn).toBeInTheDocument()
    expect(rightBtn).toBeInTheDocument()

    let images = screen.getAllByRole('img')
    expect(images[0]).toHaveAttribute('alt', 'Image One')
    expect(images[1]).toHaveAttribute('alt', 'Image Two')

    // Click Scroll Right
    fireEvent.click(rightBtn)

    // Images should NOT be rotated in state
    images = screen.getAllByRole('img')
    expect(images[0]).toHaveAttribute('alt', 'Image One')
    expect(images[1]).toHaveAttribute('alt', 'Image Two')

    // Instead, scrollBy should be called on the container
    expect(scrollBySpy).toHaveBeenCalledWith({ left: 300, behavior: 'smooth' })

    // Click Scroll Left
    fireEvent.click(leftBtn)

    // Images should NOT be rotated
    images = screen.getAllByRole('img')
    expect(images[0]).toHaveAttribute('alt', 'Image One')
    expect(images[1]).toHaveAttribute('alt', 'Image Two')

    // scrollBy should be called with left: -300
    expect(scrollBySpy).toHaveBeenCalledWith({ left: -300, behavior: 'smooth' })

    scrollBySpy.mockRestore()
  })
})
