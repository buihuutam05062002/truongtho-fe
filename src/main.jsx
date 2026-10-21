import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { ErrorBoundary } from "react-error-boundary";
import { logError } from './lib/logError'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorBoundary} onError={logError}>
    <App />
    </ErrorBoundary>

    <Toaster position='top-right' toastOptions={{style:{
      background: "var(--card)",
      color: "var(--card-foreground)",
      border: "1px solid var(--border)",
    }}}></Toaster>
  </StrictMode>,
)
