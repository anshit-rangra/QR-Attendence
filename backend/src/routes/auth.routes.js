const express = require('express');
const authControllers = require("../controllers/auth.controller");

const router = express.Router();

// admin routes

router.route("/admin/register").post(authControllers.registerAdmin)

router.route("/admin/login").post(authControllers.loginAdmin)

// user routes 


router.route("/user/login").post(authControllers.loginUser);


// both routes

router.route("/getuser").get(authControllers.getUser)

router.route("/logout").post(authControllers.logout);

module.exports = router;