import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners"
import apiServices, { BASE_URL_IMG } from "../../services/apiServices";
export default function ViewCity(){
    const [loading,setLoading]=useState(true)
    const [isToken,settoken]=useState(false)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"45%",
        "zIndex":"1",
    }
    const [city,setCity]=useState()
    useEffect(()=>{
        if(sessionStorage.getItem("token") != null)
        {
            settoken(true)
        }
        else{
            settoken(false)
        }
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
                    <h1 className="text-center text-primary1">City</h1>
                    <div className="container-fluid px-5 my-5 table-responsive">
                        <div className="row">
                            {city?.map((el,index)=>(
                                <div className="col-md-4 my-3 p-3" key={index}>
                                    {isToken ? <Link to={"/user/view_parking/"+`${el?._id}`} > 
                                    <div className="card p-3" style={{maxHeight:"400px"}}>
                                        <img src={BASE_URL_IMG+`${el?.cityImage}`} className="card-img-top" style={{height:"300px"}}/>
                                        <h3 className="card-text text-center my-3">
                                        {el?.cityName} <i className="bi bi-chevron-right"></i>
                                        </h3>
                                    </div>
                                    </Link> : null }
                                    {!isToken ? <Link to={"/view_parking/"+`${el?._id}`} > 
                                    <div className="card p-3" style={{maxHeight:"400px"}}>
                                        <img src={BASE_URL_IMG+`${el?.cityImage}`} className="card-img-top" style={{height:"300px"}}/>
                                        <h3 className="card-text text-center my-3">
                                        {el?.cityName} <i className="bi bi-chevron-right"></i>
                                        </h3>
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