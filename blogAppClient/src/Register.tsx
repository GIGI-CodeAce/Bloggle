import { useState } from "react"

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function Register(e:any) {
    e.preventDefault();

    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
    console.log('Server response:', data);
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
          placeholder="Username"
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

        <button className="p-2 bg-black text-white rounded hover:bg-gray-800">
          Register
        </button>
      </form>
    </main>
  );
}

export default RegisterPage;
