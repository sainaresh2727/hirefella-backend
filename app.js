require('dotenv').config()

const express=require('express')
const cors=require('cors')

const app=express()

app.use(express.json())
app.use(cors())


//Db
const db=require('./config/db.js')
db()

// User Routes
const registerRoutes=require('./routes/userRegisterRoute.js')
app.use('/api/user',registerRoutes)

// Recuirter Routes
const recuirterRoutes=require('./routes/recruiterRegisterRoute.js')
app.use('/api/recruiter',recuirterRoutes)

// Start Server
app.listen(process.env.PORT,()=>{
    console.log("Server Running Successfully");
})