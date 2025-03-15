import App from './App'
import { render, screen } from '@testing-library/react'

describe('App tests', () => {
  it('should render the title', () => {
    render(<App />)
    const r = screen.getByText('Hello, React with TypeScript and Vite!')
    expect(
      screen.getByText('Hello, React with TypeScript and Vite!')
    ).toBeInTheDocument()
  })

  it('should render an h1 element', () => {
    render(<App />)
    const heading = screen.getByRole('heading')
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('Hello, React with TypeScript and Vite!')
  })
})
