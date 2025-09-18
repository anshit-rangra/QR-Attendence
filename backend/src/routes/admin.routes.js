const express = require('express');
const  authControllers  = require("../controllers/auth.controller")
const adminControllers = require("../controllers/admin.controller")

const router = express.Router();



router.route("/student/register").post(authControllers.registerStudent);

router.route("/teacher/register").post(authControllers.registerTeacher);

router.route("/create/class").post(adminControllers.createClass)


module.exports = router;