require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbConnection = require('./Database/db');
const route = require('./Routes/router');

const app = express();

const port = process.env.PORT;
dbConnection();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/router", route);





app.listen(port, (err) => {
    if (err) console.log("Server Not Running", err);
    console.log(`Server successfully running on port ${port}`);
})

