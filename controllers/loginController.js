const registerModel=require('../model/registerModel.js')
const bcrypt=require("bcrypt")

async function loginDatas(req,res) {
    let {loginEmail,LoginPassword}=req.body
    try{

        // Basic Validation
        if(!loginEmail || !LoginPassword){
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

        const comparePassword=await bcrypt.compare(LoginPassword,existingUser.registerPassword)
        if(!comparePassword){
            return res.status(401).json({
                success:false,
                message:"Please Enter Valid Password"
            })
        }
        
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:`ErrorName:${err.name} ErrorMessage:${err.message}`
        })
    }
}