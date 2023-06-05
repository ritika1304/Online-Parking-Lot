import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AdminHeader from "./AdminHeader";
import Footer from "../../layouts/Footer";
export default function AdminMaster(){
    return(
        <>
            <AdminHeader/>
            <Outlet/>
            <Footer/>
            <ToastContainer/>
        </>
    )
}