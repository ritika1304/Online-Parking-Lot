import { useEffect, useState } from "react"
import {toast} from "react-toastify";
import { ClipLoader } from 'react-spinners';
import apiServices from "../../services/apiServices";
import { useNavigate, useParams } from "react-router-dom";
export default function UpdateParking(){
    const [city,setCity]=useState()
    const [cityId,setCityId]=useState()
    const [parking,setParking]=useState()
    const [longitude,setLongitude]=useState()
    const [latitude,setLatitude]=useState()
    const [owner,setOwner]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [contact,setContact]=useState()
    const [address,setAddress]=useState()
    const [loading,setLoading]=useState(false)
    const override={
        "display":"block",
        "margin":"0 auto",
        "position":"absolute",
        "top":"35%",
        "zIndex":"1",
    }
    const {id}=useParams()
    const nav=useNavigate()
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
        let data_id={
            id:id
        }
        apiServices.singleParking(data_id).then((data)=>{
            // console.log(data)
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                setCityId(data.data.parking.cityId?._id)
                setAddress(data.data.parking.address)
                setContact(data.data.parking.phone)
                setEmail(data.data.parking.email)
                setLatitude(data.data.parking.latitude)
                setLongitude(data.data.parking.longitude)
                setOwner(data.data.parking.parkingowner)
                setParking(data.data.parking.parkingname)
                // setPassword(data.data.parking.password)
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
    const handleForm=(e)=>{
        e.preventDefault()
        setLoading(true)
        let data={
        "cityId": cityId,
        "parkingname":parking,
        "city":cityId,
        "longitude":longitude,
        "latitude":latitude,
        "phone":contact,
        "parkingowner":owner,
        "address":address,
        "password":password,
        "email":email,
        "id":id
        }
        apiServices.updateParking(data).then((data)=>{
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                toast.success(data.data.message)
              setTimeout(()=>{
                nav("/admin/manage_parking")
              },1400)
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
                Update City
                </h2>
            </div>
                <div className=" my-3 my-5">
                <div className="col-md-12 mx-auto">
                    <form onSubmit={handleForm} method='post'>
                    <div className="row my-3">
                            <div className="col-md-2 offset-md-1">
                                <label>Parking Name</label>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" type="text" value={parking} onChange={(e)=>{setParking(e.target.value)}} required/>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-2 offset-md-1">
                                <label>City Name</label>
                            </div>
                            <div className="col-md-8">
                                <select className="form-control" type="text" value={cityId} onChange={(e)=>{setCityId(e.target.value)}} required>
                                    <option  disabled value="">Choose City</option>
                                    {city?.map((el,index)=>(
                                        <option key={index} value={el?._id} selected={cityId==el?._id}>{el?.cityName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-2 offset-md-1">
                                <label>Longitude</label>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" type="number" value={longitude} onChange={(e)=>{setLongitude(e.target.value)}} required/>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-2 offset-md-1">
                                <label>Latitude</label>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" type="number" value={latitude} onChange={(e)=>{setLatitude(e.target.value)}} required/>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-2 offset-md-1">
                                <label>Parking Owner</label>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" type="text" value={owner} onChange={(e)=>{setOwner(e.target.value)}} required/>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-2 offset-md-1">
                                <label>Contact Number</label>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" type="number" value={contact} onChange={(e)=>{setContact(e.target.value)}} required/>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-2 offset-md-1">
                                <label>Email</label>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-2 offset-md-1">
                                <label>Password</label>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-2 offset-md-1">
                                <label>Address</label>
                            </div>
                            <div className="col-md-8">
                                <textarea className="form-control" type="text" value={address} onChange={(e)=>{setAddress(e.target.value)}} required/>
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