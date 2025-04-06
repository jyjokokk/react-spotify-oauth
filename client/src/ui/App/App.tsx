import { type FC } from 'react'
import StatusPage from '../StatusPage/StatusPage'
import BodyCentered from '../../styles/globalBodyCentered'
import styled from 'styled-components'
import { MainHeader } from '../../styles/headers'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'

const AppContainer = styled.div`
  background-color: #282c34;
  color: white;
  text-align: center;
  height: 100%;
  border-radius: 10px;
  padding: 20px;
`

const App: FC = () => {
  return (
    <div>
      <BodyCentered />
      <Router>
        <AppContainer>
          <MainHeader>React + Express.js Spotify OAuth</MainHeader>
          <Routes>
            <Route path="/" element={<StatusPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </AppContainer>
      </Router>
    </div>
  )
}

export default App
