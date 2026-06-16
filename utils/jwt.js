require('dotenv').config()

const jwt=require('jsonwebtoken')

function generateToken(userData){
    return jwt.sign(
        userData,
        process.env.My_Super_Secret_Key,
        {
            expiresIn:"7d"
        }
    )
}

module.exports=generateToken