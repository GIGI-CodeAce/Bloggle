import { Outlet } from "react-router-dom"
import NavigationBar from "./navBar"

function DefLayout(){
    return(
        <>
        <NavigationBar/>
        <Outlet/>
        </>
    )
}

export default DefLayout