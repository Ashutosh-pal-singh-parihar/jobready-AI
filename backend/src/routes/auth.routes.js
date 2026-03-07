const express = require("express")
const { registerUserController, loginUserController, logoutUserController, getMeController } = require("../controllers/auth.controller")
const {authMiddleware} = require("../middleware/auth.middleware")

const authRouter = express.Router()

// POST /api/auth/register
authRouter.post("/register", registerUserController)
// POST /api/auth/login
authRouter.post("/login", loginUserController)
// POST /api/auth/logout
authRouter.post("/logout", logoutUserController)
// GET /api/auth/get-me
authRouter.get("/get-me", authMiddleware, getMeController)

module.exports = authRouter