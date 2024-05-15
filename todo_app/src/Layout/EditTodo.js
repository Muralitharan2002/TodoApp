import React, { useEffect, useState } from 'react'

import { updateTodo } from '../Redux/actions/action'
import { useDispatch } from 'react-redux'

import { motion, AnimatePresence } from "framer-motion"

const container = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            delayChildren: 0.4,
            staggerChildren: 0.2
        }
    },
    exit: {
        opacity: 0
    }
}

const container2 = {
    hidden: { opacity: 0, transform: "scale(0.5)" },
    visible: {
        opacity: 1,
        transform: "scale(1)",
        transition: {
            delayChildren: 0.1,
            staggerChildren: 0.5
        }
    },
    exit: {
        transform: "scale(0.5)",
        opacity: 0
    }
}

const item1 = {
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
}
const item2 = {
    hidden: { y: -30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
}

function EditTodo({ Show, changeState, task }) {
    const dispatch = useDispatch();
    const [newTodo, setNewTodo] = useState(task.List)
    useEffect(() => {
        setNewTodo(task.List)
    }, [task.List])

    const update = () => {
        task.List = newTodo
        dispatch(updateTodo(task));
        changeState(false)

    }

    return (
        <>
            <AnimatePresence>

                {
                    Show &&
                    <motion.div className={`editPage`}
                        variants={container}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <motion.div className={` page d-flex align-items-center justify-content-center flex-column  vh-100`}
                            variants={container2}

                        >
                            <motion.div className='container  col-12 col-lg-6'
                                variants={item1}
                            >
                                <input type="text" value={newTodo} className='py-2 border-3 input-field form-control rounded-4' placeholder='update your task ...' onChange={(e) => { setNewTodo(e.target.value) }} />
                            </motion.div>
                            <motion.div className=' m-4 d-flex align-items-center justify-content-center gap-4'
                                variants={item2}
                            >
                                <motion.div className='p-2 btns rounded-5 text-black' onClick={() => update()}
                                    whileTap={{ scale: 0.8 }}
                                >
                                    Update
                                </motion.div>
                                <motion.div className='p-2 btns rounded-5 text-black' onClick={() => changeState(false)}
                                    whileTap={{ scale: 0.8 }}
                                >
                                    Cancel
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                }
            </AnimatePresence>
        </>
    )
}

export default EditTodo