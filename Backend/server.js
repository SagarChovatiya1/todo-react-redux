const express = require("express");
const app = express();
require('dotenv').config();
require("./src/Connection/connection")
const user_router =require("./src/router/user_router")
app.use(express.json())
let cors = require('cors');
const { config } = require("dotenv");
app.use(cors())

// dotenv.config();

app.use("/api/v1/",user_router);


app.listen(8080,()=>{
    console.log("Port is listing at 8080")
})