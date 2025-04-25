import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AppProvider } from './Context/useProductContext.tsx'
import { FilterProvider } from './Context/useFilterContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </AppProvider>
  </StrictMode>
)
