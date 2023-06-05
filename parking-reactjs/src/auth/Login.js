import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import apiServices from '../services/apiServices';
export default function Login(){
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const[message,setMessage]=useState()
    const override={
        "display":"block",
        "margin":"0 auto",
        "position":"absolute",
        "top":"35%",
        "zIndex":"1",
        
    }
    useEffect(()=>{
        setMessage(sessionStorage.getItem("message"))
        if(message){
            toast.error(message)
            setTimeout(()=>{
                sessionStorage.removeItem("message")
            },2000)
        }
    },[message])
    const [email, setEmail]=useState()
    const [password, setPassword]=useState()
    const handleForm=(e)=>{
        e.preventDefault();
        setLoading(true)
        let data={
            email:email,
            password:password
        }
        apiServices.login(data).then((data)=>{
            setLoading(false)
            if(data.data.success){
                toast.success(data.data.message)
                // console.warn(data.data.token)
                sessionStorage.setItem("user_id", data.data.data._id)
                sessionStorage.setItem("user_name", data.data.data.name)
                sessionStorage.setItem("user_email", data.data.data.email)
                sessionStorage.setItem("token", data.data.token)
                sessionStorage.setItem("user_type", data.data.data.userType)
                sessionStorage.setItem("authenticate",true)
                if(data.data.data.userType==1|| data.data.data.userType=="1"){
                    navigate("/admin")
                }
                else{
                    navigate("/user")
                }
            }
            else{
                toast.error(data.data.message)
            }
        }).catch((error)=>{
            console.log(error)
            toast.error("Something went Wrong")
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
        <section className="contact_section layout_padding">
            <div className="container">
            <div className="heading_container">
                <h2>
                Login
                </h2>
            </div>
            <div className="">
                <div className="row">
                <div className="col-md-6 mx-auto">
                    <form onSubmit={handleForm} method='post'>
                    <div className="contact_form-container">
                        <div>
                        <div>
                            <input type="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                        <div>
                            <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        </div>
                        <div className="mt-5 d-flex justify-content-center ">
                            <button type="submit">
                            Login
                            </button>
                        </div>
                        </div>

                    </div>

                    </form>
                </div>
                </div>
            </div>
            </div>
        </section>
    </div>
    
    </>
    )
}