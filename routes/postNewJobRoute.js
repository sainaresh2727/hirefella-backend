const express=require('express')

const router=express.Router()

const {postNewJobFun}=require('../controllers/postNewJobsController')

//Add
router.post('/job/new/add',postNewJobFun)

module.exports=router