const router = require("express").Router();
const userRoutes = require("./userRoutes");
const shopRoutes = require("./shopRoutes");

router.use("/user", userRoutes);
router.use("/shop", shopRoutes)

module.exports = router;