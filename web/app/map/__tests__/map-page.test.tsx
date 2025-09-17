import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import MapPageClient from 'app/map/map-page'
import { urlFor, writeClient } from 'sanity/client'

// Mock the sanity client
jest.mock('sanity/client', () => ({
  urlFor: jest.fn(() => ({
    url: () => 'https://example.com/map.jpg',
  })),
  writeClient: {
    patch: jest.fn(() => ({
      insert: jest.fn(() => ({
        commit: jest.fn().mockResolvedValue({}),
      })),
      unset: jest.fn(() => ({
        commit: jest.fn().mockResolvedValue({}),
      })),
    })),
  },
}));

const mockImageMap = {
  _id: 'map-1',
  title: 'Churchyard Map',
  image: {
    asset: {
      _ref: 'image-ref',
    },
  },
  hotspots: [
    {
      _key: 'hotspot-1',
      _type: 'hotspot',
      x: 50,
      y: 50,
      grave: { _ref: 'grave-1', _type: 'reference' },
    },
  ],
};

const mockGraves = [
  {
    _id: 'grave-1',
    graveNo: '101',
    familySurname: 'Smith',
  },
];

describe('MapPageClient', () => {
  it('renders the map title, image, and hotspots', () => {
    render(<MapPageClient imageMap={mockImageMap} graves={mockGraves} />)

    expect(screen.getByText('Churchyard Map')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Churchyard Map' })).toBeInTheDocument()
    
    // The hotspot is a link, so we can find it by its href
    const links = screen.getAllByRole('link');
    const hotspotLink = links.find(link => link.getAttribute('href') === '/graves/grave-1');
    expect(hotspotLink).toHaveAttribute('href', '/graves/grave-1');
  })

  it('renders a "No map found" message if imageMap is not provided', () => {
    render(<MapPageClient imageMap={null} graves={mockGraves} />)
    expect(screen.getByText('No map found.')).toBeInTheDocument()
  })

  it('opens the "Add Hotspot" context menu on right-click', () => {
    render(<MapPageClient imageMap={mockImageMap} graves={mockGraves} />)
    const mapImage = screen.getByRole('img', { name: 'Churchyard Map' });
    fireEvent.contextMenu(mapImage);
    expect(screen.getByText('Add Hotspot')).toBeInTheDocument();
  });

  it('opens the "Delete Hotspot" context menu on right-clicking a hotspot', async () => {
    render(<MapPageClient imageMap={mockImageMap} graves={mockGraves} />)
    const links = screen.getAllByRole('link');
    const hotspot = links.find(link => link.getAttribute('href') === '/graves/grave-1');
    fireEvent.contextMenu(hotspot);
    expect(screen.getByText('Delete Hotspot')).toBeInTheDocument();
  });
})
