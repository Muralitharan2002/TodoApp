import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "../Styles/style.css"
import img3 from "../Assets/img1.svg"
import axios from 'axios'

import { toast } from 'react-toastify'
import { motion } from "framer-motion"

function Signup() {
    const navigate = useNavigate();
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const FormDate = async (e) => {
        e.preventDefault();
        await axios.post("https://todo-server-ten-jade.vercel.app/router/adduser", { Name, Email, Password }, { withCredentials: true })
            .then((res) => {
                if (res.data.status === "warning") {
                    return toast.info("User Already Registered");
                } else if (res.data.status === "success") {
                    toast.success("User successfully Registered");
                    return navigate("/");
                } else {
                    return toast.error("Registration failed");
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
                    <div className=" Sleft p-0 col-md-6  rounded-3 d-flex  justify-content-center overflow-hidden " >
                        <img src={img3} className="img-fluid" alt="loginpage" />
                    </div>
                    <div className="Sright col-md-6 px-3">
                        <div className="row align-items-center">
                            <h3 className='mt-3 '>Welcome</h3>
                            <p className='mb-2'>Join us today!</p>
                            <form autoComplete='off' onSubmit={FormDate}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" value={Name} className="text-white input-field form-control" placeholder='Your Name' onChange={(e) => { setName(e.target.value) }} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" value={Email} className="text-white input-field form-control" placeholder='Your Email' onChange={(e) => { setEmail(e.target.value) }} required />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label">Password</label>
                                    <input type="password" value={Password} className=" text-white input-field form-control" placeholder='Password' onChange={(e) => { setPassword(e.target.value) }} required />
                                </div>
                                <div className=' d-flex flex-column align-items-center justify-content-center'>
                                    <button type="submit" className="px-3 py-2 mb-3 log-btn w-100 rounded-2">Signup</button>
                                    <p >Already have an account? <Link to={"/"} className='link text-decoration-none'>Login</Link> here</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </motion.div>

        </>
    )
}

export default Signup