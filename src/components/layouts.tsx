import { Outlet } from "react-router-dom";
import NavigationBar from "./navBar";
import Footer from "./footer";
import { useEffect } from "react";
import CategoriesTab from "./categoriesSelect";


export function DefLayout() {
    return (
        <>
            <NavigationBar />
            <Outlet />
        </>
    );
}

export function FooterLayout() {
    return (
        <>
            <Outlet />
            <Footer />
        </>
    );
}

export function CategoryLayout() {
    return (
        <>
            <CategoriesTab />
            <Outlet />
        </>
    );
}

export function ScrollToTopArrow(){

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    };

    useEffect(() => {
        const handleScroll = () => {
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    return(
        <>
                <Outlet/>
                        <div className="w-full">
                    <button
                        title="Scroll to top"
                        onClick={scrollToTop}
                        className="animate-bounce text-black py-2 px-4 pb-1 rounded-full cursor-pointer hover:bg-gray-100 transition-all mx-auto block"
                        aria-label="Scroll to top"
                    >
                        <span className="material-symbols-outlined">
                            keyboard_double_arrow_up
                        </span>
                    </button>
                </div>
        </>
    )
}