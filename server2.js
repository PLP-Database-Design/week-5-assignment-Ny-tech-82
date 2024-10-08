const express = require("express");
const app = express();
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection ({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect((err) =>{
    if (err){
        return console.log("error connecting to database:,")

    }
    console.log("succefully connected:,")
})


app.listen(3300,() =>{
    console.log(`server is running...`)
})