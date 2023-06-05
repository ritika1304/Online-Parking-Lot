import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners"
import apiServices from "../../services/apiServices";

export default function ViewBooking(){
    const [loading,setLoading]=useState(true)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"45%",
        "zIndex":"1",
    }
    const [city,setCity]=useState()
    useEffect(()=>{
        apiServices.showbooking({customerId:sessionStorage.getItem("user_id")}).then((data)=>{
            // console.log(data)
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                // console.log(data.data.booking)
                setCity(data.data.booking)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            // console.log(error)
            // toast.error("Something went wrong!!Try Again Later")
            setTimeout(()=>{
                setLoading(false)
            },1000)
        })
    },[loading])
    return(
        <>
         <div className="d-flex justify-content-center">
            <ClipLoader loading={loading} cssOverride={override} size={120}/>
        </div>
        <div className={loading?"disabled-screen-full":""}>   
        <main id="main">
            <section className="intro-single my-5">
                <div className="container  pt-3">
                    <h1 className="text-center text-primary1">Manage Bookings</h1>
                    <div className="container my-5 table-responsive">
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Vehicle</th>
                                    {/* <th>Parking</th> */}
                                    <th>Amount</th>
                                    <th>Checked In</th>
                                    <th>Checked Out</th>
                                    <th>Booking Date</th>
                                </tr>
                            </thead>
                            {city?.map((element,index)=>(
                                <tr key={index+1}>
                                    <td>{index+1}</td>
                                    <td>{element?.vehicleId?.vehiclename}</td>
                                    <td>Rs.{element?.bookingAmount}</td>
                                    <td>{element?.isCheckedIn ? 'Yes' : 'No'}</td>
                                    <td>{element?.isCheckedOut ? 'Yes' : 'No'}</td>
                                    <td>{(element?.bookingDate).split('T',1)}</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                </div>
            </section>
        </main>
        </div>
        </>
    )
}