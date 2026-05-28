import { render, screen } from '@testing-library/react'
import { GraveListView } from '../grave-list-view'

let mockSearchParams = new URLSearchParams('');

jest.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams,
}));

jest.mock('sanity/client', () => ({
  urlFor: jest.fn(() => ({
    url: () => 'https://example.com/map.jpg',
  })),
}));

describe('GraveListView', () => {
  beforeEach(() => {
    mockSearchParams = new URLSearchParams('');
  });

  it('renders List View by default', () => {
    render(<GraveListView graves={[]} searchQuery="" />)
    expect(screen.getByText('List View')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
  })

  it('defaults to Map View when view=map is in search params', () => {
    mockSearchParams = new URLSearchParams('view=map');
    render(<GraveListView graves={[]} searchQuery="" />)
    expect(screen.getByText('Map View')).toBeInTheDocument()
    // It should not show the 'Name' column header from the list view
    expect(screen.queryByText('Name')).not.toBeInTheDocument()
  })
})
