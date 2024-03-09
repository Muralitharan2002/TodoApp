import React, { useState } from 'react'

import { FiEdit } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

import { stateChange, deleteTodo } from '../Redux/actions/action';
import { useDispatch } from 'react-redux';
import EditTodo from './EditTodo';


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
            <div className='p-lg-4 py-4 d-flex align-items-center justify-content-center flex-column gap-3'>
                {
                    todos && todos.map((todos) => (
                        <div key={todos._id} className='col-12 col-lg-6 overflow-hidden border border-2 task-border rounded-4 d-flex align-items-center justify-content-between' >
                            <div className="container d-flex align-items-center gap-2 gap-lg-3 p-3  overflow-hidden" onClick={() => ToggleState(todos._id)}>
                                <div className={`circle ${todos.state ? "circle-fill" : "circle-outline"} me-2 border border-2 rounded-5 `}></div>
                                <div className={`col-8 col-lg-10 ${todos.state ? "task" : ""}`}>
                                    {todos.list}
                                </div>
                            </div>
                            <div className='col-2 d-flex align-items-center justify-content-evenly'>
                                <FiEdit className='fs-4 ' onClick={() => handleEdit(todos._id, todos.list)} />
                                <AiOutlineDelete className='fs-3' onClick={() => todoDelete(todos._id)} />
                            </div>
                        </div>
                    ))
                }
            </div>
            <EditTodo Show={Show} changeState={changeState} task={task} />
        </>
    )
}

export default List