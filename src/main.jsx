import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import Login from './components/login.jsx';
import  RoutePage  from './pages.jsx';
import ContextProvider from './provider/ContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <ContextProvider>
        <BrowserRouter>
        <RoutePage />
      </BrowserRouter>
     </ContextProvider>
  </StrictMode>
)
