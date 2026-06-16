const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    recuriterName:{
        type:String,
        required:true
    },
    recuriterEmail:{
        type:String,
        required:true
    },
    CompanyName:{
        type:String,
        required:true
    },
    recuriterPhoneNo:{
        type:Number,
        required:true
    },
    recuriterPassword:{
        type:String,
        required:true
    },
    recuriterDesignation:{
        type:String,
        enum:[
            "Hr",
            "Manager",
            "Team Lead",
            "Founder",
            "CEO",
            "Others"
        ],
        required:true
    },
    role:{
        type:String,
        default:"Recuirter"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
     
    // Profile Fields That We Enter After Login Not Required During Register (BIO)
     companyLogo:String,
     websiteLink:String,
     description:String,
     location:String
     
    })

   

const recuriterModel=mongoose.model("RecuriterDetails",schema)

module.exports=recuriterModel