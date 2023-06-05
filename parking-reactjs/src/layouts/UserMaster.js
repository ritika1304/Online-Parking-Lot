import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
export default function UserMaster(){
    return(
        <>
            <UserHeader/>
            <Outlet/>
            <Footer/>
            <ToastContainer/>
        </>
    )
}