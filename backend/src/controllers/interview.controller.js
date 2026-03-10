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

const getInterviewReportByIdController = async (req, res)=>{
    const { interviewId } = req.params

    const interviewReport = await InterviewReport.findOne({
        _id : interviewId,
        user : req.user.id
    })

    if(!interviewId){
        return res.status(404).json({
            message : "Interview report not found"
        })
    }

    res.status(200).json({
        message : "Interview report fetched successfully",
        interviewReport
    })
    
}

const getAllInterviewReportController = async (req, res)=> {
    const interviewReports = await InterviewReport.find({
        user : req.user.id,
    }).sort({
        createdAt : -1
    }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message : "interview reports fetched successfully.",
        interviewReports
    })
}

module.exports  = {
    generateInterviewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportController
}