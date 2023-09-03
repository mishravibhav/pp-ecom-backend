const express = require('express')
const router = express.Router()

const authcontroller = require('../controllers/auth.controller')
const protect = require('../middleware/authProtector.middleware')

router.use(protect)

router.get('/overview/:_id',authcontroller.overview)
router.post('/reset-password',authcontroller.resetPassword)
router.post('/update/:id',authcontroller.update)
router.delete('/delete:_id',authcontroller.delete)


module.exports = router