const express=require('express')

const router=express.Router()

const {addRegisterDetails}=require('../controllers/userRegisterController.js')

const loginDatas=require('../controllers/userLoginController.js')

// Add
router.post('/register/add',addRegisterDetails)


// Login Routes
router.post('/login',loginDatas)

module.exports=router

