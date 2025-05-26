import { useState, useEffect, type FormEvent } from "react";

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

  const response = await fetch('http://localhost:4000/register', {
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
    <main className="max-w-screen-xl mx-auto">
      <form
        className="flex flex-col gap-4 max-w-sm mx-auto mt-10"
        onSubmit={Register}
      >
        <h1 className="font-bold text-3xl mx-auto">Register</h1>

        <input
          type="text"
          placeholder="Username (min 4, max 15 chars)"
          className="p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Repeat password"
          className="p-2 border rounded"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />

        <button
          className="p-2 bg-black text-white rounded hover:bg-gray-800">
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
