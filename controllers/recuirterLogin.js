const model=require('../model/recruiterRegisterModel.js')
const bcrypt=require('bcrypt')
const generateToken=require('../utils/jwt.js')

async function recuirterLogin(req,res) {
    const {recuirterLoginEmail,recuirterLoginPassword}=req.body
    try{
     
        // Basic Validation
        if(!recuirterLoginEmail || !recuirterLoginPassword){
            return res.status(401).json({
                success:false,
                message:"Please Provide Valid Input"
            })
        }

        const existingUser=await model.findOne({recuriterEmail:recuirterLoginEmail})
        if(!existingUser){
            return res.status(401).json({
                success:false,
                message:"User Not Found"
            })
        }

        const verifyPassword=await bcrypt.compare(recuirterLoginPassword,existingUser.recuriterPassword)
        if(!verifyPassword){
            return res.status(401).json({
                success:false,
                message:"Please Enter Valid Password"
            })
        }

        const Token=generateToken({
            id:existingUser._id,
            email:existingUser.recuriterEmail,
            role:existingUser.role
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

module.exports=recuirterLogin