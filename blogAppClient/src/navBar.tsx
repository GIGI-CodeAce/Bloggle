import { Link } from "react-router-dom";

function NavigationBar() {
    const liStyle = "ml-3 hover:cursor-pointer w-[80px] hover:underline";

    return (
        <nav className="w-full max-w-screen-xl mx-auto h-10 mb-5 flex items-center">
            <ul className="flex h-full text-lg justify-between items-center w-full">
                <Link to="/" className={`${liStyle} font-bold`}>My blog</Link>
                <ul className="flex">
                    <Link to="/login" className={liStyle}>Login</Link>
                    <Link to="/register" className={liStyle}>Register</Link>
                </ul>
            </ul>
        </nav>
    );
}

export default NavigationBar;
