import { render, screen } from '@testing-library/react'
import { NavLink } from '../nav-link'

describe('NavLink', () => {
  it('renders a link with the correct href', () => {
    render(<NavLink href="/about">About</NavLink>)
    const link = screen.getByRole('link', { name: 'About' })
    expect(link).toHaveAttribute('href', '/about')
  })

  it('applies the active style when isActive is true', () => {
    render(<NavLink href="/about" isActive>About</NavLink>)
    const link = screen.getByRole('link', { name: 'About' })
    // The 'isActive' prop in Chakra UI adds the 'data-active' attribute
    expect(link).toHaveAttribute('data-active')
  })
})
