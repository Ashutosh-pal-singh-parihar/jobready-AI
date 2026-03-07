const express = require("express")
const { registerUserController, loginUserController, logoutUserController } = require("../controllers/auth.controller")

const authRouter = express.Router()

// POST /api/auth/register
authRouter.post("/register", registerUserController)
// POST /api/auth/login
authRouter.post("/login", loginUserController)
// POST /api/auth/logout
authRouter.post("/logout", logoutUserController)

module.exports = authRouter