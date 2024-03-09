const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        unique: true,
        required: true
    },
    Password: {
        type: String,
        required: true
    }
}, { timestamps: true })

const todoSchema = new mongoose.Schema({
    Email: { type: String, unique: true, required: true },
    Todos_list: [
        {
            list: { type: String },
            state: { type: Boolean }
        }
    ],
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "user",
        unique: true,
        required: true
    },
}, { timestamps: true })


const user = mongoose.model("user", userSchema);
const userTodos = mongoose.model("user_todolist", todoSchema);

module.exports = { user, userTodos };