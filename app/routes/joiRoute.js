const express = require('express')
const router = express.Router()
const joiController = require('../controller/joiController')

router.get('/create/data', joiController.createData)

module.exports = router