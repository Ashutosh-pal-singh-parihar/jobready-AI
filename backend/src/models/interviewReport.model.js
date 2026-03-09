const mongoose = require("mongoose")

// interviewReport schema
// job description
// resume in text 
// self description

// matchScore : number

//technical que : []
// behaviorol que : [] 
// skill gaps : []
// preparation plan : [{}]

const technicalQuestionSchema = new mongoose.Schema({
    question : {
        type : String,
        required : true
    },
    intension : {
        type : String,
        required : true
    },
    answer : {
        type : String,
        required : true
    }
},{ _id : false })

const behavioralQuestionSchema = new mongoose.Schema({
    question : {
        type : String,
        required : true
    },
    intension : {
        type : String,
        required : true
    },
    answer : {
        type : String,
        required : true
    }
},{ _id : false })

const skillGapsSchema = new mongoose.Schema({
    skill : {
        type : String,
        required : true
    },
    severity : {
        type : String,
        required : true,
        enum : ["low","medium","high"]
    }
},{ _id : false })

const preparationPlanSchema = new mongoose.Schema({
    day : {
        type : Number,
        required : true
    },
    focus : {
        type : String,
        required : true
    },
    tasks : [{
        type : String,
        required : true
    }]
},{ _id : false })

const interviewReportSchema = new mongoose.Schema({
    jobDescription : {
        type : String,
        required : true
    },
    resume : {
        type : String,
    },
    selfDescription : {
        type : String,
    },
    matchScore : {
        type : Number,
        required : true,
        min : 0,
        max : 100 
    },
    technicalQuestion : [technicalQuestionSchema],
    behavioralQuestion : [behavioralQuestionSchema],
    skillGaps : [skillGapsSchema],
    preparationPlan : [preparationPlanSchema],
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }

},{timestamps : true})


const InterviewReport = mongoose.model("InterviewReport",interviewReportSchema)


module.exports = InterviewReport