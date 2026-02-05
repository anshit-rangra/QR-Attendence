const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();


router.route("/mark-attendance").post(userController.attendanceServe);

router.route("/get-attendance").get(userController.getAttendance)

module.exports = router;