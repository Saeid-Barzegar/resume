import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import IntlProviderContext from './context/IntlProviderContext.tsx'
import MainContext from './context/MainContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainContext>
      <IntlProviderContext>
        <App />
      </IntlProviderContext>
    </MainContext>
  </StrictMode>,
)
