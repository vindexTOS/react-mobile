import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HashRouter } from 'react-router-dom'
import { GeneralContextProvider } from './contexts/GeneralContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <GeneralContextProvider>
        <App />
      </GeneralContextProvider>
    </HashRouter>
  </React.StrictMode>,
)
