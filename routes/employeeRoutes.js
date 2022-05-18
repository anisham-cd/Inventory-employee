const express=require('express');
const employeeController=require('../controller/employeeController');
const router=express.Router();
const middlewaresEmp=require('../middlewares/midEmployee');

router.post('/push',middlewaresEmp.validator,middlewaresEmp.checkRepeatation,employeeController.push)
router.get('/listByName',employeeController.listByName)
router.put('/modify',employeeController.put)

module.exports=router;