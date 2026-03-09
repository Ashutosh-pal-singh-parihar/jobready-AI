const express = require("express")
const {authMiddleware} = require("../middleware/auth.middleware")
const { generateInterviewReportController } = require("../controllers/interview.controller")
const { upload } = require("../middleware/file.middleware")

const interviewRouter = express.Router()

// POST /api/interview/
interviewRouter.post("/", authMiddleware, upload.single("resume"), generateInterviewReportController)

module.exports = interviewRouter