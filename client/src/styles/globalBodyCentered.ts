import { createGlobalStyle } from 'styled-components'

const BodyCentered = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: Arial, sans-serif;
  }`

export default BodyCentered
