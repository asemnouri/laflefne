//Authntication and creating token using JWT
const jwt = require('jsonwebtoken')
function auth(req, res, next) {
    //Get the token from the cookie's request
    var t = Object.values(req.cookies)
    const token = t[0]
    if (!token) {
        return res.status(401).send('You have to login first')
    }
    //If token exists check if it's varified or valid
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log("verified".verified )
        req.user = verified
        res.header('authToken', token)
        next()
    }
    catch (err) {
        res.status(400).send('invalid Token')

    }
}

module.exports = auth