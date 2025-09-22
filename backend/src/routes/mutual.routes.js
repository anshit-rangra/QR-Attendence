const express = require("express")
const mutualControllers = require("./../controllers/mutual.controller")

const router = express.Router()

router.route("/getsubjects/:id").get(mutualControllers.getsubjects)

module.exports = router;