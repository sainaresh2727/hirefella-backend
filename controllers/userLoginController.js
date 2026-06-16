const registerModel=require('../model/userRegisterModel.js')
const bcrypt=require("bcrypt")
const generateToken=require('../utils/jwt.js')

async function loginDatas(req,res) {
    let {loginEmail,loginPassword}=req.body
    try{

        // Basic Validation
        if(!loginEmail || !loginPassword){
            return res.status(401).json({
                success:false,
                message:"Please Provide Valid Inputs"
            })
        }

        // Checking User Exists
        const existingUser=await registerModel.findOne({registerEmail:loginEmail})
        if(!existingUser){
            return res.status(401).json({
                success:false,
                message:"User Not Found, Please Register To Continue"
            })
        }

        const comparePassword=await bcrypt.compare(loginPassword,existingUser.registerPassword)
        if(!comparePassword){
            return res.status(401).json({
                success:false,
                message:"Please Enter Valid Password"
            })
        }

        // Jwt Generation
        const Token=generateToken({
            id:existingUser._id,
            role:existingUser.role,
            email:existingUser.registerEmail
        })

        res.status(201).json({
            success:true,
            message:"Logined Successfully",
            token:Token
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:`ErrorName:${err.name} ErrorMessage:${err.message}`
        })
    }
}

module.exports=loginDatas