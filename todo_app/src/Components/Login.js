import React, { useState } from 'react'
import "../Styles/style.css"
import img from "../Assets/front-img.svg";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';

import { motion } from "framer-motion"

function Login() {
    const nevigate = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const LoginForm = async (e) => {
        e.preventDefault();
        await axios.post("https://todo-server-ten-jade.vercel.app/router/userLogin", { Email, Password }, { withCredentials: true })
            .then((res) => {
                if (res.data.status === "warning") {
                    return toast.info("Invalid Crendential");
                } else if (res.data.status === "success") {
                    toast.success("Welcome 👋");
                    return nevigate("/todopage");
                } else {
                    return toast.error("Login failed");
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>

            <motion.div className="box-container container p-4 min-vh-100 d-flex align-items-center justify-content-center"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 250, damping: 100, delay: 0.5 }}
            >
                <div className='row border border-3 rounded-4 p-lg-3 p-2 d-flex align-items-center overflow-hidden box'>
                    <div className="left col-md-6 rounded-3 d-flex  justify-content-center">
                        <img src={img} className="img-fluid  " alt="Login-page" />
                    </div>
                    <div className="right col-md-6 ps-lg-4">
                        <div className="row align-items-center">
                            <h3 className='mt-3'>Hello,Again</h3>
                            <p className='mb-4'>We are happy to have you back.</p>
                            <form onSubmit={LoginForm}>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" value={Email} className="text-white input-field form-control" placeholder='Your Email' onChange={(e) => { setEmail(e.target.value) }} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" value={Password} className=" text-white input-field form-control" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} required />
                                </div>
                                <div className='d-flex  justify-content-end'>
                                    <p ><Link to={"/ResetPass"} className='link text-decoration-none'>Forgot Password?</Link></p>
                                </div>
                                <div className='d-flex flex-column align-items-center justify-content-center'>
                                    <button type="submit" className="px-3 py-2 mb-3 log-btn w-100 rounded-2">Login</button>
                                    <p >Don't have an account? <Link to={"/signup"} className='link text-decoration-none'>Signup</Link> here</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>


        </>
    )
}

export default Login