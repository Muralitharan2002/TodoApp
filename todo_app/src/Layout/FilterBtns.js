import React, { useState } from 'react'
import List from '../Layout/List'

import img from "../Assets/Empty.svg";
import { useSelector } from 'react-redux'

function FilterBtns({ AllTodos }) {
    const [filterBtn, setFilterBtn] = useState("All tasks");

    const status = useSelector(state => state.todos.status)
    console.log(status)

    // console.log("filtercom", AllTodos)

    const filterTodo = (option) => {
        switch (option) {
            case "All tasks":
                return AllTodos;
            case "Current tasks":
                return AllTodos.filter(todo => todo.state === false);
            case "Completed tasks":
                return AllTodos.filter(todo => todo.state === true);
            default:
                return AllTodos;
        }
    }

    return (
        <>
            <div>
                <div className=' d-flex align-items-center justify-content-center'>
                    <div className='line border-bottom container  border-2 pb-2  col-lg-6 d-flex align-items-center justify-content-between' >
                        <div>
                            <p className=''>Todos:</p>
                        </div>
                        <div>
                            <select value={filterBtn} className="drop-down form-select form-select-md mb-3 bg-dark " onChange={(e) => setFilterBtn(e.target.value)}>
                                <option value="All tasks">All tasks</option>
                                <option value="Current tasks">Current tasks</option>
                                <option value="Completed tasks">Completed tasks</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {
                status === "loading" ? (
                    <p className='fs-4 text-center my-4'>Loading...</p>
                ) : (
                    AllTodos.length > 0 ?
                        (
                            <List todos={filterTodo(filterBtn)} />
                        ) : (
                            <div className='container my-2 my-lg-5 d-flex align-items-center justify-content-center'>
                                <img src={img} alt="Empty" width="400px" height="300px" className='empty' />
                            </div>
                        )
                )
            }
        </>
    )
}

export default FilterBtns