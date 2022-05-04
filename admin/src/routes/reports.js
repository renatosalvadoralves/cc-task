const express = require("express")
const router = express.Router()
const controller = require("../controllers/reports")

router.post("/generate-csv", controller.generateCsv)

module.exports = router
