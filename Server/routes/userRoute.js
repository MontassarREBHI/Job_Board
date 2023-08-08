const express=require('express')
const router=express.Router()
const userController =require('../controllers/userController')

router.post('/',userController.addUser)
router.get('/',(req,res)=>{

    res.status(200).send('hi from user route')
})







module.exports=router