import { createRoot } from 'react-dom/client'
import './src/index.css'
import Articles from './src/articles.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './src/Login.tsx'
import RegisterPage from './src/Register.tsx'
import DefLayout from './src/layout.tsx'
import CreatePost from './src/createPost.tsx'
import { UserContextProvider } from './src/userContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <UserContextProvider>
        <Routes>
      <Route path='/' element={<DefLayout/>}>
      <Route path='/' element={<Articles/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/create' element={<CreatePost/>}/>
    </Route>
  </Routes>
  </UserContextProvider>
  </BrowserRouter>
)
