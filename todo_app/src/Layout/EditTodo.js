import React, { useEffect, useState } from 'react'

import { updateTodo } from '../Redux/actions/action'
import { useDispatch } from 'react-redux'

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
        <div className={`editPage ${Show ? "" : "d-none"}`}>
            <div className={` page d-flex align-items-center justify-content-center flex-column  vh-100`}>
                <div className='container  col-12 col-lg-6'>
                    <input type="text" value={newTodo} className='py-2 border-3 input-field form-control rounded-4' placeholder='update your task ...' onChange={(e) => { setNewTodo(e.target.value) }} />
                </div>
                <div className=' m-4 d-flex align-items-center justify-content-center gap-4'>
                    <div className='p-2 btns rounded-5 text-black' onClick={() => update()}>
                        Update
                    </div>
                    <div className='p-2 btns rounded-5 text-black' onClick={() => changeState(false)}>
                        Cancel
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTodo