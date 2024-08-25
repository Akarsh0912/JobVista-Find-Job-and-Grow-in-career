import mongoose from "mongoose";

const userSchema  = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    contactNumber:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        enum:["jobSeeker","recruiter"],
        required:true
    },
    profile:{
        bio:{
            type:String
        },
        skills:[{type:String}],
        resume:{type:String}, //Here will we upload link of resume and link will be from cloudinary
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId,
            ref:"CompanyDetails"
        },
        
        profilePhoto:{
            type:String,
            default:""
        }
    }

},{timestamps:true});





export const User = mongoose.model("User",userSchema);