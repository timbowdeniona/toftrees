import { render, screen, fireEvent } from '@testing-library/react'
import GravesPageClient from '../graves-page'

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

describe('GravesPageClient', () => {
  it('renders a list of graves', () => {
    render(<GravesPageClient graves={mockGraves} />)
    expect(screen.getByText('Grave 101')).toBeInTheDocument()
    expect(screen.getByText('Smith')).toBeInTheDocument()
    expect(screen.getByText('Grave 102')).toBeInTheDocument()
    expect(screen.getByText('Jones')).toBeInTheDocument()
  })

  it('filters the graves when a search query is entered', () => {
    render(<GravesPageClient graves={mockGraves} />)
    const searchInput = screen.getByPlaceholderText('Search by surname...')
    fireEvent.change(searchInput, { target: { value: 'Smith' } })
    expect(screen.getByText('Grave 101')).toBeInTheDocument()
    expect(screen.queryByText('Grave 102')).not.toBeInTheDocument()
  })

  it('shows a "No graves found" message when the search query does not match any graves', () => {
    render(<GravesPageClient graves={mockGraves} />)
    const searchInput = screen.getByPlaceholderText('Search by surname...')
    fireEvent.change(searchInput, { target: { value: 'Williams' } })
    expect(screen.getByText('No graves found for "Williams".')).toBeInTheDocument()
  })
})
