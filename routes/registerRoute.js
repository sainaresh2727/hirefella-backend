const express=require('express')

const router=express.Router()

const {addRegisterDetails}=require('../controllers/registerController.js')

// Add
router.post('/add/data',addRegisterDetails)

module.exports=router

