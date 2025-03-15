import App from './App'
import { render, screen } from '@testing-library/react'

describe('App tests', () => {
  it('should render the correct title', () => {
    render(<App />)
    expect(
      screen.getByText('React + Express.js Spotify OAuth')
    ).toBeInTheDocument()
  })

  it('should render the component', () => {
    const component = render(<App />)
    const r = component.container.querySelector('div')
    expect(r).toBeTruthy()
  })
})
