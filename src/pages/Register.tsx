import { useState, useEffect, type FormEvent } from "react";
import { API_BASE } from "../components/api";

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [visible, setVisible] = useState(true)

  function ResetRegister() {
    setUsername('');
    setPassword('');
    setRepeatPassword('')
  }

  useEffect(() => {
    setWarningMessage('');
    setSuccessMessage('');
  }, [username, password]);

 async function Register(e: FormEvent) {
  e.preventDefault();

  setWarningMessage('');
  setSuccessMessage('');


  if (!username || !password) {
    setWarningMessage('Please enter your register information');
    return;
  }

  if (password !== repeatPassword) {
    setWarningMessage('Passwords do not match.');
    return;
  }

  const response = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  if (response.status !== 200) {
    const errorData = await response.json();
    if (errorData?.error === 'Username already exists') {
      setWarningMessage('Username already taken');
    } else {
        if(username.length > 15 || username.length <= 3){
    setWarningMessage('Username should be over 4 and less than 15 characters long')
  }else{
    setWarningMessage('Registration failed. Please try again.');
  }
    }
  } else {
    setSuccessMessage('Account created. Go to login to sign in.');
    setTimeout(() => {
      ResetRegister();
    }, 2100);
  }
}

  return (
    <main className="max-w-screen-xl mx-auto p-1">
      <form
        className="flex flex-col gap-4 max-w-sm mx-auto mt-10"
        onSubmit={Register}
      >
        <h1 className="font-bold text-3xl mx-auto hover:underline">Register</h1>

        <input
          type="text"
          placeholder="Username (min 4, max 15 chars)"
          className="p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

       <div className="relative">
          <span onClick={()=> setVisible((old)=> !old)} className="material-symbols-outlined absolute top-[10px] right-2 select-none cursor-pointer">
            {visible ? 'visibility' : 'visibility_off'}
        </span>
    <input type={visible ? 'password' : 'text'}
           placeholder="Password"
           className="p-2 border rounded w-full  pr-9" 
           value={password}
           onChange={((e)=> setPassword(e.target.value))}
      />
       </div>
        <input
          type="password"
          placeholder="Repeat password"
          className="p-2 border rounded"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

        <button
          className="p-2 bg-black transition-all cursor-pointer hover:rounded-xl text-white rounded hover:bg-gray-800">
          Register
        </button>
      </form>

      <div className="text-center m-2">
        {warningMessage && <p className="text-red-500">{warningMessage}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}
      </div>
    </main>
  );
}

export default RegisterPage;
