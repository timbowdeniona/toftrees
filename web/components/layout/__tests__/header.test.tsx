import { render, screen } from '@testing-library/react'
import { Header } from 'components/layout/header'

// Mock the Logo and Navigation components
jest.mock('components/layout/logo', () => ({
  Logo: () => <div data-testid="logo" />,
}))

jest.mock('components/layout/navigation', () => () => <div data-testid="navigation" />)

describe('Header', () => {
  it('renders the Logo and Navigation components', () => {
    render(<Header />)
    expect(screen.getByTestId('logo')).toBeInTheDocument()
    expect(screen.getByTestId('navigation')).toBeInTheDocument()
  })
})
