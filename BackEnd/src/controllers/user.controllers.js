import {User} from "../models/user.models.js"
import bcrypt from "bcryptjs"
import {asyncHandler} from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"


// This function will register the new user 
const register = asyncHandler(async(req,res)=>{

    const {fullName,email,password,contactNumber,role} = req.body;

    // here we are checking all fields are filled or not 
    if(!fullName || !email || !password || !contactNumber || !role){
        return res.status(400).json({
            message:"Something is missing. Please fill all the fields",
            success:false
        });
    }

    // here we are checking user already exixts or not 
    const user =  await User.findOne({email});
    if(user){
        return res.status(400).json({
            message:"User already exist",
            success:false
        });
    }

    // this will hash password 
    const hashPassword = await bcrypt.hash(password,10) ;

    // this will create new user 
    await User.create({
        fullName:fullName,
        email:email,
        password:hashPassword,
        contactNumber:contactNumber,
        role:role

    });
    return res.status(201).json({
        message:"Account created successfully",
        success:true
    });
});


// This function is for Login 
const logIn = asyncHandler(async(req,res)=>{

    const {email,password,role} = req.body;

        // this will check all fields are filled or not 
        if(!email || !password || !role){
            return res.status(400).json({
                message:"All fields are required to login",
                success:false
            });
        }

        // this will check user exist or not 
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Incorrect username or password",
                success:false
            });
        }

        // this will check password is correct or not 
        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect username or password",
                success:false
            });
        }

        // this will check role is correct or not 
        if(role !== user.role){
            return res.status(400).json({
                message:"User does not exist with this role",
                success:false
            });
        }


        // this will generate token 
        const tokenData = {
            userId:user._id
        } 
        const token =  await jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRET, {expiresIn:process.env.ACCESS_TOKEN_EXPIRY});

        const options ={
            maxAge:1*24*60*60*1000,
            httpsOnly:true,
            sameSite:"strict"

        }

        let userDetails = {
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            contactNumber:user.contactNumber,
            role:user.role,
            profile:user.profile
        }

        return res
                .status(200)
                .cookie("token",token,options)
                .json({
                        message:`User Logged in Successfully ${user.fullName}`,
                        userDetails,
                        success:true
                    });
        








        



});

// This function is for LogOut 
const logOut = asyncHandler(async(req,res)=>{
    const options = {
        maxAge:0
    }
    return res
            .status(200)
            .cookie("token","",options)
            .json({
                    message:"Logged out successfully",
                    success:true
                });
});


// This function is for updateUserProfile 
const updateProfile = asyncHandler(async(req,res)=>{

    const {fullName,email,contactNumber,bio,skills} = req.body;
    const file = req.file;

    // if(!fullName || !email || !contactNumber || !bio || !skills){
    //     return res.status(400).json({
    //         message:"Something is missing",
    //         success:false
    //     });
    // }

    //cloudinary section will come here 

    let skillArray;
    if(skills){
        skillArray=skills.split(",");
    }

    const userId = req.id; // middlewares authentication

    let user = User.findById(userId);

    if(!user){
        return res.status(400).json({
            message:"User not found",
            success:false
        });
    }
    
    // Here we are updating user data
    if(fullName) user.fullName=fullName
    if(email)  user.email = email
    if(contactNumber) user.contactNumber = contactNumber
    if(bio) user.profile.bio = bio
    if(skills) user.profile.skills = skillArray
    
   
    // resume will be upfated here 
    
    await user.save();

    user = {
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        contactNumber:user.contactNumber,
        role:user.role,
        profile:user.profile
    }

    return res.status(200).json({
        message:"Profile updated successfully",
        user,
        success:true
    });

});













export {register,logIn,logOut,updateProfile}