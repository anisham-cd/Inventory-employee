const express= require('express');
const godown=require('./allRoutes/godown')
const medicines=require('./allRoutes/medicines')
const employees=require('./allRoutes/employees')



const router=express.Router();

router.use('/godown',godown);
router.use('/medicines',medicines);
router.use('/employees',employees);

module.exports=router;