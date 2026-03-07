const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const TokenBlacklist = require("../models/blacklist.model")

// middleware to check if the user is authenticated
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    if(!token){
        return res.status(401).json({
            message : "unauthorized access, token missing"
        })
    }

    const isBlacklisted = await TokenBlacklist.findOne({token : token})

    if(isBlacklisted){
        return res.status(401).json({
            message : "unauthorized access, token blacklisted"
        }) 
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        return next()

    } catch (error) {
        return res.status(401).json({
            message : "unauthorized access, invalid token"
        })
    }

    
}

module.exports = {
    authMiddleware
}