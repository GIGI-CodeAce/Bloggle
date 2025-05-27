import { useContext, useEffect, } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";

function NavigationBar() {
    const liStyle = " mr-6 flex items-center justify-cente hover:font-bold cursor-pointer w-auto hover:underline";
    const {setUserInfo, userInfo} = useContext(UserContext)

    useEffect(()=>{
        fetch('http://localhost:4000/profile',{
            method: 'GET',
            credentials: 'include',
        }).then(res => {
            res.json().then(userInfo => {
                setUserInfo(userInfo)
            })
        })
    }, [])

    function logout(){
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: "POST"
        })
        setUserInfo(null)
    }

    const username = userInfo?.username

    return (
        <>
        <nav className="fixed top-0 left-0 w-full h-10 bg-[#020303c9] z-[100] text-white flex items-center">
  <div className="max-w-screen-xl mx-auto w-full flex items-center justify-between px-2">
    <Link
      to="/"
      className={`${liStyle} w-[150px] font-bold flex items-center justify-center`}
    >
      <img className="h-7 m-1 mr-2 font-imfell" src="/bloggleLogo.png" alt="Bloggle Logo" />
      Bloggle
    </Link>

    <div className="flex space-x-4 text-lg items-center">
      {username ? (
        <>
          <Link className={`${liStyle}`} to="/create">
            New Post
            <span className="text-[11px] ml-1 font-bold">({username})</span>
          </Link>
          <button className={`${liStyle}`} onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className={liStyle}>
            Login
          </Link>
          <Link to="/register" className={liStyle}>
            Register
          </Link>
        </>
      )}
    </div>
  </div>
</nav>
<div className="h-13" />

        </>
    );
}

export default NavigationBar;
