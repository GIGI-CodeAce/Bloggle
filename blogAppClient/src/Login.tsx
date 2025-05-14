import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./userContext";

function LoginPage() {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [redirect, setRedirect] = useState(false)
  const {setUserInfo} = useContext(UserContext)

  function ResetLogin(){
    setUsername('')
    setPassword('')
  }

  async function Login(e:any) {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

        if (!response.ok) {
      alert('Registration failed');
    } else {
      response.json().then(userInfo => {
        setUserInfo(userInfo)
        setRedirect(true)
      })
      ResetLogin();
    }

  }

  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
<main className="max-w-screen-xl mx-auto">
    <form className="flex flex-col gap-4 max-w-sm mx-auto mt-10"
          onSubmit={Login}>
          <h1 className="font-bold text-3xl mx-auto">Login</h1>

    <input type="text"
           placeholder="Username"
           className="p-2 border rounded"
           value={username}
           onChange={((e)=> setUsername(e.target.value))}
       />

    <input type="password"
           placeholder="Password"
           className="p-2 border rounded" 
           value={password}
           onChange={((e)=> setPassword(e.target.value))}
      />

    <button className="p-2 bg-black text-white rounded hover:bg-gray-800">
      Login
    </button>
    </form>
</main>

  )
}

export default LoginPage
