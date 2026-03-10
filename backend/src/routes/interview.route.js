const express = require("express")
const {authMiddleware} = require("../middleware/auth.middleware")
const { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportController } = require("../controllers/interview.controller")
const { upload } = require("../middleware/file.middleware")

const interviewRouter = express.Router()

// POST /api/interview/
interviewRouter.post("/", authMiddleware, upload.single("resume"), generateInterviewReportController)
// GET /api/interview/report/:interviewId
interviewRouter.get("/report/:interviewId",authMiddleware, getInterviewReportByIdController)
//GET /api/interview
interviewRouter.get("/", authMiddleware, getAllInterviewReportController)

module.exports = interviewRouter