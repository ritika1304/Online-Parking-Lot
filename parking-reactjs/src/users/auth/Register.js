import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import apiServices from '../../services/apiServices';
export default function Register(){
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
    
    const [FirstName, setFirstName]=useState()
    const [LastName, setLastName]=useState()
    const [phone, setphone]=useState()
    const [email, setEmail]=useState()
    const [password, setPassword]=useState()

    const handleForm=(e)=>{
        e.preventDefault();
        setLoading(true)
        let data={
            FirstName:FirstName,
            LastName:LastName,
            phone:phone,
            email:email,
            password:password
        }
        apiServices.register(data).then((data)=>{
            setLoading(false)
            if(data.data.success){
                toast.success(data.data.message)
                // console.warn(data.data.token)
                navigate("/login")
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
                <h2> Register </h2>
            </div>
            <div className="">
                <div className="row">
                <div className="col-md-6 mx-auto">
                    <form onSubmit={handleForm} method='post'>
                    <div className="contact_form-container">
                        <div>
                        <div>
                            <input type="text" placeholder="First Name" value={FirstName} onChange={(e)=>{setFirstName(e.target.value)}}/>
                        </div>
                        <div>
                            <input type="text" placeholder="Last Name" value={LastName} onChange={(e)=>{setLastName(e.target.value)}}/>
                        </div>
                        <div>
                            <input type="number" min={0} maxLength={10} placeholder="Contact" value={phone} onChange={(e)=>{setphone(e.target.value)}}/>
                        </div>
                        <div>
                            <input type="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                        <div>
                            <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        </div>
                        <div className="mt-5 d-flex justify-content-center ">
                            <button type="submit">
                            Register
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