const express = require('express')
const router = express.Router()

const userController = require('../controllers/user.controller')
const protect = require('../middleware/authProtector.middleware')

router.use(protect)

router.get('/overview/:_id',userController.overview)
router.post('/reset-password',userController.resetPassword)
router.post('/update/:id',userController.update)
router.delete('/delete:_id',userController.delete)


module.exports = router