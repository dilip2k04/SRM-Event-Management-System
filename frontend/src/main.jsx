import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './app/App.jsx'
import { SidebarProvider } from './components/ui/sidebar2'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
  <SidebarProvider><App /></SidebarProvider>
  </StrictMode>,
)
