import { render, screen } from '@testing-library/react'
import GraveDetailsPageClient from 'app/graves/[id]/grave-details-page'
import { urlFor } from 'sanity/client'

// Mock the urlFor function
jest.mock('sanity/client', () => ({
  urlFor: jest.fn(() => ({
    url: () => 'https://example.com/image.jpg',
  })),
}));

const mockGrave = {
  _id: '1',
  graveNo: '101',
  familySurname: 'Smith',
  headstoneImage: {
    asset: {
      _ref: 'image-ref',
    },
  },
  persons: [
    {
      name: 'John Smith',
      dateBurial: '2023-01-01',
      age: '70',
      official: 'Vicar',
      notes: 'Some notes',
    },
  ],
  locationDescription: 'Near the old oak tree.',
};

describe('GraveDetailsPageClient', () => {
  it('renders the grave details', () => {
    render(<GraveDetailsPageClient grave={mockGrave} />)

    // Check for main grave info
    expect(screen.getByText('Grave No: 101')).toBeInTheDocument()
    expect(screen.getByText('Family: Smith')).toBeInTheDocument()

    // Check for headstone image
    expect(screen.getByRole('img', { name: 'Headstone for grave 101' })).toBeInTheDocument()

    // Check for persons buried
    expect(screen.getByText('Persons Buried')).toBeInTheDocument()
    expect(screen.getByText('John Smith')).toBeInTheDocument()
    expect(screen.getByText('Buried: 2023-01-01')).toBeInTheDocument()
    expect(screen.getByText('Age: 70')).toBeInTheDocument()
    expect(screen.getByText('Official')).toBeInTheDocument()
    expect(screen.getByText('Vicar')).toBeInTheDocument()
    expect(screen.getByText('Notes')).toBeInTheDocument()
    expect(screen.getByText('Some notes')).toBeInTheDocument()

    // Check for location
    expect(screen.getByText('Location')).toBeInTheDocument()
    expect(screen.getByText('Near the old oak tree.')).toBeInTheDocument()
  })

  it('renders a "Grave not found" message if the grave is not found', () => {
    render(<GraveDetailsPageClient grave={null} />)
    expect(screen.getByText('Grave not found.')).toBeInTheDocument()
  })
})
