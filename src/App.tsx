import { ThemeProvider } from 'styled-components'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import Router from './Router'
import { BrowserRouter } from 'react-router-dom'
import CyclesContextProvider from './contexts/CycleContext'
import CountdownContextProvider from './contexts/CountdownContext'
function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <CyclesContextProvider>
          <CountdownContextProvider>
            <Router />
          </CountdownContextProvider>
          <GlobalStyle />
        </CyclesContextProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
