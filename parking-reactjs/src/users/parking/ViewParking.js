import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners"
import apiServices, { BASE_URL_IMG } from "../../services/apiServices";

export default function ViewParking(){
    const params = useParams()
    const navigate = useNavigate()
    const [isToken,settoken]=useState(false)
    const parkingId = params._id
    const [loading,setLoading]=useState(true)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"45%",
        "zIndex":"1",
    }
    const [parking,setParking]=useState()
    useEffect(()=>{
        if(sessionStorage.getItem("token") != null)
        {
            settoken(true)
        }
        else{
            settoken(false)
        }
        if(parkingId == 0)
        {
            apiServices.viewparking({}).then((data)=>{
                // console.log(data)
                setTimeout(()=>{
                    setLoading(false)
                },1500)
                if(data.data.success){
                    // console.log(data.data.parking)
                    setParking(data.data.parking)
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
        else{
            apiServices.viewparking({"cityId":parkingId}).then((data)=>{
                // console.log(data)
                setTimeout(()=>{
                    setLoading(false)
                },1500)
                if(data.data.success){
                    // console.log(data.data.parking)
                    setParking(data.data.parking)
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
    },[])
    return(
        <>
        <div className="d-flex justify-content-center">
            <ClipLoader loading={loading} cssOverride={override} size={120}/>
        </div>
        <div className={loading?"disabled-screen-full":""}>
        <main id="main">
            <section className="intro-single px-5 my-5">
                <div className="container-fluid pt-3">
                    <h1 className="text-center text-primary1">Parking</h1>
                    <div className="container-fluid px-5 my-5 table-responsive">
                        <div className="row">
                            {parking?.map((el,index)=>(
                                <div className="col-md-4 my-3 p-3" key={index}>
                                    { isToken ? 
                                    <Link to={"/user/view_slots/"+`${el?._id}`}>
                                    <div className="card p-3" style={{maxHeight:"400px"}}>
                                        <img src={BASE_URL_IMG+`${el?.cityId?.cityImage}`} className="card-img-top" style={{height:"300px"}}/>
                                        <h3 className="card-text text-center my-3">
                                        {el?.parkingname} <i className="bi bi-chevron-right"></i>
                                        </h3>
                                        <p className="text-dark">{el?.address}</p>
                                        <p className="text-dark">{el?.email}</p>
                                        <p className="text-dark">{el?.phone}</p>
                                    </div>
                                    </Link> : null }
                                    { !isToken ? 
                                    <Link to={"/view_slots/"+`${el?._id}`}>
                                    <div className="card p-3" style={{maxHeight:"400px"}}>
                                        <img src={BASE_URL_IMG+`${el?.cityId?.cityImage}`} className="card-img-top" style={{height:"300px"}}/>
                                        <h3 className="card-text text-center my-3">
                                        {el?.parkingname} <i className="bi bi-chevron-right"></i>
                                        </h3>
                                        <p className="text-dark">{el?.address}</p>
                                        <p className="text-dark">{el?.email}</p>
                                        <p className="text-dark">{el?.phone}</p>
                                    </div>
                                    </Link> : null }
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
        </div>
        </>
    )
}