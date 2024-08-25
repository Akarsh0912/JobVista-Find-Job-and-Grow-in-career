import jwt from "jsonwebtoken"
import { asyncHandler } from "../utils/asyncHandler.js"



const verifyAuthentication = asyncHandler(async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false
            });
        }

        const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        
        if(!decodeToken){
            return res.status(401).json({
                message:"Invalid Token",
                success:false
            });
        }

        req.id = decodeToken.userId;
        next();

    } catch (error) {
        return res.status(401).json({
            message:error?.message || "Invalid access",
            success:false
        });
        
    }
});


export {verifyAuthentication}