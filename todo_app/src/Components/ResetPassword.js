import React, { useState } from 'react'
import "../Styles/style.css"
import img from "../Assets/Password.svg";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

function ResetPassword() {
    const nevigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const ResetForm = async (e) => {
        e.preventDefault();
        await axios.post("https://todo-server-ten-jade.vercel.app/router/ResetPass", { Email, Password }, { withCredentials: true })
            .then((res) => {
                if (res.data.status === "warning") {
                    toast.info("Already in use!");
                } else if (res.data.status === "success") {
                    toast.success("Password changed 👍");
                    return nevigate("/");
                } else {
                    return toast.error("Reset failed");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>

            <div className="box-container container p-4 min-vh-100 d-flex align-items-center justify-content-center">
                <div className='row border border-3 rounded-4 p-lg-3 p-2 d-flex align-items-center overflow-hidden box'>
                    <div className="left col-md-6 rounded-3 d-flex  justify-content-center">
                        <img src={img} className="img-fluid  " alt="ResetPassword-page" />
                    </div>
                    <div className="right col-md-6 ps-lg-4">
                        <div className="row align-items-center">
                            <h3 className='mt-3'>Reset Password</h3>
                            <p className='mb-4'>Enter a new Password.</p>
                            <form onSubmit={ResetForm}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" value={Email} className="text-white input-field form-control" placeholder='Your Email' onChange={(e) => { setEmail(e.target.value) }} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" value={Password} className=" text-white input-field form-control" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} required />
                                </div>
                                <button type="submit" className="px-3 py-2 my-3 log-btn w-100 rounded-2">Reset</button>
                                <p className=' text-center'> <Link to={"/"} className='link text-decoration-none'>Back to Login</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default ResetPassword