import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import GraveSelectionModal from 'app/map/grave-selection-modal'
import { client } from 'sanity/client'

// Mock the client.fetch method
jest.mock('sanity/client', () => ({
  client: {
    fetch: jest.fn(),
  },
}));

const mockGraves = [
  {
    _id: '1',
    graveNo: '101',
    familySurname: 'Smith',
  },
  {
    _id: '2',
    graveNo: '102',
    familySurname: 'Jones',
  },
];

describe('GraveSelectionModal', () => {
  beforeEach(() => {
    (client.fetch as jest.Mock).mockResolvedValue(mockGraves);
  });

  it('fetches and displays a list of graves', async () => {
    const onSelectGrave = jest.fn();
    const onClose = jest.fn();
    render(<GraveSelectionModal isOpen={true} onClose={onClose} onSelectGrave={onSelectGrave} />)

    await waitFor(() => {
      expect(screen.getByText('101 - Smith')).toBeInTheDocument()
      expect(screen.getByText('102 - Jones')).toBeInTheDocument()
    })
  })

  it('calls the onSelectGrave callback when a grave is selected', async () => {
    const onSelectGrave = jest.fn();
    const onClose = jest.fn();
    render(<GraveSelectionModal isOpen={true} onClose={onClose} onSelectGrave={onSelectGrave} />)

    await waitFor(() => {
      fireEvent.click(screen.getByText('101 - Smith'))
      expect(onSelectGrave).toHaveBeenCalledWith(mockGraves[0])
    })
  })

  it('is not visible when isOpen is false', () => {
    const onSelectGrave = jest.fn();
    const onClose = jest.fn();
    const { container } = render(<GraveSelectionModal isOpen={false} onClose={onClose} onSelectGrave={onSelectGrave} />)
    
    expect(container.firstChild).toBeNull()
  })
})
