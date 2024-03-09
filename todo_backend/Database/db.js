require("dotenv").config();
const mongoose = require("mongoose");

const URL = process.env.DATABASE_URL;

const dbConnection = () => {

    mongoose.connect(URL);

    const db = mongoose.connection;

    db.on("connected", () => console.log("Database successfully connected"));
    db.on("error", (err) => console.log("Error while Database connecting", err));
}

module.exports = dbConnection;
