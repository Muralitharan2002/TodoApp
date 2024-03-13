const express = require("express");
const route = express.Router();
const authenticate = require("../utils/authenticate")
const { addUser, userLogin, logout, forgotPassword, getName, getAllTodos, addTodo, stateChange, deleteTodo, updateTodo } = require("../Controller/Controller.js")


/*LOGIN AND SIGNUP ROUTES */

route.post("/addUser", addUser);
route.post("/userLogin", userLogin);
route.put("/ResetPass", forgotPassword);
route.post("/logout", authenticate, logout);


/*TODOS-CRUD ROUTES */
route.get("/getName", authenticate, getName);
route.get("/getAllTodos", authenticate, getAllTodos);
route.post("/addTodo", authenticate, addTodo);
route.put("/stateChange", authenticate, stateChange);
route.delete("/deleteTodo/:Id", authenticate, deleteTodo)
route.put("/updateTodo", authenticate, updateTodo)

module.exports = route;


