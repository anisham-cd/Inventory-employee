const express=require('express');
const router=express.Router();

const employee=require('./employeeRoutes');



router.use('/employee',employee);


module.exports=router;