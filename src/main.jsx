import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#2D4A43', // Premium Forest Green
            color: '#FAF8F6',      // Warm Cream
            border: '1px solid rgba(139, 167, 157, 0.2)', // Soft Forest outline
            borderRadius: '12px',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontSize: '14px',
            fontWeight: '600',
            padding: '16px 24px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
          success: { 
            iconTheme: { 
              primary: '#B2A08F',   // Pastel Brown Accent
              secondary: '#2D4A43'  // Forest Green Background
            } 
          },
          error: { 
            iconTheme: { 
              primary: '#A65D37',   // Burnt Orange Accent
              secondary: '#FAF8F6' 
            } 
          },
        }}
      />
    </QueryClientProvider>
  </StrictMode>,
)
