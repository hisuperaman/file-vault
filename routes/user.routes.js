const express = require('express')

const {registerPage, handleRegister, loginPage, handleLogin, handleLogout} = require('../controllers/user.controller')
const loginChecker = require('../middlewares/login.checker')
const jwtVerify = require('../middlewares/auth')

const router = express.Router()

router.get('/register', loginChecker, registerPage)
router.post('/register', handleRegister)

router.get('/login', loginChecker, loginPage)
router.post('/login', handleLogin)

router.get('/logout', jwtVerify, handleLogout)

module.exports = router