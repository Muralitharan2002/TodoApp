
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { user, userTodos } = require('../models/model');


const addUser = async (req, res) => {
    try {
        const { Name, Email, Password } = req.body;

        const existingUser = await user.findOne({ Email: Email });

        if (existingUser) {
            return res.status(200).json({ datas: existingUser, message: "User Already Registered", status: "warning" });
        }

        const hashPassword = await bcrypt.hash(Password, Number(process.env.ROUND));
        const newData = new user({
            Name,
            Email,
            Password: hashPassword
        });

        await newData.save();
        res.status(201).json({ message: "User successfully Registered", status: "success" });

    } catch (err) {
        console.log("Error while addUser", err);
        res.status(500).json({ message: "Internal server error", status: "error", Error: err.message });
    }
}

const userLogin = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        // console.log({ Email, Password })

        const existingUser = await user.findOne({ Email: Email });
        // console.log(existingUser)

        if (existingUser) {
            const passwordStatus = await bcrypt.compare(Password, existingUser.Password)
            // console.log(passwordStatus)
            if (passwordStatus) {
                const token = jwt.sign({ id: existingUser._id, Email: existingUser.Email }, process.env.SECRET_KEY);
                // console.log("Token Ready", token)
                res.cookie("Token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                });
                return res.status(200).json({ message: "User Login successfully", status: "success" });
            }
            return res.json({ message: "Invalid Password", status: "warning" });

        }


        return res.status(201).json({ message: "Invalid Email", status: "warning" });

    } catch (err) {
        console.log("Error while userLogin", err);
        res.status(500).json({ message: "Internal server error", status: "error", Error: err.message });
    }
}

const logout = async (req, res) => {
    try {
        const userId = req.data.id;
        // console.log(userId)

        await user.findOne({ _id: userId })
            .then((response) => {
                // console.log(response)
                if (response) {
                    res.clearCookie('Token');
                    return res.status(200).json({ message: "logout successfully", status: 'success' });
                }

                return res.status(404).json({ message: "user Not found", status: 'error' });
            })
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: "error", Error: err.message });
    }

}

const forgotPassword = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        await user.findOne({ Email })

            .then(async (existingUser) => {
                const PasswordStatus = await bcrypt.compare(Password, existingUser.Password);

                if (PasswordStatus) {
                    return res.status(200).json({ message: "Already in use!", status: "warning" });
                }
                // console.log(Password)

                // console.log(existingUser.Password === hashPassword)
                const hashPassword = await bcrypt.hash(Password, Number(process.env.ROUND));
                await user.updateOne({ _id: existingUser._id }, { $set: { Password: hashPassword } })
                    .then(() => {
                        return res.status(201).json({ message: "Password changed!", status: "success" });
                    })
                    .catch((err) => {
                        return res.status(500).json({ message: "Password changing process failed", status: "error", Error: err.message });
                    })

            })
            .catch((err) => {
                return res.status(403).json({ message: "User not Exist", status: "warning", Error: err.message });
            })

    } catch (err) {
        return res.status(500).json({ message: "forgotPassword process failed", status: "error", Error: err.message });
    }
}

const getName = async (req, res) => {
    try {
        const id = req.data.id;
        const name = await user.findOne({ _id: id });
        if (!name) {
            return res.status(404).json({ message: "user not found", error: "error" });
        }

        return res.status(200).json(name.Name);

    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: "error", Error: err.message });
    }
}

const getAllTodos = async (req, res) => {
    try {
        const id = req.data.id;
        // console.log(id);
        const Email = req.data.Email;

        await userTodos.findOne({ userId: id })
            .then((response) => {
                // console.log(response)
                if (response !== "null" && response.Email === Email) {
                    res.status(200).json(response);
                } else {
                    res.status(400).json({ message: "unauthorized Access", status: "warning" })
                }
            })
            .catch((err) => {
                res.status(500).json({ message: "Error while fetching datas", status: "error", Error: err.message })
            })
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", status: "error", Error: err.message })
    }
}

const addTodo = async (req, res) => {
    try {
        const { task } = req.body;
        const userId = req.data.id;
        const Email = req.data.Email;
        const currentStatus = false;


        const User = await user.findOne({ _id: userId });
        if (User && User.Email === Email) {
            await userTodos.findOne({ userId: userId })
                .then(async (responce) => {
                    if (responce) {
                        if (task === "") { return res.status(200).json({ message: "Empty task", status: "warning", responce }); }
                        responce.Todos_list.push({ list: task, state: currentStatus });
                        await responce.save();
                        return res.status(201).json({ status: "success", responce });
                    } else {
                        if (task === "") { return res.status(200).json({ message: "Empty task", status: "warning", responce }); }
                        const firstTime = new userTodos({
                            Email,
                            Todos_list: [
                                {
                                    list: task,
                                    state: currentStatus
                                }
                            ],
                            userId
                        });
                        await firstTime.save();
                        return res.status(201).json({ status: "firstsuccess", firstTime });
                    }
                })
                .catch((err) => {
                    console.log(err)
                    return res.status(500).json({ message: "Error while adding task", status: "error", Error: err.message });
                })
        } else {
            return res.status(400).json({ message: "unauthorized user", status: "error" });
        }
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", status: "error", Error: err.message });
    }
}

const stateChange = async (req, res) => {
    try {
        const { todoId } = req.body;
        const userId = req.data.id;

        const user = await userTodos.findOne({ userId: userId });

        if (user) {
            const todo = user.Todos_list.find((todo) => todo._id.toString() === todoId);
            // console.log(todo)
            if (todo) {
                todo.state = !todo.state;
                await user.save();
                // console.log(user)
                return res.status(202).json(user);
            } else {
                return res.status(404).json({ message: "Todo not found", error: "error" });
            }
        } else {
            return res.status(404).json({ message: "user not found", error: "error" });
        }

    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", status: "error", Error: err.message });
    }
}

const deleteTodo = async (req, res) => {
    try {
        const { todoId } = req.body;

        const Email = req.data.Email;

        const target = await userTodos.findOne({ Email: Email });

        if (target) {
            const targetTodo = target.Todos_list.findIndex(todo => todo._id.toString() === todoId);

            if (targetTodo >= 0) {
                // console.log("target", targetTodo)
                target.Todos_list.splice(targetTodo, 1);
                await target.save();

                return res.status(200).json(target)
            }

            return res.status(404).json({ message: "target Todo not found", error: "warning" })
        } else {
            return res.status(400).json({ message: "Todo not found", error: "warning" })

        }
    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: "error", Error: err.message })
    }
}

const updateTodo = async (req, res) => {
    try {
        const { task } = req.body;
        // console.log({ task })
        const userId = req.data.id;

        const targetUser = await userTodos.findOne({ userId: userId });

        if (!targetUser) return res.status(404).json({ message: "user not found", error: "warning" })

        const ExistTodo = targetUser.Todos_list.find(todo => todo._id.toString() === task.Id);

        if (!ExistTodo) return res.status(404).json({ message: "target Todo not found", error: "warning" })

        ExistTodo.list = task.List;

        await targetUser.save();

        return res.status(200).json(targetUser);

    } catch (err) {
        return res.status(500).json({ message: "Internal server error", error: "error", Error: err.message })
    }
}

module.exports = { addUser, userLogin, logout, forgotPassword, getName, getAllTodos, addTodo, stateChange, deleteTodo, updateTodo };