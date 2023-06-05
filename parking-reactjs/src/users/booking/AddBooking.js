import { useEffect, useState } from "react"
import {toast} from "react-toastify";
import { ClipLoader } from 'react-spinners';
import apiServices from "../../services/apiServices";
import { useParams } from "react-router-dom";
export default function AddBooking(){

    const param = useParams()
    const [parkingId,setparkingId]=useState()
    const [bookingType,setbookingType]=useState()
    const [vehicleId,setvehicleId]=useState()
    const [customerId,setcustomerId]=useState()
    const [count,setcount]=useState()
    const [bookingAmount,setbookingAmount]=useState()
    const [bookingDate,setbookingDate]=useState()

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
            parkingId:param._id,
            bookingType:1,
            vehicleId:vehicleId,
            count:1,
            bookingAmount:bookingAmount,
            bookingDate:bookingDate,
            customerId:sessionStorage.getItem('user_id'),
        }
        apiServices.addbooking(data).then((data)=>{
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                toast.success(data.data.message)
                setparkingId("")
                setbookingType("")
                setvehicleId("")
                setcount("")
                setbookingAmount("")
                setbookingDate("")
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            // console.log(error)
            // toast.error("Something went wrong")
            setTimeout(()=>{
                setLoading(false)
            },1500)
        })
    }
    const [vehicle,setvehicle]=useState()
    useEffect(()=>{
        apiServices.showvehicle({}).then((data)=>{
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                setvehicle(data.data.vehicle)
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            setTimeout(()=>{
                setLoading(false)
            },1000)
        })
    },[loading])

   
    const [vehicletype,setvehicletype] = useState()

    const setvehicledata = (e) =>{
        setvehicleId(e.target.value)
        apiServices.showvehicle({_id:e.target.value}).then(x=>{
            setvehicletype(x.data.vehicle[0].vehicletype)
            getsingleslotdetails(x.data.vehicle.vehicletype)
        })
    }
    const getsingleslotdetails = (vehicletypenumber)=>{
        apiServices.singleSlot({id:param._id}).then(x=>{
            if(vehicletype == 1)
            {
                setbookingAmount(x.data.slots.twowhcostperday)   
            }
            else if(vehicletype == 2)
            {
                setbookingAmount(x.data.slots.threewhcostperday)   
            }
            else if(vehicletype == 3)
            {
                setbookingAmount(x.data.slots.fourwhcostperday)   
            }
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
                Make Booking
                </h2>
            </div>
                <div className="row my-5">
                <div className="col-md-10 mx-auto">
                    <form onSubmit={handleForm} method='post'>
                        <div className="row mb-2">
                            <div className="col-md-2 offset-md-1">
                                <label>Vehicle</label>
                            </div>
                            <div className="col-md-8">
                                <select className="form-control" type="text" value={vehicleId} onChange={(e)=>{setvehicledata(e)}} required>
                                    <option selected value="">Select Vehicle</option>
                                    {vehicle?.map((element,index)=>(
                                        <option value={element?._id}>{element?.vehiclename}-{element?.vehiclenumber}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                       
                        <div className="row mb-2">
                            <div className="col-md-2 offset-md-1">
                                <label>Booking Amount</label>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" type="text" value={bookingAmount} />
                            </div>
                        </div>
                        
                        <div className="row mb-2">
                            <div className="col-md-2 offset-md-1">
                                <label>Booking Date</label>
                            </div>
                            <div className="col-md-8">
                                <input className="form-control" type="date" value={bookingDate} onChange={(e)=>{setbookingDate(e.target.value)}} required/>
                            </div>
                        </div>
                       
                        <div className="d-flex mb-3 mt-4 justify-content-center">
                            <button className="btn btn-outline-light btn-lg w-25 mb-4" type="submit">Submit</button>
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