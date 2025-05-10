import { createRoot } from 'react-dom/client'
import './src/index.css'
import App from './src/Login.tsx'
import NavigationBar from './src/navBar.tsx'
import Articles from './src/articles.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './src/Login.tsx'
import RegisterPage from './src/Register.tsx'
import DefLayout from './src/layout.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<DefLayout/>}>
    <Route path='/' element={<Articles/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
      </Route>
  </Routes>
  </BrowserRouter>
)
