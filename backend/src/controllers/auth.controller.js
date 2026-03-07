const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const TokenBlacklist = require("../models/blacklist.model")

// controller for registering a user
const registerUserController = async (req, res) => {
    const { username, email, password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({
            message: "All fields are required",
        })
    }

    const isUserAlreadyPresent = await User.findOne({
        $or: [{email},{username}] // check if email or username is already present
    })

    if(isUserAlreadyPresent){
        return res.status(400).json({
            message: "User with this email or username already exists",
        })
    }

    const user = await User.create({
        username : username,
        email : email,
        password : password
    })

    const token = jwt.sign({ id : user._id, username : user.username }, process.env.JWT_SECRET, {expiresIn : "2d"})
    res.cookie("token", token)
    return res.status(201).json({
        message : "User registered successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email
        }
    })
}

// controller for logging in a user
const loginUserController = async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({ email })

    if(!user){
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect){
        return res.status(400).json({
            message : "Invalid email or password"
        })
    }

    const token = jwt.sign({ id: user._id, username : user.username}, process.env.JWT_SECRET, {expiresIn : "2d"})
    res.cookie("token", token)
    return res.status(200).json({
        message : "User logged in successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email
        }
    })

}

// controller for logging out a user (we will implement token blacklisting for this)
const logoutUserController = async (req, res) => {

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if(!token){
        return res.status(400).json({
            message : "Token not found"
        })
    }

    await TokenBlacklist.create({ token})
    res.clearCookie("token")

    return res.status(200).json({
        message : "User logged out successfully"
    })
}


module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController
}