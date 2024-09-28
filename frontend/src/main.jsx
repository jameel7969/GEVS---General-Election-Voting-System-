import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/authContext.jsx'
import { ConstituentContextProvider } from './context/constituentContext.jsx'
import { ConstituentsContextProvider } from './context/constituentsContext.jsx'
import { ElectionContextProvider } from './context/electionContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ConstituentContextProvider>
        <ConstituentsContextProvider>
          <ElectionContextProvider>
            <App />
          </ElectionContextProvider>
        </ConstituentsContextProvider>
      </ConstituentContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
