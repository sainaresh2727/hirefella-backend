const model=require('../model/postNewJobModel')

async function postNewJobFun(req,res) {
    const {jobName,department,noofOpenings,salary,minimumExperience,maximumExperience,qualification,reqSkills,description,requirements,employementType,workMode,country,state,city}=req.body
    try{
        if(!jobName || !department ||!noofOpenings || !salary,!minimumExperience || !maximumExperience || !qualification ||!reqSkills || !description,requirements || !employementType ||!workMode || !country || !state || !city){
            return res.status(401).json({
                success:false,
                message:"Please Provide Valid Inputs"
            })
        }

        const newJob=new model({ jobName,  department, noofOpenings,  salary,minimumExperience,  maximumExperience,  qualification, reqSkills,  description,requirements,  employementType, workMode,  country,  state,  city})
        await newJob.save()
        res.status(201).json({
            success:true,
            message:"New Job Added"
        })
    }
    catch(err){
        res.status(500).json({
            success:false,
            message:`ErrorName:${err.name} ErrorMessage:${err.message}`
        })
    }
}