const registerModel=require('../model/registerModel.js')

const bcrypt=require('bcrypt')

// Register Datas
async function addRegisterDetails(req,res) {
    const {registerName,registerAge,registerEmail,registerPassword,
        reEnterPassword,registerPhone,registerWorkStatus}=req.body
    try{
        
        // Basic Validation
        if(!registerName || !registerAge ||  !registerEmail || !registerPassword || !registerPhone || !registerWorkStatus || !reEnterPassword){
            return res.status(401).json({
                success:false,
                message:"Please Provide Valid Input Details"
            })
        }

        // Identifing User if Already Exixts
        const existingUser= await registerModel.findOne({registerName} || {registerEmail})
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"You Have Already Registred Please Login To Continue"
            })
        }

        // Email Verification
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(registerEmail)){
            return res.status(401).json({
                success:false,
                message:"Invalid Email Address"
            })
        }

         // Password Validation
         if(registerPassword.length<8){
          return res.status(401).json({
            success:false,
            message:"Password Must be Atleast 8 Characters"
          })
        }

        const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$\b/
            if(!passwordRegex){
                return res.status(401).json({
                    success:false,
                    message:"Password Must Contain Atleast One UpperCase,  LowerCase, Number and Special Character"
                })
            }

        if(registerPassword!==reEnterPassword){
                return res.status(401).json({
                    success:false,
                    message:"Password Does Not Match"
                })
            }
         
        // Hased Password
        const genSalt=await bcrypt.genSalt(10)
        const hashPassword= await bcrypt.hash(registerPassword,genSalt)

        // Adding New Datas
        const newUser=new registerModel({registerName,registerAge,registerEmail,registerPassword:hashPassword,registerPhone,registerWorkStatus})
        await newUser.save()
        res.status(201).json({
            success:true,
            message:"Registered SuccessFully, Now Login To Continue"
        })
        }
    
      catch(err){
        res.status(500).json({
            success:false,
            message:`ErrorName:${err.name} ErrorMessage:${err.message}`
        })
    }
}

module.exports={addRegisterDetails}