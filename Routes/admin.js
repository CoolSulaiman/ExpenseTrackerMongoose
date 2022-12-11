const express=require('express')

const router=express()
const adminController=require('../Controller/admin')


router.post('/user/signup',adminController.postSignup)

router.post('/user/login',adminController.postLogin)

module.exports=router;