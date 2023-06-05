import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners"
import apiServices, { BASE_URL_IMG } from "../../services/apiServices";

export default function ViewSlots(){
    const param = useParams()
    const [isToken,settoken]=useState(false)
    const [loading,setLoading]=useState(true)
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
        let data = {
            parkingId:param._id
        }
        apiServices.viewslots(data).then((data)=>{
            // console.log(data)
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                // console.log(data.data.slots)
                setCity(data.data.slots)
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
                    <h1 className="text-center text-primary1">Parking Slots</h1>
                    <div className="container-fluid px-5 my-5">
                        <div className="row">
                            {city?.map((el,index)=>(
                                <div className="col-md-4 my-3 p-3" key={index}>
                                    <Link to={"/user/view_slots/"+`${el?._id}`}>
                                    <div className="card p-3" style={{maxHeight:"400px"}}>
                                        { isToken ? 
                                        <Link to={'/user/add_booking/'+`${el?._id}`+'/'+`${el?.parkingId?._id}`}>
                                            <h5 className="card-text my-3 text-center btn btn-dark">{el?.parkingId?.parkingname} - Book Now
                                            </h5>
                                        </Link> : null}
                                        { !isToken ? 
                                            <h5 className="card-text my-3 text-center btn btn-dark">{el?.parkingId?.parkingname}
                                            </h5> : null}
                                        <p className="text-dark"><strong>2 Wheeler</strong><br></br> slots: {el?.twowhslot} <br/> Price per Day : Rs. {el?.twowhcostperday } & Price per Hour : Rs. {el?.twowhcostperhour }</p>
                                        <hr></hr>
                                        
                                        <p className="text-dark"><strong>3 Wheeler</strong><br></br> slots: {el?.threewhslot} <br/> Price per Day : Rs. {el?.threewhcostperday } & Price per Hour : Rs. {el?.threewhcostperhour }</p>
                                        <hr></hr>

                                        <p className="text-dark"><strong>4 Wheeler</strong><br></br> slots: {el?.fourwhslot} <br/> Price per Day : Rs. {el?.fourwhcostperday } & Price per Hour : Rs. {el?.fourwhcostperhour }</p>
                                    </div>
                                    </Link>
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