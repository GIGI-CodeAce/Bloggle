<h1 align="center" id="title">Bloggle v1.4.3</h1>

<p align="center">
  <img src="https://raw.githubusercontent.com/GIGIsOtherStuff/mainWebMedia/main/AppImages/myProjectsImgs/bloggleLogo.png" 
      width="50%" height="320" alt="project-image">
</p>

<p id="description">
  Bloggle is a news-based app where users can write their own posts, manage them easily, and discover other content shared by others. 
  Built w/react,tailwind,typescript and using various API's for it to work including google,guardian and mongoDB
</p>

<h2 align="center">Visit here</h2>

<div align="center">
  <a href="https://bloggleapp.onrender.com">BloggleApp.onrender.com</a>
</div>

<hr style="border: none; border-top: 0px solid #ccc; width: 60%; margin: 20px auto;" />

<h5 align="center">
  <u>Note:</u> When visiting this website, the API backend may take up to <u>one minute</u> to fully start due to its hosting setup.
</h5>

<h2 align="center">🧐 Features</h2>

<h4>Here're some of the project's best features</h4>

*   Create an account and login for experiencing all of its features
*   Functionality for editing and deleting posts made by you on Bloggle
*   Only on Bloggle page: posts made by users who made an account exclusively on bloggle
*   Trusted Sources page: official news coming from a news API to check out updates about what's happening around the world.
*   Has an API content moderation system using AI that checks posts for offensive content
*   And explore many other website mechanics and features by trying it on your own 
  
  
<h2 align="center">Languages and tools used</h2>
<p align="center">
  </a>
  <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg"
            alt="html5" width="40" height="40" />
  </a>
    <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer">
      <img src="https://raw.githubusercontent.com/GIGIsOtherStuff/mainWebMedia/main/AppImages/Languages/Colored/tailwind.png" 
            alt="tailwind" width="40" height="40" />
  </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" 
            alt="javascript" width="40" height="40" />
  </a>
    <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" 
            alt="typescript" width="40" height="40"/>
  </a>
    <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" 
            alt="react" width="40" height="40" />
  </a>
    <a href="https://nodejs.org" target="_blank" rel="noreferrer"> 
      <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" 
            alt="nodejs" width="40" height="40"/> 
  </a>
    <a href="https://www.theguardian.com/europe" target="_blank" rel="noreferrer"> 
    <img src="https://raw.githubusercontent.com/GIGIsOtherStuff/mainWebMedia/main/AppImages/Tools/guardian.png" 
            alt="Guardian" width="40" height="40"/> 
  </a>
    <a href="https://www.mongodb.com" target="_blank" rel="noreferrer"> 
      <img src="https://raw.githubusercontent.com/GIGIsOtherStuff/mainWebMedia/main/AppImages/Tools/mongodb.png" 
            alt="MongoDB" width="40" height="40"/> 
  </a>
    <a href="https://huggingface.co" target="_blank" rel="noreferrer">
      <img src="https://raw.githubusercontent.com/GIGIsOtherStuff/mainWebMedia/main/AppImages/Tools/huggingface.png" 
            alt="HuggingFace" width="40" height="40"/> 
  </a></a>
</p>

<h2 align="center">Snippets of code</h2><br/>

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
                <Route path='/' element={<Articles/>}/>
                <Route path='/trustedPosts' element={<OfficialArticles/>}/>
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
<hr/>

```javascript
// ...
//  Snippet of backend code when connecting routes with imported functions

app.post('/register', async (req, res) => RegisterPost(req,res))
app.post('/login', async (req, res) => LoginPost(req,res))
app.post('/logout', (req,res)=>{res.cookie('token', '').json('ok')})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => PostPost(req,res));
app.put('/post', uploadMiddleware.single('file'), async (req,res)=> PutPost(req,res))
app.get('/post/:id', async(req,res)=> GetPostId(req,res))
app.delete('/delete/:id', (req, res) => DeletePostById(req,res))

app.post('/post/:id/like', async (req, res) => PostLikeId(req,res))

// ...
```
<h2 align="center">Project Screenshots:</h2>
<div align="center">

  <img src="./public/registerPage.png" alt="project-screenshot" width="460" height="450"><hr/>
  <img src="./public/postsPreview.png" alt="project-screenshot" style="width: 900%; height: 369px"><hr/>
  <img src="./public/trustedPage.png" alt="project-screenshot" style="width: 90%; height: 369px"><hr/>

</div>

  ## 🪪 License
This project is licensed under the [MIT License](LICENSE).

</div><br></br>

[![Portfolio](https://img.shields.io/badge/Portfolio-62b1ff?style=for-the-badge&logo=web&logoColor=white)](https://www.gigicodeace.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-3e3eff?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/dobre-robert-03653b331/)
[![GitHub](https://img.shields.io/badge/GitHub-2f2f2f?style=for-the-badge&logo=github&logoColor=white)](https://github.com/GIGI-CodeAce)
[![CSS Battles](https://img.shields.io/badge/CSS%20Battles-ff6e96?style=for-the-badge&logo=css3&logoColor=white)](https://cssbattle.dev/player/gigi)

  <b></b>
   <h4>~GIGI <code>Dore Robert</code></h4>
</footer>