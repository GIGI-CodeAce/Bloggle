import { useState, useEffect, type FormEvent } from "react"
import { API_BASE } from "../components/api"

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [warningMessage, setWarningMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [visible, setVisible] = useState(true)

  function ResetRegister() {
    setUsername('')
    setPassword('')
    setRepeatPassword('')
  }

  useEffect(() => {
    setWarningMessage('')
    setSuccessMessage('')
  }, [username, password])

 async function Register(e: FormEvent) {
  e.preventDefault();

  setWarningMessage('')
  setSuccessMessage('')


  if (!username || !password) {
    setWarningMessage('Please enter your register information');
    return
  }

  if (password !== repeatPassword) {
    setWarningMessage('Passwords do not match.');
    return
  }

  const response = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  })

  if (response.status !== 200) {
    const errorData = await response.json()
    if (errorData?.error === 'Username already exists') {
      setWarningMessage('Username already taken')
    } else {
        if(username.length > 15 || username.length <= 3){
    setWarningMessage('Username should be over 4 and less than 15 characters long')
  }else{
    setWarningMessage('Registration failed. Please try again.')
  }
    }
  } else {
    setSuccessMessage('Account created. Go to login to sign in.')
    setTimeout(() => {
      ResetRegister()
    }, 2222);
  }
}

  return (
    <main className="max-w-screen-xl mx-auto p-1">
      <form
        className="flex flex-col gap-4 max-w-sm mx-auto mt-10"
        onSubmit={Register}
      >
                  <span 
          className="material-symbols-outlined select-none !text-[70px] mb-[-20px] text-gray-600 text-center">
              face
          </span>
        <h1 className="font-bold text-3xl mx-auto hover:underline">Register</h1>

        <label className="flex flex-col">
          <h1 className="hover:underline pl-1 mb-1">Username</h1>
          <input
          type="text"
          placeholder="Choose username (min 4, max 15 chars)"
          className="p-2 border rounded-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        </label>

       <div className="relative">
          <span onClick={()=> setVisible((old)=> !old)} className="material-symbols-outlined absolute top-[34px] right-1 p-1 select-none cursor-pointer">
            {visible ? 'visibility' : 'visibility_off'}
        </span>
        <label className="flex flex-col">
          <h1 className="hover:underline pl-1 mb-1">Password</h1>
              <input type={visible ? 'password' : 'text'}
           placeholder="Choose password"
           className="p-2 border rounded-lg w-full  pr-9" 
           value={password}
           onChange={((e)=> setPassword(e.target.value))}
            />
        </label>
       </div>
                <input
          type="password"
          placeholder="Repeat password"
          className="p-2 border rounded-lg"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

        <button
          className="p-2 bg-black transition-all active:text-green-300 cursor-pointer hover:rounded-xl text-white rounded-lg hover:bg-gray-800">
          Register
        </button>
      </form>

      <div className="text-center m-2 h-5">
        {warningMessage && <p className="text-red-500">{warningMessage}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}
      </div>
            <div className="text-center m-2">
        <h1 className="text-center text-lg font-extrabold">
          Welcome! <span className="text-gray-600">Happy to see you there</span>
        </h1>
      </div>
    </main>
  );
}

export default RegisterPage
