import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NavigationBar() {
    const liStyle = "ml-3 hover:cursor-pointer w-[100px] hover:underline";
     const [username, setUsername] = useState(null)

    useEffect(()=>{
        fetch('http://localhost:4000/profile',{
            method: 'GET',
            credentials: 'include',
        }).then(res => {
            res.json().then(userInfo => {
                setUsername(userInfo.username)
            })
        })
    }, [])

    function logout(){
        //
    }

    return (
        <nav className="w-full max-w-screen-xl mx-auto h-10 mb-5 flex items-center">
            <ul className="flex h-full text-lg justify-between items-center w-full">
                <Link to="/" className={`${liStyle} font-bold`}>My blog</Link>
                <ul className="flex">
            {username && (
                <>
                <Link className={liStyle} to="/create">New post</Link>
                <a className={liStyle} onClick={(()=> logout())}>Logout</a>
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
