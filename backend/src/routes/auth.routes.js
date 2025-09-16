const express = require('express');
const authControllers = require("../controllers/auth.controller");

const router = express.Router();

// user routes 

router.route("/user/register").post(authControllers.registerUser);

router.route("/user/login").post(authControllers.loginUser);

// teacher routes

router.route("/teacher/register").post(authControllers.registerTeacher);

router.route("/teacher/login").post(authControllers.loginTeacher);

// both routes

router.route("/logout").post(authControllers.logout);

module.exports = router;