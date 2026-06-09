require('dotenv').config()

const mongoose=require('mongoose')

function dbConnect(){
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Db Connected");
        
    }).catch(()=>{
        console.log("Db Not Connected");
        
    })
}

module.exports=dbConnect