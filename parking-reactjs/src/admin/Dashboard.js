import { ClipLoader } from "react-spinners"
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import apiServices from "../services/apiServices";
export default function Dashboard(){
    const [loading,setLoading]=useState(true)
    const override={
        "display":"block",
        "margin":"0 auto",
        "position":"absolute",
        "top":"35%",
        "zIndex":"1",
    }
    const [totalData,setTotalData]=useState()
   
    useEffect(()=>{
        apiServices.dashboard().then((data)=>{
            setLoading(false)
           setTotalData(data.data)
            console.log(data)
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went Wrong!!")
            setTimeout(()=>{
                setLoading(false)
            },2000)
        })
    },[])
    return(
        <>
         <div className="d-flex justify-content-center">
            <ClipLoader loading={loading} cssOverride={override} size={120}/>
        </div>
        <div className={loading?"disabled-screen-full":""}>   
        <main id="main">
            <section className="intro-single">
                <div className="container my-5">
                    <h1 className="text-center">Welcome Admin</h1>
                </div>
                <div className="container my-5 ">
                <div className="row text-center">
                    <div className="col-md-6 my-3  ">
                        <div className="card text-center">
                            <i className="bi bi-person text-danger fs-1"></i>
                            <h1 className="card-title">Buyers</h1>
                            <div className="card-body text-center">
                                <h1>{totalData?.totalCustomers}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 my-3">
                        <div className="card  text-center">
                            <i className="bi bi-airplane fs-1 text-info"></i>
                            <h1 className="card-title">Parkings</h1>
                            <div className="card-body text-center">
                                <h1>{totalData?.totalParkings}</h1>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-md-6 my-3">
                        <div className="card  text-center">
                            <i className="bi bi-building fs-1 text-success"></i>
                            <h1 className="card-title">Bookings</h1>
                            <div className="card-body text-center">
                                <h1>{totalData?.totalBookings}</h1>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-md-6 my-3  ">
                        <div className="card text-center">
                            <i className="bi bi-ticket fs-1 text-primary"></i>
                            <h1 className="card-title">Today Bookings</h1>
                            <div className="card-body text-center">
                                <h1>{totalData?.todaysBookings}</h1>
                            </div>
                        </div>
                    </div>
                   
                </div>
            </div>
            </section>
        </main>
        </div>
        </>
    )
}