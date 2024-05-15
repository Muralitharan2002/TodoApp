import React from 'react'
import { FaPlus } from "react-icons/fa6";

import { motion } from "framer-motion"

function InputField({ newTodo, task, setTask }) {
    return (
        <div>
            <div className='my-4 my-lg-5 d-flex align-items-center justify-content-center overflow-hidden'>
                <motion.div className='col-12 col-lg-6 d-flex align-items-center gap-lg-5 gap-3'
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <input type="text" value={task} className='py-2 input-field form-control rounded-4' placeholder='Add your task ...'
                        onChange={(e) => setTask(e.target.value)} />
                    <motion.div className='p-2 plus-btn rounded-5 d-flex align-items-center' onClick={() => newTodo(task)} >
                        <FaPlus className='fs-4 text-black' />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default InputField