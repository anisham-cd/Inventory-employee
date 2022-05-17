const router = require("express").Router();
const userController = require("../controllers/user/userController");
const userMiddleware = require("../middleware/userMiddleware");
const encryption = require('../helper/encryption');

router.post("/signup", userMiddleware.verifySignupToken, userMiddleware.signUpValidator, userController.signUp);
router.post("/createUser", userMiddleware.createUserValidator, userController.createUser);
router.post("/login", userMiddleware.decrypt, userController.login);
router.post("/assignRole", userMiddleware.checkAdminRole, userController.assignRole);
router.put("/updateUser", userMiddleware.tokenAuthenticator, userMiddleware.signUpValidator, userController.updateUser);
router.get("/getVerfiedUsers", userController.getVerfiedUsers);
router.get("/getActiveUsers", userController.getActiveUsers);
router.get("/verifySignupToken", userController.verifySignupToken);
router.get("/verifyEmail", userController.verifyEmail);

module.exports = router;
