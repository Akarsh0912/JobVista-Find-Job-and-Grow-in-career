import {Job} from "../models/job.models.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {CompanyDetails} from "../models/companyDetails.models.js"

// ------------------------------This section will be for admin or job provider--------------------- 

// This function will create Job Post  by admin
const postJob = asyncHandler( async (req,res)=>{
    const {title,description,requirements,salary, location,jobType,experience,position,companyId} =req.body;
    const userId = req.id;
    
    if(!title || !description || !requirements || !salary || !location || !location || !jobType || !experience || !position || !companyId ){
       return res.status(400).json({
        message:"All fields are required!!!!",
        success:false
       }); 
    }

    const job = await Job.create({
        title:title,
        description:description,
        requirements:requirements.split(","),
        salary:Number(salary),
        location:location,
        jobType:jobType,
        experienceLevel:experience,
        position:position,
        company:companyId,
        created_by:userId
    });

    return res.status(201).json({
        message:"New job created successfully",
        job,
        success:true
    });



});


//This function will be for :- job created by admin till now
const getAdminJobs = asyncHandler( async (req,res)=>{
    const adminId = req.id;
    const jobs = await Job.find({created_by:adminId});

    if(!jobs){
        return res.status(404).json({
            message:"Jobs not found",
            success:false
        });
    }

    return res.status(200).json({
        jobs,
        success:true
    });
});


// ------------------------------This section will be for job seeker--------------------- 

// This function will be for job seeker and will give job by keywords 
const getAllJobs = asyncHandler( async (req,res)=>{

    const keyword = req.query.keyword || "";
    const query = {
        $or:[
            {
                title:{$regex:keyword,$options:"i"}
            },
            {
                description:{$regex:keyword,$options:"i"}
            }
        ]
    }
    const jobs = await Job.find(query).populate({
        path:"CompanyDetails"
    }).sort({createdAt:-1});

    if(!jobs){
        return res.status(404).json({
            message:"Jobs not found",
            success:false
        });
    }

    return res.status(200).json({
        jobs,
        success:true
    });

});


// This function will be for job seeker and will give job by ID
const getJobById = asyncHandler( async(req,res)=>{
    const jobId = req.params.id;
    const job = await Job.findById(jobId);

    if(!job){
        return res.status(404).json({
            message:"Jobs not found",
            success:false
        });
    }

    return res.status(200).json({
        job,
        success:true
    });

});







export {postJob,getAllJobs,getJobById,getAdminJobs}
