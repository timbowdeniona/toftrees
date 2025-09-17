import { render, screen } from '@testing-library/react'
import { MarketingLayout } from '../marketing-layout'

// Mock the Header and Footer components
jest.mock('../header', () => ({
  Header: () => <div data-testid="header" />,
}))

jest.mock('../footer', () => ({
  Footer: () => <div data-testid="footer" />,
}))

describe('MarketingLayout', () => {
  it('renders the Header, Footer, and children', () => {
    render(
      <MarketingLayout>
        <div data-testid="child" />
      </MarketingLayout>
    )
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})
