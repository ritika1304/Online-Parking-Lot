import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners"
import apiServices from "../../services/apiServices";

export default function ViewVehicle(){
    const [loading,setLoading]=useState(true)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"45%",
        "zIndex":"1",
    }
    const [city,setCity]=useState()
    useEffect(()=>{
        apiServices.showvehicle({}).then((data)=>{
            // console.log(data)
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                // console.log(data.data)
                setCity(data.data.vehicle)
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
                    <h1 className="text-center text-primary1">Manage Vehicle</h1>
                    <div className="container my-5 table-responsive">
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Vehicle Name</th>
                                    <th>Vehicle Type</th>
                                    <th>Vehicle Number</th>
                                    <th>Vehicle Model</th>
                                </tr>
                            </thead>
                            {city?.map((element,index)=>(
                                <tr key={index+1}>
                                    <td>{index+1}</td>
                                    <td>{element?.vehiclename}</td>
                                    <td>{element?.vehicletype == 1 ?'2 Wheeler' : element?.vehicletype == 2 ? '3 Wheeler' : '4 Wheeler'}</td>
                                    <td>{element?.vehiclenumber}</td>
                                    <td>{element?.vehiclemodel}</td>                                   
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