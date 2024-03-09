import React, { useEffect } from 'react'
import axios from "axios"
import "../Styles/style.css"

import { IoLogOut } from "react-icons/io5"
import { toast } from 'react-toastify'

import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../Redux/slice/todoSlice'
import { getName } from '../Redux/actions/action'
import { useNavigate } from 'react-router-dom'

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getName())
    }, [])

    const logout = async () => {
        await axios.post("http://localhost:8000/router/logout", {}, { withCredentials: true })
            .then((res) => {
                if (res.data.status === "success") {
                    dispatch(logOut())
                    toast.success("Logout 👍");
                    navigate("/")
                } else {
                    console.log(res.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const Name = useSelector(state => state.todos.userName)
    return (

        <div className=" p-2 py-3 p-lg-4 d-flex align-items-center justify-content-between ">
            <h3>TODO <span className='span'>APP</span></h3>
            <div className=' d-flex align-items-center gap-lg-5 gap-3'>
                <div className='fs-5'>{Name}</div>
                <IoLogOut className=' fs-3 log-out' onClick={() => logout()} />
            </div>
        </div>

    )
}

export default Header