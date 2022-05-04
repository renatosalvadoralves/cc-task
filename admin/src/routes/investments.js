const express = require("express")
const router = express.Router()
const controller = require("../controllers/investments")

router.get("/:id", controller.getById)

module.exports = router
