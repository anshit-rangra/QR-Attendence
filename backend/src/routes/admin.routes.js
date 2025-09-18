const express = require('express');
const  authControllers  = require("../controllers/auth.controller")

const router = express.Router();



router.route("/student/register").post(authControllers.registerStudent);

router.route("/teacher/register").post(authControllers.registerTeacher);


module.exports = router;