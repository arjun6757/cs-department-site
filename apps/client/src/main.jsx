import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/auth.context.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <div className='w-full h-screen flex justify-center items-center font-inter'>
        <App />
      </div>
    </AuthProvider>
  </BrowserRouter>
)
