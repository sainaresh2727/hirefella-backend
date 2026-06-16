
const Recuirtermodel=require('../model/recruiterRegisterModel.js')
const bcrypt=require('bcrypt')

async function addRecuirterDatas(req,res) {
    const {recuriterName,recuriterEmail,CompanyName,recuriterPhoneNo,recuriterPassword,reenterRecuirterPass,recuriterDesignation}=req.body
    try{

        // Basic Validation
        if(!recuriterName || !recuriterEmail || !CompanyName || !recuriterPhoneNo || !recuriterPassword || !reenterRecuirterPass ||!recuriterDesignation){
            return res.status(401).json({
                success:false,
                message:"Please Provide Valid Inputs"
            })
        }

        // Identifying If Email and Company Already Exists
        const existingUser=await Recuirtermodel.findOne({recuriterEmail} || {CompanyName})
        if(existingUser){
            return res.status(401).json({
                success:false,
                message:"You Have Already Registred Please Login To Continue"
            })
        }

        // Email Verification
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(recuriterEmail)){
            return res.status(401).json({
                success:false,
                message:"Invalid Email Address"
            })
        }

        // Password Validation
        if(recuriterPassword.length<8){
            return res.status(401).json({
              success:false,
              message:"Password Must be Atleast 8 Characters"
            })
          }
  
          const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$\b/
              if(!passwordRegex.test(recuriterPassword)){
                  return res.status(401).json({
                      success:false,
                      message:"Password Must Contain Atleast One UpperCase,  LowerCase, Number and Special Character"
                  })
              }
            if(recuriterPassword!==reenterRecuirterPass){
                return res.status(401).json({
                    success:false,
                    message:"Password Does Not Match"
                })
            }

          // Hased Password
          const genSalt= await bcrypt.genSalt(10)
          const hashPassword=await bcrypt.hash(recuriterPassword,genSalt) 

          // Adding New User
          const newUser=new Recuirtermodel({recuriterName,recuriterEmail,CompanyName,recuriterPhoneNo,recuriterPassword:hashPassword,recuriterDesignation})
          await newUser.save()
          res.status(201).json({
            success:true,
            message:"Registered Successfully, Now Login To Continue"
          })
         
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:`ErrorName:${err.name} ErrorMessage:${err.message}`
        })
    }
}

module.exports={addRecuirterDatas}