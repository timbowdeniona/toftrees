import { render } from '@testing-library/react'
import RootLayout from '../layout'

// Mock next/headers
jest.mock('next/headers', () => ({
  draftMode: jest.fn().mockImplementation(() => Promise.resolve({ isEnabled: false })),
}))

// Mock next-sanity and @chakra-ui/react
jest.mock('next-sanity', () => ({
  VisualEditing: () => <div data-testid="visual-editing" />,
}))

jest.mock('@chakra-ui/react', () => ({
  ColorModeScript: () => <div data-testid="color-mode-script" />,
}))

// Mock Provider
jest.mock('../provider', () => ({
  Provider: ({ children }: { children: React.ReactNode }) => <div data-testid="provider">{children}</div>,
}))

describe('RootLayout', () => {
  it('renders a title tag with the correct title', async () => {
    // Render the async Server Component
    const LayoutComponent = await RootLayout({ children: <div data-testid="child" /> })
    const { container } = render(LayoutComponent)
    
    // We expect the title element to be inside the document with correct text
    const title = document.head.querySelector('title') || container.querySelector('title')
    expect(title).toBeInTheDocument()
    expect(title?.textContent).toBe('All Saints Church Toftrees')
    // Alternatively, verify via document.title
    expect(document.title).toBe('All Saints Church Toftrees')
  })
})
