import { useContext, useEffect, } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./userContext";

function NavigationBar() {
    const liStyle = "mr-4 flex items-center justify-cente hover:cursor-pointer w-auto hover:underline";
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
        <nav className="w-full max-w-screen-xl mx-auto h-10 mb-5 flex items-center">
            <ul className="flex h-full text-lg justify-between items-center w-full">
                <Link to="/" className={`${liStyle} w-[150px] font-bold flex items-center justify-center`}>
                <img className="h-7 m-1 mr-2" src="/public/bloggleLogo.png"/> Bloggle</Link>
                <ul className="flex">
            {username && (
                <>
                <Link className={`${liStyle} w-`} to="/create">New post 
                 <span className="text-[11px] ml-1 font-bold"> ({username})</span></Link>
                <a className={`${liStyle}`} onClick={(()=> logout())}>Logout</a>
                </>
            )}
            {!username && (
                <>
                    <Link to="/login" className={liStyle}>Login</Link>
                    <Link to="/register" className={liStyle}>Register</Link>
                </>
            )}
                </ul>
            </ul>
        </nav>
    );
}

export default NavigationBar;
