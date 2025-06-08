<h1 align="center" id="title">MEMES RNG</h1>

<p align="center">
  <img src="https://raw.githubusercontent.com/GIGIsOtherStuff/mainWebMedia/main/AppImages/myProjectsImgs/bloggleLogo.png" alt="project-image">
</p>

<p id="description">
  Bloggle is a news-based app where users can write their own posts, manage them easily, and discover other content shared by others.
</p>

<h2 align="center">Visit here</h2>

<div align="center">
  <a href="https://bloggleapp.onrender.com">BloggleApp.onrender.com</a>
</div>

<h2 align="center">🧐 Features</h2>

<h4>Here're some of the project's best features</h4>

*   Create an account and login for experiencing all of its features
*   Functionality for editing and deleting posts made by you on Bloggle
*   Only on Bloggle page: posts made by users who made an account exclusively on bloggle
*   Trusted Sources page: official news coming from a news API to check out updates about what's happening around the world.
*   Has an API content moderation system using AI that checks posts for offensive content

```javascript
// ...
// Bloggle's codebase HTML main tree:

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


// ...
```
<h2 align="center">Project Screenshots:</h2>
<div align="center">
<div>
<h3>Rolling</h3>
  <img src="    " alt="project-screenshot" width="400" height="500">
</div>
<h3>Rare undiscovered cards</h3>
 <img src=" " alt="project-screenshot"  style="width: 100%; height: 400px">
  <img src="    " alt="project-screenshot" style="width: 100%; height: 400px">
<h3>Few samples</h3>
  <img src="    " alt="project-screenshot" style="width: 100%; height: 400px">
</div><br></br>

[![Portfolio](https://img.shields.io/badge/Portfolio-62b1ff?style=for-the-badge&logo=web&logoColor=white)](https://www.gigicodeace.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-3e3eff?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dobre-robert-03653b331/)
[![GitHub](https://img.shields.io/badge/GitHub-2f2f2f?style=for-the-badge&logo=github&logoColor=white)](https://github.com/GIGI-CodeAce)
[![CSS Battles](https://img.shields.io/badge/CSS%20Battles-ff6e96?style=for-the-badge&logo=css3&logoColor=white)](https://cssbattle.dev/player/gigi)

  <b></b>
   <h4>~GIGI <code>Dore Robert</code></h4>
</footer>