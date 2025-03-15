import { type FC } from 'react'
import StatusPage from '../StatusPage/StatusPage'
import BodyCentered from '../../styles/globalBodyCentered'
import styled from 'styled-components'
import { MainHeader } from '../../styles/headers';

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
      <AppContainer>
        <MainHeader>React + Express.js Spotify OAuth</MainHeader>
        <StatusPage />
      </AppContainer>
    </div>
  )
}

export default App
