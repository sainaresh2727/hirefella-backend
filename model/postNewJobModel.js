const mongoose=require('mongoose')

const schema=new mongoose.Schema({
    jobName:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    noofOpenings:{
        type:Number,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    minimumExperience:{
        type:Number,
        required:true
    },
    maximumExperience:{
        type:Number,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    reqSkills:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:{
        type:String,
        required:true
    },
    employementType:{
        type:String,
        enum:[
            "Full Time",
            "Part Time",
            "Internship",
            "Contract"
        ]
    },
      workMode:{
        type:String,
        enum:[
            "Remote",
            "Hybrid",
            "Onsite",
            
        ]
    },
     country:{
        type:String,
        required:true
    },
     state:{
        type:String,
        required:true
    },
     city:{
        type:String,
        required:true
    },
})

const model=mongoose.model("postNewJobs",schema)

module.exports=model