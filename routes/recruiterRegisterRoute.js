const express=require('express')

const router=express.Router()

const {addRecuirterDatas}=require('../controllers/recuirterRegister.js')
const recuirterLogin=require('../controllers/recuirterLogin.js')

// Register
router.post('/add/data',addRecuirterDatas)

// Login
router.post('/login',recuirterLogin)

module.exports=router