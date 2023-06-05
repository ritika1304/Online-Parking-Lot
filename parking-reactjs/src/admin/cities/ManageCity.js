import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners"
import apiServices, {BASE_URL_IMG} from "../../services/apiServices";
export default function ManageCity(){
    const [loading,setLoading]=useState(true)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"45%",
        "zIndex":"1",
    }
    const [city,setCity]=useState()
    useEffect(()=>{
        apiServices.allCity().then((data)=>{
            // console.log(data)
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                setCity(data.data.city)
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
    return(
        <>
         <div className="d-flex justify-content-center">
            <ClipLoader loading={loading} cssOverride={override} size={120}/>
        </div>
        <div className={loading?"disabled-screen-full":""}>   
        <main id="main">
            <section className="intro-single my-5">
                <div className="container  pt-3">
                    <h1 className="text-center text-primary1">Manage City</h1>
                    <div className="container my-5 table-responsive">
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Image</th>
                                    <th>City Name</th>
                                    <th>Edit</th>
                                </tr>
                            </thead>
                            {city?.map((element,index)=>(
                                <tr key={index+1}>
                                    <td>{index+1}</td>
                                    <td>
                                        <img src={BASE_URL_IMG+element?.cityImage} className="img-fluid" style={{height:"150px"}}/>
                                    </td>
                                    <td>{element?.cityName}</td>
                                    <td>
                                        <Link to={`/admin/update_city/${element?._id}`}>
                                            <i className="bi bi-pencil-square fs-3 text-success"></i>
                                        </Link>
                                    </td>
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