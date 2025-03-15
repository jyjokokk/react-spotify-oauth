import type React from 'react'
import { useState, useEffect } from 'react'

function Lol() {
  const [first, setfirst] = useState('')
  useEffect(() => {
    console.log(first)
    setfirst('first')
  }, [])
}

const App: React.FC = () => (
  <div>
    <h1>Hello, React with TypeScript and Vite!</h1>
  </div>
)

export default App
