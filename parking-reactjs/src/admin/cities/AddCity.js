import { useState } from "react"
import {toast} from "react-toastify";
import { ClipLoader } from 'react-spinners';
import apiServices from "../../services/apiServices";
export default function AddCity(){
    const [city,setCity]=useState()
    const [image,setImage]=useState()
    const [loading,setLoading]=useState(false)
    const override={
        "display":"block",
        "margin":"0 auto",
        "position":"absolute",
        "top":"35%",
        "zIndex":"1",
    }
    const handleForm=(e)=>{
        e.preventDefault()
        setLoading(true)
        let data=new FormData()
        data.append("cityName", city)
        data.append("cityImage", image)
        apiServices.addCity(data).then((data)=>{
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                toast.success(data.data.message)
                setCity("")
                setImage("")
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            // console.log(error)
            toast.error("Something went wrong")
            setTimeout(()=>{
                setLoading(false)
            },1500)
        })
    }
    return(
        <>
        <div className="d-flex justify-content-center">
            <ClipLoader loading={loading} cssOverride={override} size={120}/>
        </div>
        <div className={loading?"disabled-screen-full":""}>
        <section className="contact_section layout_padding">
            <div className="container my-5">
            <div className="heading_container">
                <h2>
                Add City
                </h2>
            </div>
                <div className="row my-5">
                <div className="col-md-10 mx-auto">
                    <form onSubmit={handleForm} method='post'>
                        <div className="row">
                            <div className="col-md-2 offset-md-1">
                                <label>City Name</label>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" type="text" value={city} onChange={(e)=>{setCity(e.target.value)}} required/>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-md-2 offset-md-1">
                                <label>Thumbnail</label>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" type="file"  onChange={(e)=>{setImage(e.target.files[0])}} required/>
                            </div>
                        </div>
                        <div className="d-flex mb-3 mt-4 justify-content-center">
                            <button className="btn btn-outline-light btn-lg w-25 mb-4" onClick={handleForm}>Submit</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </section>   
            </div>
        </>
    )
}