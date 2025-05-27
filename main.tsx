import { createRoot } from 'react-dom/client'
import './src/index.css'
import Articles from './src/articles.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './src/Login.tsx'
import RegisterPage from './src/Register.tsx'
import {DefLayout} from './src/components/layout.tsx'
import {FooterLayout} from './src/components/layout.tsx'
import CreatePost from './src/createPost.tsx'
import { UserContextProvider } from './src/userContext.tsx'
import TimeAgo from 'javascript-time-ago'
import PostPage from './src/postPage.tsx'
import en from 'javascript-time-ago/locale/en'
import EditPost from './src/editPost.tsx'
 
TimeAgo.addDefaultLocale(en)

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <UserContextProvider>
        <Routes>
      <Route path='/' element={<DefLayout/>}>
        <Route path='/' element={<FooterLayout/>}>
          <Route path='/' element={<Articles/>}/>
          <Route path='/post/:id' element={<PostPage/>}/>
        </Route>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/create' element={<CreatePost/>}/>
        <Route path='/edit/:id' element={<EditPost/>}/>
    </Route>
  </Routes>
  </UserContextProvider>
  </BrowserRouter>
)
