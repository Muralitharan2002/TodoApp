import { configureStore } from "@reduxjs/toolkit"
import TodoReducer from "../slice/todoSlice"

export const store = configureStore({
    reducer: {
        todos: TodoReducer
    }
})