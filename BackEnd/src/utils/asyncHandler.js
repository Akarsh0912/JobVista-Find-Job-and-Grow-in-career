
const asyncHandler = (functionToExecute) =>async(req,res,next)=>{
    try {
        await functionToExecute(req,res,next);
    } catch (error) {
        return res.status(error.code || 500).json({
            message:error.message || "Server Error",
            success:false
        });
        
    }
}


export {asyncHandler}