const jwt = require('jsonwebtoken')

function loginChecker(req, res, next) {
    try {
        const token = req.cookies.access_token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

        req.user = decoded

        res.redirect('/')
    }
    catch (e) {
        next()
    }
}

module.exports = loginChecker