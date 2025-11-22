const info = require('jsonwebtoken')
const {Users} = require('../models/articles')
// protected routes
const requireAuth = (req, res, next) => {
    const cookieToken = req.cookies.info;

    if (cookieToken) {
        info.verify(cookieToken, JWTSECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('/login')

            } else {
                console.log(decodedToken)
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.info
    if (token) {
        info.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.locals.user = null
                next()
            } else {
                // console.log(decodedToken)
                const user = await Users.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })

    } else {
        res.locals.user = null

        next()
    }

}
module.exports = { requireAuth,checkUser }