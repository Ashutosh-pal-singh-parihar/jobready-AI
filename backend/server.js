require("dotenv").config()
const app = require("./src/app")
const connectDb = require("./src/config/db.config")

const PORT = process.env.PORT || 3000

connectDb().then(()=>{
    app.listen(PORT, ()=>{
    console.log("server is running on port " ,PORT)
})
})