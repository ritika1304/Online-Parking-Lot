import { useEffect, useState } from "react"
import apiServices, { BASE_URL_IMG } from "../../services/apiServices";
import {toast} from "react-toastify";
import { ClipLoader } from 'react-spinners';
import { useNavigate, useParams } from "react-router-dom";
export default function UpdateCity(){
    const navigate=useNavigate()
    const [city,setCity]=useState()
    const [image,setImage]=useState()
    const [loading,setLoading]=useState(false)
    const param=useParams()
    const id=param.id
    const override={
        "display":"block",
        "margin":"0 auto",
        "position":"absolute",
        "top":"35%",
        "zIndex":"1",
    }
    useEffect(()=>{
        setLoading(true)
        let data={
            id:id
        }
        apiServices.getSingleCity(data).then(
            (data)=>{
                setLoading(false)
                console.log(data)
                if(data.data.success){
                    toast.success(data.data.message)
                    setCity(data.data.city.cityName)
                    setImage(data.data.city.cityImage)
                }
                else{
                    toast.error(data.data.message)
                }
            }
        ).catch(
            (error)=>{
            toast.error("Something went wrong")
            setTimeout(()=>{
                setLoading(false)
            },1000)
            }
        )
    },[])
    const handleForm=(e)=>{
        e.preventDefault();
        setLoading(true)
        let data=new FormData()
        data.append("cityName", city)
        data.append("cityImage", image)
        data.append("_id",id)
        apiServices.updateCity(data).then((data)=>{
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                toast.success(data.data.message)
                setTimeout(()=>{
                    navigate("/admin/manage_city")
                },1400)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            toast.error("Something went wrong")
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
                <section className="intro-single contact_section layout_padding">
                    <div className="container  pt-3">
                        <h1 className="text-center ">Update City</h1>
                        <div className="d-flex justify-content-center my-3">
                            <img src={BASE_URL_IMG+`${image}`} style={{height:"200px"}}/>
                        </div>
                        <div className="row">
                            <div className="col-md-2 offset-md-1">
                                <label>City Name</label>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" type="text" value={city} onChange={(e)=>{setCity(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-2 offset-md-1">
                                <label>Thumbnail</label>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" type="file"  onChange={(e)=>{setImage(e.target.files[0])}}/>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-outline-light btn-lg w-25 mb-4" onClick={handleForm}>Submit</button>
                        </div>
                    </div>
                </section>
            </main>
            </div>
        </>
    )
}