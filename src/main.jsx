import { StrictMode } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { createRoot } from 'react-dom/client'

import App from './App'
import { BookingProvider } from './hooks/useBooking'
import { ThemeProvider } from './hooks/useTheme'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <BookingProvider>
        <App />
        <Analytics />
      </BookingProvider>
    </ThemeProvider>
  </StrictMode>,
)
