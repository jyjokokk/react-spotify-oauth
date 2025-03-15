import { FC, useState } from 'react'

const StatusPage: FC = () => {
  const [authenticated, setAuthenticated] = useState(false)
  const [connected, setConnected] = useState(false)

  const login = () => {
    setAuthenticated(!authenticated)
    setConnected(!connected)
  }
  return (
    <div>
      <h2>Spotify Authentication</h2>
      <h3>Is authenticated: {`${authenticated}`}</h3>
      <h3>Is connected: {`${connected}`}</h3>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default StatusPage
