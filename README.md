📄 AI Interview Preparation Platform

An AI-powered interview preparation platform that analyzes a candidate's resume, self-description, and job description to generate a personalized interview preparation report.

The system uses Groq LLM (Llama 3.1) to evaluate candidate-job alignment and produce:

🎯 Match score between candidate and job

🧠 Technical interview questions

💬 Behavioral interview questions

⚠️ Skill gap analysis

📅 preparation roadmap

This helps candidates prepare smarter for interviews based on their resume and the job they are targeting.

🚀 Features
📄 Resume Analysis

Upload a PDF resume which is parsed and analyzed using AI.

🧑 Self Description Input

Candidates can describe their skills, experience, and goals.

💼 Job Description Analysis

Provide a job description to evaluate fit and required skills.

🎯 AI Match Score

The system calculates how well the candidate matches the job requirements.

🧠 Technical Interview Questions

AI generates technical questions related to the role and candidate profile.

💬 Behavioral Interview Questions

Generates behavioral interview questions to prepare for real interview scenarios.

⚠️ Skill Gap Detection

Identifies missing skills needed for the target role.

📅 Preparation Roadmap

Creates a structured preparation plan with tasks to improve interview readiness.

🧠 AI Model

This project uses Groq API with the model:

llama-3.1-8b-instant

Groq provides extremely fast LLM inference, making the report generation nearly instant.

🛠 Tech Stack
Frontend

React

Vite

Axios

Context API

Backend

Node.js

Express.js

MongoDB

Mongoose

AI / Processing

Groq API

Llama 3.1

Zod (AI output validation)

File Processing

pdf-parse (resume text extraction)




⚙️ Installation
1️⃣ Clone the repository
git clone https://github.com/yourusername/ai-interview-platform.git
2️⃣ Install backend dependencies
cd backend
npm install
3️⃣ Install frontend dependencies
cd frontend
npm install
🔑 Environment Variables

Create a .env file in the backend folder.

PORT=3000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
GROQ_API_KEY=your_groq_api_key

📊 Example AI Output
{
  "matchScore": 85,
  "technicalQuestions": [
    {
      "question": "Explain React Hooks",
      "intention": "Assess React knowledge",
      "answer": "React Hooks allow functional components to manage state and lifecycle."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Tell me about a challenging bug you solved",
      "intention": "Assess problem-solving skills",
      "answer": "Explain debugging process and tools used."
    }
  ],
  "skillGaps": [
    {
      "skill": "Testing frameworks",
      "severity": "medium"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "React Fundamentals",
      "tasks": ["Review hooks", "Build small project"]
    }
  ]
}

🧠 AI Model & Development Journey

Initially, this project was built using Google Gemini for generating interview reports and analyzing resumes.

However, during development the following challenges occurred:

The responses from Gemini were not consistently structured in the required JSON format.

Some outputs required additional parsing and cleanup, which made the system less reliable.

The available API credits were quickly exhausted during testing and development.

Because of these limitations, the project was migrated to Groq API using the Llama 3.1 8B Instant model.

Why Groq was chosen

⚡ Extremely fast inference

🧾 More consistent structured outputs

💰 Better free usage limits for experimentation

🔧 Works well for JSON based AI workflows

After switching to Groq, the system produced more reliable structured responses, which made it easier to validate the output using Zod before saving to the database.

This change significantly improved the stability and speed of the AI report generation process.

👨‍💻 Author

Developed by Ashutosh Pal

⭐ If you like this project

Give the repo a ⭐ on GitHub!