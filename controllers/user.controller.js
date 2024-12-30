const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user.model')

function registerPage(req, res) {
    res.render('register')
}

async function handleRegister(req, res) {
    const {first_name, last_name, email, password} = req.body
    try{
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            firstName: first_name,
            lastName: last_name,
            email: email,
            password: hashedPassword
        })

        res.redirect('/user/login')
    }
    catch(e) {
        console.log(e)
        res.status(500).json({
            message: 'Error registering user'
        })
    }
}

function loginPage(req, res) {
    res.render('login')
}

async function handleLogin(req, res) {
    const {email, password} = req.body

    try{
        const user = await User.findOne({email})
        if(!user) {
            return res.status(401).send('Incorrect email or password')
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password)
        if(!isCorrectPassword) {
            return res.status(401).send('Incorrect email or password')
        }

        const token = jwt.sign({
            userId: user.id,
            email: user.email,
            first_name: user.firstName,
            last_name: user.lastName
        }, process.env.JWT_SECRET_KEY)

        res.cookie('access_token', token, {
            httpOnly: true,
        })

        res.redirect('/')
    }
    catch(e) {
        console.log(e.message)
        res.status(500).send('Database error')
    }

}


function handleLogout(req, res) {
    res.clearCookie('access_token')
    return res.redirect('/user/login')
}

module.exports = {
    registerPage,
    handleRegister,
    loginPage,
    handleLogin,
    handleLogout
}