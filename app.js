require('dotenv').config()

const express=require('express')
const cors=require('cors')

const app=express()

app.use(express.json())
app.use(cors())


//Db
const db=require('./config/db.js')
db()

// Register User Routes
const registerRoutes=require('./routesregisterRoute.js')
app.use('/api/register',registerRoutes)

//Start Server
app.listen(process.env.PORT,()=>{
    console.log("Server Running Successfully");
})