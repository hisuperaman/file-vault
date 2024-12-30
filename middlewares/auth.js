const jwt = require('jsonwebtoken')

function jwtVerify(req, res, next) {
    try {
        const token = req.cookies.access_token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = decoded

        next()
    }
    catch(e) {
        console.log(e.message)
        return res.redirect('/user/login')
    }
}

module.exports = jwtVerify