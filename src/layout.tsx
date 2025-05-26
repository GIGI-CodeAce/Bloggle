import { Outlet } from "react-router-dom"
import NavigationBar from "./navBar"
import Footer from "./footer"

export function DefLayout(){
    return(
        <>
        <NavigationBar/>
        <Outlet/>
        </>
    )
}

export function FooterLayout(){
    return(
        <>
        <Outlet/>
        <Footer/>
        </>
    )
}