const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const InterviewReport = require("../models/interviewReport.model")

const generateInterviewReportController = async (req, res) => {

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body

    if (!selfDescription || !jobDescription){
        return res.status(400).json({
            message : "all fields are required"
        })
    }

    const interviewReportByAi = await generateInterviewReport({
        resume : resumeContent.text,
        selfDescription,
        jobDescription
    })
    console.log(interviewReportByAi)

    const interviewReport = await InterviewReport.create({
        user : req.user.id,
        resume : resumeContent.text,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    res.status(201).json({
        message : "interview report generated successfully",
        interviewReport
    })

}

module.exports  = {
    generateInterviewReportController
}