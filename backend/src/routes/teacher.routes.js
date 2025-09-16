const express = require('express');
const teacherController = require('../controllers/teacher.controller');

const router = express.Router();


router.route("/generate-qr").get(teacherController.generateQR);

router.route("/get-class").get(teacherController.getClassAttendance)

module.exports = router;