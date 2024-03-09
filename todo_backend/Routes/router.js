const express = require("express");
const route = express.Router();
const authenticate = require("../utils/authenticate")
const { addUser, userLogin, logout, forgotPassword, getName, getAllTodos, addTodo, stateChange, deleteTodo, updateTodo } = require("../Controller/Controller.js")


/*LOGIN AND SIGNUP ROUTES */

route.post("/addUser", addUser);
route.post("/userLogin", userLogin);
route.post("/ResetPass", forgotPassword);
route.post("/logout", authenticate, logout);


/*TODOS-CRUD ROUTES */
route.get("/getName", authenticate, getName);
route.get("/getAllTodos", authenticate, getAllTodos);
route.post("/addTodo", authenticate, addTodo);
route.post("/stateChange", authenticate, stateChange);
route.post("/deleteTodo", authenticate, deleteTodo)
route.put("/updateTodo", authenticate, updateTodo)

module.exports = route;


