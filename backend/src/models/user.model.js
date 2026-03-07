const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : [true, "username already taken"]
    },
    email :{
        type : String,
        required : true,
        unique : [true, "account already exists"]
    },
    password : {
        type : String,
        required : true,
        min : [6, "password must be at least 6 characters long"]
    }
},{timestamps : true})

// hashing password before saving to database
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return 
    }

    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    return 
})

// method to compare the password entered by user with the hashed password stored in database
// this method will be used in login controller
userSchema.methods.comparePassword = async function(password){
    
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema)

module.exports = User