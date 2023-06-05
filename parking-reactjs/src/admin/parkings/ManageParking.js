import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners"
import apiServices from "../../services/apiServices";
export default function ManageParking(){
    const [loading,setLoading]=useState(true)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"45%",
        "zIndex":"1",
    }
    const [myData,setMyData]=useState([{}])
    useEffect(()=>{
        apiServices.allParking().then((data)=>{
            // console.log(data)
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                setMyData(data.data.parking)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            // console.log(error)
            toast.error("Something went wrong!!Try Again Later")
            setTimeout(()=>{
                setLoading(false)
            },1000)
        })
    },[loading])
    const deleteData=(id)=>{
        setLoading(true)
        let data={
            id:id
        }
        apiServices.deleteParking(data).then((data)=>{
            // console.log(data)
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                toast.success(data.data.message)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            // console.log(error)
            toast.error("Something went wrong!!Try Again Later")
            setTimeout(()=>{
                setLoading(false)
            },1000)
        })
    }
    return(
        <>
         <div className="d-flex justify-content-center">
            <ClipLoader loading={loading} cssOverride={override} size={120}/>
        </div>
        <div className={loading?"disabled-screen-full":""}>   
        <main id="main">
            <section className="intro-single my-5 text-capitalize">
                <div className="container  pt-3">
                    <h1 className="text-center text-primary1">Manage Parkings</h1>
                    <div className="container my-5 table-responsive">
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Parking Name</th>
                                    <th>City Name</th>
                                    <th>Longitude/Latitude</th>
                                    <th>Parking Owner Details</th>
                                    <th>Address</th>
                                    <th>Edit</th>
                                    {/* <th>Delete</th> */}
                                </tr>
                            </thead>
                            {myData?.map((element,index)=>(
                                <tr key={index+1}>
                                    <td>{index+1}</td>
                                    <td>{element?.parkingname}</td>
                                    <td>{element?.cityId?.cityName}</td>
                                    <td>{element?.longitude}- {element?.latitude}</td>
                                    <td>{element?.parkingowner},<br/> {element?.email},<br/> {element?.phone}</td>
                                    <td>{element?.address}</td>
                                    <td>
                                        <Link to={`/admin/update_parking/${element?._id}`}>
                                            <i className="bi bi-pencil-square fs-3 text-success"></i>
                                        </Link>
                                    </td>
                                    {/* <td>
                                        <button className="btn btn-danger" onClick={()=>{deleteData(element?._id)}}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td> */}
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