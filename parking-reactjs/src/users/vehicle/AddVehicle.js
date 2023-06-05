import { useState } from "react"
import {toast} from "react-toastify";
import { ClipLoader } from 'react-spinners';
import apiServices from "../../services/apiServices";
export default function AddVehicle(){
    const [vehiclename,setvehiclename]=useState()
    const [vehicletype,setvehicletype]=useState()
    const [vehiclemodel,setvehiclemodel]=useState()
    const [customerId,setcustomerId]=useState()
    const [vehiclenumber,setvehiclenumber]=useState()
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
        let data={
            vehiclename:vehiclename,
            vehicletype:vehicletype,
            vehiclemodel:vehiclemodel,
            vehiclenumber:vehiclenumber,
            customerId:sessionStorage.getItem('user_id'),
        }
        apiServices.addvehicle(data).then((data)=>{
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                toast.success(data.data.message)
                setvehiclemodel("")
                setvehiclename("")
                setvehiclenumber("")
                setvehicletype("")
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
                Add Vehicle
                </h2>
            </div>
                <div className="row my-5">
                <div className="col-md-10 mx-auto">
                    <form onSubmit={handleForm} method='post'>
                        <div className="row mb-2">
                            <div className="col-md-2 offset-md-1">
                                <label>Vehicle Name</label>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" type="text" value={vehiclename} onChange={(e)=>{setvehiclename(e.target.value)}} required/>
                            </div>
                        </div>
                       
                        <div className="row mb-2">
                            <div className="col-md-2 offset-md-1">
                                <label>Vehicle Type</label>
                            </div>
                            <div className="col-md-8">
                                <select className="form-control" value={vehicletype} onChange={(e)=>{setvehicletype(e.target.value)}} required>
                                    <option selected value="">Select Vehicle Type</option>
                                    <option value={1}>2 Wheeler</option>
                                    <option value={2}>3 Wheeler</option>
                                    <option value={3}>4 Wheeler</option>
                                </select>
                            </div>
                        </div>
                       
                        <div className="row mb-2">
                            <div className="col-md-2 offset-md-1">
                                <label>Vehicle Model</label>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" type="text" value={vehiclemodel} onChange={(e)=>{setvehiclemodel(e.target.value)}} required/>
                            </div>
                        </div>
                        
                        <div className="row mb-2">
                            <div className="col-md-2 offset-md-1">
                                <label>Vehicle Number</label>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" type="text" value={vehiclenumber} onChange={(e)=>{setvehiclenumber(e.target.value)}} required/>
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