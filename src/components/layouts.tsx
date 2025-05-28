import { Outlet } from "react-router-dom"
import NavigationBar from "./navBar"
import Footer from "./footer"
import CategoriesTab from "../categoriesSelect"

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

export function CategoryLayout(){
    return(
        <>
        <CategoriesTab/>
        <Outlet/>
        </>
    )
}