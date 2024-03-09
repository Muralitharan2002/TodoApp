import { createSlice } from "@reduxjs/toolkit";
import { getName, getAllTodos, addTodo, stateChange, deleteTodo, updateTodo } from "../actions/action";

const initialState = {
    todoArr: [],
    status: "null",
    userName: ""
}

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        logOut: (state) => {
            return state = initialState
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTodos.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getAllTodos.fulfilled, (state, action) => {
                state.status = "success"
                state.todoArr = action.payload
            })
            .addCase(getAllTodos.rejected, (state) => {
                state.status = "Error"
            })
            .addCase(addTodo.fulfilled, (state, action) => {
                state.todoArr = action.payload
            })
            .addCase(stateChange.fulfilled, (state, action) => {
                state.todoArr = action.payload
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.todoArr = action.payload
            })
            .addCase(getName.fulfilled, (state, action) => {
                state.userName = action.payload;
            })
            .addCase(updateTodo.fulfilled, (state, action) => {
                state.todoArr = action.payload
            })

    }

})

export const { logOut } = todoSlice.actions;
export default todoSlice.reducer;