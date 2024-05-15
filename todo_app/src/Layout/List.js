import React, { useState } from 'react'

import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

import { stateChange, deleteTodo } from '../Redux/actions/action';
import { useDispatch } from 'react-redux';
import EditTodo from './EditTodo';

import { motion } from "framer-motion"

const container = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delayChildren: 0.3,
            staggerChildren: 0.2
        }
    }
}

const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1
    }
}

function List({ todos }) {
    const dispatch = useDispatch();

    const [Show, setShow] = useState(false)
    const [task, setTask] = useState({
        Id: "",
        List: ""
    })

    const handleEdit = (Id, List) => {
        setShow(true)
        setTask({ Id, List })

    }

    const changeState = (state) => {
        setShow(state);
    }

    const ToggleState = (todoId) => {
        dispatch(stateChange(todoId));
    }

    const todoDelete = (todoId) => {
        dispatch(deleteTodo(todoId));
    }

    return (
        <>
            <motion.div className='p-lg-4 py-4 d-flex align-items-center justify-content-center flex-column gap-3'
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {
                    todos && todos.map((todos) => (
                        <motion.div key={todos._id} className='col-12 col-lg-6 overflow-hidden border border-2 task-border rounded-4 d-flex align-items-center justify-content-between'
                            variants={item}
                        >
                            <motion.div className="container d-flex align-items-center gap-2 gap-lg-3 p-3  overflow-hidden" onClick={() => ToggleState(todos._id)} whileTap={{ scale: 0.9, originX: 0 }}>
                                <div className={`circle ${todos.state ? "circle-fill" : "circle-outline"} me-2 border border-2 rounded-5 `}></div>
                                <div className={`col-8 col-lg-10 ${todos.state ? "task" : ""}`}>
                                    {todos.list}
                                </div>
                            </motion.div>
                            <div className='col-2 d-flex align-items-center justify-content-evenly'>
                                <motion.div
                                    whileTap={{ scale: 0.8 }}
                                >
                                    <FiEdit className='fs-4 ' onClick={() => handleEdit(todos._id, todos.list)} />
                                </motion.div>
                                <motion.div
                                    whileTap={{ scale: 0.8 }}
                                >
                                    <AiOutlineDelete className='fs-3' onClick={() => todoDelete(todos._id)} />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))
                }
            </motion.div>
            <EditTodo Show={Show} changeState={changeState} task={task} />
        </>
    )
}

export default List