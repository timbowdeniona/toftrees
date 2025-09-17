import { render, screen } from '@testing-library/react'
import { Logo } from 'components/layout/logo'

jest.mock('data/config', () => ({
    __esModule: true,
    default: {
      seo: {
        title: 'Test Site Title',
      },
    },
  }));

describe('Logo', () => {
  it('renders the site title', () => {
    render(<Logo />)
    expect(screen.getByRole('heading', { name: 'Test Site Title' })).toBeInTheDocument()
  })
})