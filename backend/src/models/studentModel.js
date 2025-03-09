const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema(
    {
        firstname:{
            type:String,
            require:true
        },
        lastname:{
            type:String,
            required:true
        },
        dateofbirth:{
            type:String,
            required:true
        },
        gender:{
            type:String,
            required:true
        },
        department:{
            type:String,
            required:true
        },
        faculty:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:null
        }],
        user: {  
            type: mongoose.Schema.Types.ObjectId,  
            ref: "User",
            required: true
        }
    },{
        timestamps:true
    }
)

module.exports = mongoose.model("Student", studentSchema)