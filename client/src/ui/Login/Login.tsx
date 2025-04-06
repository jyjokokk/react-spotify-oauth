import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your server to authenticate the user
    console.log('Logging in with:', { username, password })
    navigate('/')
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => handleUsernameChange(e)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => handlePasswordChange(e)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
