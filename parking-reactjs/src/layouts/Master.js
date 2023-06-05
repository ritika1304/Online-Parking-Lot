import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
export default function Master(){
    return(
        <>
            <Header/>
            <Outlet/>
            <Footer/>
            <ToastContainer/>
        </>
    )
}