import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import { ApiProvider } from './contexts/ApiProviderContext';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApiProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApiProvider>
  </React.StrictMode>,
)
