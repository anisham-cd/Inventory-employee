const express= require('express');
const employeeControllers=require('../../controllers/employees/employees')
const employeeMiddlewares=require('../../middlewares/employee')
const commonMiddlewares=require('../../middlewares/common')

const router=express.Router();

router.post('/signUp'/*,commonMiddlewares.decrypt*/,employeeMiddlewares.signupValidator,employeeControllers.signUp)
router.post('/login'/*,commonMiddlewares.decrypt*/,employeeMiddlewares.logInvalidator,employeeControllers.login)

router.get('/list',employeeControllers.list)
router.get('/listByName',employeeControllers.listByName)


router.post('/push',employeeControllers.push)
router.post('/assignRole',commonMiddlewares.checkAdminRoles,employeeControllers.assignRole)

router.post('/encrypt',employeeControllers.encrypt)
router.post('/decrypt',employeeControllers.decrypt)

module.exports=router