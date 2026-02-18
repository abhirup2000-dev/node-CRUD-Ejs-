const express = require('express')
const router = express.Router()
const employeeEjsController = require('../controller/employeeEjsController')
const Upload = require('../utils/employeeImageUpload')


router.get('/employee/list', employeeEjsController.list)
router.get('/employee/add', employeeEjsController.add)
router.post('/employee/store', Upload.single('image'), employeeEjsController.store)
router.get('/employee/delete/:id', employeeEjsController.delete)
router.get('/employee/edit/:id', employeeEjsController.edit)
router.post('/employee/update/:id', Upload.single('image'), employeeEjsController.update)

module.exports = router