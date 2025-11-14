import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { API_BASE } from "../components/api";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const [redirect, setRedirect] = useState(false);
  const [notRunningServer, setNotRunningServer] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [visible, setVisible] = useState(true);
  const [warningDisplay, setWarningDisplay] = useState(false);

  useEffect(() => {
    setWarningDisplay(false);
    setNotRunningServer(false);
  }, [username, password]);

  function ResetLogin() {
    setUsername('');
    setPassword('');
  }

  async function Login(e: any) {
    e.preventDefault()

    if (username === '' && password === '') {
      setWarningDisplay(true);
      setNotRunningServer(false)
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!response.ok) {
        setWarningDisplay(true);
        setNotRunningServer(false);
      } else {
        const userInfo = await response.json();
        setUserInfo(userInfo);
        setRedirect(true);
        ResetLogin();
      }

    } catch (error) {
      console.error('Server error:', error);
      setNotRunningServer(true);
      setWarningDisplay(true);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <main className="max-w-screen-xl mx-auto p-1">
      <form
        className="flex flex-col gap-4 max-w-sm mx-auto mt-10"
        onSubmit={Login}
      >
        <span
          className="material-symbols-outlined select-none !text-[70px] mb-[-20px] text-gray-600 text-center"
        >
          account_circle
        </span>
        <h1 className="font-bold text-3xl hover:underline mx-auto">Login</h1>

        <label className="flex flex-col">
          <h1 className="hover:underline pl-1 mb-1">Username</h1>
          <input
            type="text"
            placeholder="Enter username"
            className="p-2 border rounded-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

        <div className="relative">
          <span
            onClick={() => setVisible((old) => !old)}
            className="material-symbols-outlined absolute top-[34px] right-1 p-1 select-none cursor-pointer"
          >
            {visible ? 'visibility' : 'visibility_off'}
          </span>
          <label>
            <h1 className="hover:underline pl-1 mb-1">Password</h1>
            <input
              type={visible ? 'password' : 'text'}
              placeholder="Enter password"
              className="p-2 border rounded-lg w-full pr-9"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <button
          className="p-2 bg-black transition-all active:text-green-300 cursor-pointer hover:rounded-xl text-white rounded-lg hover:bg-gray-800"
        >
          Login
        </button>
      </form>

      {/* Warning / Error messages */}
      <div className="h-6 mt-2 mb-1">
      {warningDisplay && (
        <div className="text-center text-red-600">
          {notRunningServer ? (
            <h1>Server not running or unreachable.</h1>
          ) : username === '' && password === '' ? (
            <h1>Please enter your login information</h1>
          ) : (
            <h1>Invalid username and/or password</h1>
          )}
        </div>
      )}
      </div>

        <div className="text-center text-lg font-extrabold text-gray-600 text-[16px]">Dont have an account yet?
            <span className="text-black cursor-pointer underline active:text-gray-400" 
            onClick={()=> navigate('/register')}> Register</span>
            </div>
    </main>
  );
}

export default LoginPage
