const express = require('express')
const router = express.Router()

const authcontroller = require('../controllers/auth.controller')
const protect = require('../middleware/authProtector.middlelayer')

router.use(protect)

router.get('/overview',authcontroller.overview)
router.post('/reset-password',authcontroller.resetPassword)
router.post('/update-user',authcontroller.update)
router.delete('/delete-user',authcontroller.login)


module.exports = router