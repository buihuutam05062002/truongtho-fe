import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/queryClient'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { ErrorBoundary } from "react-error-boundary";
import { logError } from './lib/logError'
import ErrorFallback from './components/ErrorFallback/ErrorFallback'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
   
    </ErrorBoundary>

    <Toaster position='top-right' toastOptions={{style:{
      background: "var(--card)",
      color: "var(--card-foreground)",
      border: "1px solid var(--border)",
    }}}></Toaster>
  </StrictMode>,
)
