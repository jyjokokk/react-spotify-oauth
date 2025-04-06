import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a request to your server to register the user
    if (password !== passwordAgain) {
      alert('Passwords do not match')
      return
    }
    console.log('Registering with:', { email, password })
    navigate('/')
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }
  const handlePasswordAgainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordAgain(e.target.value)
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>Username:</label>
          <input type="text" value={email} onChange={(e) => handleEmailChange(e)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => handlePasswordChange(e)} />
        </div>
        <div>
          <label>Retype password:</label>
          <input type="password" value={password} onChange={(e) => handlePasswordAgainChange(e)} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
