import { useEffect, useState } from "react"
import {toast} from "react-toastify";
import { ClipLoader } from 'react-spinners';
import apiServices from "../../services/apiServices";
import { useNavigate, useParams } from "react-router-dom";
export default function UpdateSlots(){
    const [parking,setParking]=useState()
    const [parkingId,setParkingId]=useState()
    const [twoSlot,setTwoSlot]=useState()
    const [threeSlot,setThreeSlot]=useState()
    const[fourSlot,setFourSlot]=useState()
    const [twoPrice,setTwoPrice]=useState()
    const [threePrice,setThreePrice]=useState()
    const [fourPrice,setFourPrice]=useState()
    const [twoPriceDay,setTwoPriceDay]=useState()
    const [threePriceDay,setThreePriceDay]=useState()
    const [fourPriceDay,setFourPriceDay]=useState()
    const [loading,setLoading]=useState(false)
    const override={
        "display":"block",
        "margin":"0 auto",
        "position":"absolute",
        "top":"35%",
        "zIndex":"1",
    }
    const nav=useNavigate()
    const {id}=useParams()
    useEffect(()=>{
        apiServices.allParking().then((data)=>{
            // console.log(data)
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
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
        let data_id={
            id:id
        }
        apiServices.singleSlot(data_id).then((data)=>{
            // console.log(data)
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                setFourPrice(data.data.slots.fourwhcostperhour)
                setFourPriceDay(data.data.slots.fourwhcostperday)
                setFourSlot(data.data.slots.fourwhslot)
                setParkingId(data.data.slots.parkingId?._id)
                setThreePrice(data.data.slots.threewhcostperhour)
                setThreePriceDay(data.data.slots.threewhcostperday)
                setThreeSlot(data.data.slots.threewhslot)
                setTwoPrice(data.data.slots.twowhcostperhour)
                setTwoPriceDay(data.data.slots.twowhcostperday)
                setTwoSlot(data.data.slots.twowhslot)
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
    },[])
    const handleForm=(e)=>{
        e.preventDefault()
        setLoading(true)
        let data={
            twowhslot:twoSlot,
            threewhslot:threeSlot,
            fourwhslot:fourSlot,
            twowhcostperhour:twoPrice,
            threewhcostperhour:threePrice,
            fourwhcostperhour:fourPrice,
            twowhcostperday:twoPriceDay,
            threewhcostperday:threePriceDay,
            fourwhcostperday:fourPriceDay,
            parkingId:parkingId,
            id:id
        }
        apiServices.updateSlot(data).then((data)=>{
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                toast.success(data.data.message)
               setTimeout(()=>{
                nav("/admin/manage_slot")
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
                Update Slots
                </h2>
            </div>
                <div className=" my-3 my-5">
                <div className="col-md-12 mx-auto">
                    <form onSubmit={handleForm} method='post'>
                    <div className="row my-3">
                            <div className="col-md offset-md-1">
                                <label>Parking Name</label>
                            </div>
                            <div className="col-md-9">
                                <select className="form-control" type="text" value={parkingId} onChange={(e)=>{setParkingId(e.target.value)}} required>
                                    <option disabled value="">Choose Parking</option>
                                    {parking?.map((el,index)=>(
                                        <option key={index} value={el?._id} selected={parkingId==el?._id}>{el?.parkingname}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row my-3">
                            <div className="col-md-11 offset-md-1 text-center my-2"><hr/>Two Wheeler Details</div>
                            <div className="col-md offset-md-1">
                                <label>Slots</label>
                            </div>
                            <div className="col-md-2" style={{paddingLeft:"40px"}}>
                                <input className="form-control" type="number" value={twoSlot} onChange={(e)=>{setTwoSlot(e.target.value)}} required/>
                            </div>
                            <div className="col-md ">
                                <label>Price Per hour</label>
                            </div>
                            <div className="col-md-2">
                                <input className="form-control" type="number" value={twoPrice} onChange={(e)=>{setTwoPrice(e.target.value)}} required/>
                            </div>
                            <div className="col-md">
                                <label>Price Per Day</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" type="number" value={twoPriceDay} onChange={(e)=>{setTwoPriceDay(e.target.value)}} required/>
                            </div>
                        </div>
                        <div className="row my-3 ">
                            <div className="col-md-11 offset-md-1 text-center"><hr/>Three Wheeler Details</div>
                            <div className="col-md offset-md-1">
                                <label>Slots</label>
                            </div>
                            <div className="col-md-2" style={{paddingLeft:"40px"}}>
                                <input className="form-control" type="number" value={threeSlot} onChange={(e)=>{setThreeSlot(e.target.value)}} required/>
                            </div>
                            <div className="col-md ">
                                <label>Price Per hour</label>
                            </div>
                            <div className="col-md-2">
                                <input className="form-control" type="number" value={threePrice} onChange={(e)=>{setThreePrice(e.target.value)}} required/>
                            </div>
                            <div className="col-md">
                                <label>Price Per Day</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" type="number" value={threePriceDay} onChange={(e)=>{setThreePriceDay(e.target.value)}} required/>
                            </div>
                        </div>
                        <div className="row my-3 ">
                            <div className="col-md-11 offset-md-1 text-center"><hr/>Four Wheeler Details</div>
                            <div className="col-md offset-md-1">
                                <label>Slots</label>
                            </div>
                            <div className="col-md-2" style={{paddingLeft:"40px"}}>
                                <input className="form-control" type="number" value={fourSlot} onChange={(e)=>{setFourSlot(e.target.value)}} required/>
                            </div>
                            <div className="col-md ">
                                <label>Price Per hour</label>
                            </div>
                            <div className="col-md-2">
                                <input className="form-control" type="number" value={fourPrice} onChange={(e)=>{setFourPrice(e.target.value)}} required/>
                            </div>
                            <div className="col-md">
                                <label>Price Per Day</label>
                            </div>
                            <div className="col-md">
                                <input className="form-control" type="number" value={fourPriceDay} onChange={(e)=>{setFourPriceDay(e.target.value)}} required/>
                            </div>
                            <div className="col-md-11 offset-md-1  my-2 text-center"><hr/></div>
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