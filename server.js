const express = require("express");
const app = express()
const mysql = require('mysql2')
const dotenv = require ('dotenv')

// configure environment variables
dotenv.config();

//create a connection object
const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

// test the connection

db.connect((err) => {
    if(err){
        console.log('Error connecting to the server', err)
    }
    console.log('Successfuly connected to mysql:',db.threadId)
})

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// question 1

app.get('',(req,res)=> {
    const getPatients = "SELECT first_name, last_name, date_of_birth, patient_id,FROM patients"
    db.query(getPatients,(err,data) => {
        if(err){
            return res.status(400).send('Failed to get patients', err)
        }
        res.status(200).send(data)
    })

})
// // question 2
app.get('',(req,res) => {
    const getProviders = "SELECT first_name,last_name, provider_specialty FROM providers"
    db.query(getProviders,(err,data) =>{
        if(err){
            return res.status(200).send('Failed to get providers',err)
        }
        res.status(300).send(data)
    })
})

// //question 3
app.get('',(req,res)=> {
    const getPatients = "SELECT first_name FROM patients"
    db.query(getPatients,(err,data) => {
        if(err){
            return res.status(200).send('Failed to get patients', err)
        }
        res.status(400).send(data)
    })

}) 

//question 4
app.get('', (req,res) =>{
    const getProviders = "SELECT * FROM providers GROUP BY provider_specialty"
    db.query(getProviders,(err,data)=>{
        if(err){
            return res.status(500).send('specialty not found',err)
        }
        res.status(300).send(data)
    })
})

app.get('',(req,res) =>{
    res.send("Hello World")
})


//start  and listen to the server
app.listen(5500 ,() =>{
    console.log("server is running")
})