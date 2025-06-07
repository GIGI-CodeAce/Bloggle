import { createRoot } from 'react-dom/client'
import './src/index.css'
import Articles from './src/categories/bloggleArticles.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './src/pages/Login.tsx'
import RegisterPage from './src/pages/Register.tsx'
import {CategoryLayout, DefLayout, ScrollToTopArrow} from './src/components/layouts.tsx'
import {FooterLayout} from './src/components/layouts.tsx'
import CreatePost from './src/pages/createPost.tsx'
import { UserContextProvider } from './src/userContext.tsx'
import TimeAgo from 'javascript-time-ago'
import PostPage from './src/pages/postPage.tsx'
import en from 'javascript-time-ago/locale/en'
import EditPost from './src/pages/editPost.tsx'
import OfficialArticles from './src/categories/officialArticles.tsx'
import TermsOfUsePage from './src/pages/termsOfSuse.tsx'
 
TimeAgo.addDefaultLocale(en)

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <UserContextProvider>
        <Routes>
      <Route path='/' element={<DefLayout/>}>
        <Route path='/' element={<FooterLayout/>}>
          <Route path='/' element={<CategoryLayout/>}>
            <Route path='/' element={<ScrollToTopArrow/>}>
                <Route path='/' element={<Articles/>}/>
                <Route path='/trustedPosts' element={<OfficialArticles/>}/>
            </Route>
              <Route path='/terms' element={<TermsOfUsePage/>}/>
              <Route path='/post/:id' element={<PostPage/>}/>
          </Route>
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
