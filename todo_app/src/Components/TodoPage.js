import React, { useState, useEffect } from 'react'
import Header from '../Layout/Header'
import InputField from '../Layout/InputField'
import FilterBtns from '../Layout/FilterBtns'


import { useSelector, useDispatch } from 'react-redux'
import { getAllTodos, addTodo } from '../Redux/actions/action'


function TodoPage() {
    const dispatch = useDispatch();
    const [task, setTask] = useState("")

    const newTodo = (value) => {
        dispatch(addTodo(value));
        setTask("")
    }

    useEffect(() => {
        dispatch(getAllTodos())
    }, []);


    const AllTodos = useSelector((state) => state.todos.todoArr);
    // console.log("AllTodos", AllTodos);
    return (
        <>
            <div className='container position-relative min-vh-100 main-area'>
                <Header />
                <InputField newTodo={newTodo} task={task} setTask={setTask} />
                <FilterBtns AllTodos={AllTodos} />

            </div>
        </>
    )
}

export default TodoPage