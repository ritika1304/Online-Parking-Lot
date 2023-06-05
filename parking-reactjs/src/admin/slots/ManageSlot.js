import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners"
import apiServices from "../../services/apiServices";
export default function ManageSlot(){
    const [loading,setLoading]=useState(true)
    const override={
        "position":'absolute',
        "display":"block",
        "top":"45%",
        "zIndex":"1",
    }
    const [myData,setMyData]=useState([{}])
    useEffect(()=>{
        apiServices.allSlot().then((data)=>{
            // console.log(data)
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                setMyData(data.data.slots)
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
    const deleteData=(id)=>{
        setLoading(true)
        let data={
            id:id
        }
        apiServices.deleteSlot(data).then((data)=>{
            // console.log(data)
            setTimeout(()=>{
                setLoading(false)
            },1500)
            if(data.data.success){
                toast.success(data.data.message)
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
    return(
        <>
         <div className="d-flex justify-content-center">
            <ClipLoader loading={loading} cssOverride={override} size={120}/>
        </div>
        <div className={loading?"disabled-screen-full":""}>   
        <main id="main">
            <section className="intro-single my-5 text-capitalize">
                <div className="container  pt-3">
                    <h1 className="text-center text-primary1">Manage Slots</h1>
                    <div className="container my-5 table-responsive">
                        <table className="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Parking Name</th>
                                    <th>Two Wheeler Details</th>
                                    <th>Three Wheeler Details</th>
                                    <th>Four Wheeler Details</th>
                                    <th>Edit</th>
                                    {/* <th>Delete</th> */}
                                </tr>
                            </thead>
                            {myData?.map((element,index)=>(
                                <tr key={index+1}>
                                    <td>{index+1}</td>
                                    <td>{element?.parkingId?.parkingname}</td>
                                    <td>Slots- {element?.twowhslot}<br/> Price Per Hour- &#8377; {element?.twowhcostperhour}<br/>Price Per Day- &#8377; {element?.twowhcostperday}</td>
                                    <td>Slots- {element?.threewhslot}<br/> Price Per Hour- &#8377; {element?.threewhcostperhour}<br/>Price Per Day- &#8377; {element?.threewhcostperday}</td>
                                    <td>Slots- {element?.fourwhslot}<br/> Price Per Hour- &#8377; {element?.fourwhcostperhour}<br/>Price Per Day- &#8377; {element?.fourwhcostperday}</td>
                                    <td>
                                        <Link to={`/admin/update_slot/${element?._id}`}>
                                            <i className="bi bi-pencil-square fs-3 text-success"></i>
                                        </Link>
                                    </td>
                                    {/* <td>
                                        <button className="btn btn-danger" onClick={()=>{deleteData(element?._id)}}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </td> */}
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