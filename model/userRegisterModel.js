const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    registerName:{
        type:String,
        required:true
    },
    registerAge:{
        type:Number,
        required:true
    },
    registerEmail:{
        type:String,
        required:true
    },
    registerPassword:{
        type:String,
        required:true
    },
    registerPhone:{
        type:Number,
        required:true
    },
    registerWorkStatus:{
        type:String,
        required:true,
        enum:[
            "Fresher",
            "Experienced"
        ]
    },
    role:{
        type:String,
        default:"Jobseeker"
    },

    //Profile Fields That We Enter After Login Not Required During Register (BIO)
    profileImage:String,
    location:String,
    preferdLocation:String,
    resume:String,
    githubLink:String,
    portFolioLink:String,
    profileCompleted:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const model=mongoose.model("registerDetails",schema)

module.exports=model