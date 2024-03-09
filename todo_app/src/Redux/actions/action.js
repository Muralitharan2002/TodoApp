import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";





const URL = "http://localhost:8000/router";

export const getName = createAsyncThunk("todos/getName", async () => {
    const Name = await axios.get(`${URL}/getName`, { withCredentials: true })
    return Name.data
})


export const getAllTodos = createAsyncThunk("todos/getAllTodos", async () => {
    const alltodos = await axios.get(`${URL}/getAllTodos`, { withCredentials: true });
    return alltodos.data.Todos_list;
})

export const addTodo = createAsyncThunk("todos/addTodo", async (task) => {
    const added = await axios.post(`${URL}/addTodo`, { task }, { withCredentials: true });
    if (added.data.status === "firstsuccess") {
        // console.log(added.data.firstTime.Todos_list)
        return added.data.firstTime.Todos_list;
    } else {
        // console.log(added.data.responce.Todos_list)
        return added.data.responce.Todos_list;
    }
})

export const stateChange = createAsyncThunk("todos/stateChange", async (todoId) => {
    const added = await axios.post(`${URL}/stateChange`, { todoId }, { withCredentials: true });
    return added.data.Todos_list;
})

export const deleteTodo = createAsyncThunk("todo/deteleTodo", async (todoId) => {
    // console.log("Modifyed Data : ", { todoId });
    const Modified = await axios.post(`${URL}/deleteTodo`, { todoId }, { withCredentials: true });
    // console.log("Modifyed Data : ", Modified.data);
    return Modified.data.Todos_list;
})

export const updateTodo = createAsyncThunk("todo/updateTodo", async (task) => {
    const updatedTodo = await axios.put(`${URL}/updateTodo`, { task }, { withCredentials: true });
    return updatedTodo.data.Todos_list;
})


