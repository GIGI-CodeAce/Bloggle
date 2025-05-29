import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../userContext";
import { API_BASE } from "./api";

function NavigationBar() {
  const [hoveringLink, setHoveringLink] = useState<string | null>(null);
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_BASE}/profile`, {
      method: 'GET',
      credentials: 'include',
    }).then(res => {
      res.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch(`${API_BASE}/logout`, {
      credentials: 'include',
      method: "POST"
    }).then(() => {
      setUserInfo(null);
      navigate('/');
    });
  }

  const username = userInfo?.username;

  const getLinkClass = (name: string) =>
    `mr-6 flex items-center justify-center cursor-pointer w-auto ${
      hoveringLink === name ? 'underline font-bold' : ''
    }`;

  const handleEnter = (name: string) => setHoveringLink(name);
  const handleLeave = () => setHoveringLink(null);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-10 bg-[#020303c9] z-[100] text-white flex items-center">
        <div className="max-w-screen-xl mx-auto w-full flex items-center justify-between px-2">
          <Link
            to="/"
            className={getLinkClass('home') + ' w-[150px] font-bold flex items-center justify-center'}
            onMouseEnter={() => handleEnter('home')}
            onMouseLeave={handleLeave}
            onTouchStart={() => handleEnter('home')}
            onTouchEnd={handleLeave}
          >
            <img
              className="h-7 m-1 mr-2 font-imfell"
              src="https://raw.githubusercontent.com/GIGIsOtherStuff/mainWebMedia/main/AppImages/myProjectsImgs/bloggleLogo.png"
              alt="Bloggle Logo"
            />
            Bloggle
          </Link>

          <div className="flex space-x-4 text-lg items-center">
            {username ? (
              <>
                <Link
                  to="/create"
                  className={getLinkClass('create')}
                  onMouseEnter={() => handleEnter('create')}
                  onMouseLeave={handleLeave}
                  onTouchStart={() => handleEnter('create')}
                  onTouchEnd={handleLeave}
                >   New Post
                  <span className="text-[11px] ml-1 font-bold">({username})</span>
                </Link>
                <button
                  className={getLinkClass('logout')}
                  onClick={logout}
                  onMouseEnter={() => handleEnter('logout')}
                  onMouseLeave={handleLeave}
                  onTouchStart={() => handleEnter('logout')}
                  onTouchEnd={handleLeave}
                >   Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={getLinkClass('login')}
                  onMouseEnter={() => handleEnter('login')}
                  onMouseLeave={handleLeave}
                  onTouchStart={() => handleEnter('login')}
                  onTouchEnd={handleLeave}
                >   Login
                </Link>
                <Link to="/register"
                  className={getLinkClass('register')}
                  onMouseEnter={() => handleEnter('register')}
                  onMouseLeave={handleLeave}
                  onTouchStart={() => handleEnter('register')}
                  onTouchEnd={handleLeave}
                >   Register
                </Link>
              </>
            )}
          </div></div></nav>
      <div className="h-10" />
    </>
  );
}

export default NavigationBar;
