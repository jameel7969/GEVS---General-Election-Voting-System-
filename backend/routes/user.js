const express = require('express')
const { signupUser, loginUser, voted } = require('../controllers/userController')
const { uvcValidator } = require('../middleware/uvcValidator')

const router = express.Router()

router.post('/register', uvcValidator ,signupUser)

router.post('/login', loginUser)

router.post('/:userId/vote', voted)

module.exports = router