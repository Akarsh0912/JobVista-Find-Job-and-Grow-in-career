import {Application} from "../models/application.models.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {Job} from "../models/job.models.js"


// This function is for apply JOB 
const applyJob = asyncHandler( async(req,res)=>{
    const userId = req.id;
    const jobId = req.params.id;

    if(!jobId){
        return res.status(400).json({
            message:"Job id is reuired",
            success:false
        });
    }

    //check ,if the user has already applied for the job
    const existingApplication = await Application.findOne({job:jobId,applicant:userId});

    if(!existingApplication){
        return res.status(400).json({
            message:"User is already applied for this job",
            success:false
        });
    }

    //check if the job exist or not
    const job = await Job.findById(jobId);
    if(!job){
        return res.status(404).json({
            message:"Job not found",
            success:false
        });
    } 


    //create a new application
    const newApplication = await Application.create({
        job:jobId,
        applicant:userId
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
        message:"Job applied successfully",
        success:true
    });

});



//This function will give all the applied job
const getAppliedJob = asyncHandler( async(req,res)=>{
    const userId = req.id;
    const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
        path:"Job",
        options:{sort:{createdAt:-1}},
        populate:{
            path:"company",
            options:{sort:{createdAt:-1}}
        }
    });

    if(!application){
        return res.status(404).json({
            message:"No application",
            success:false
        });
    }

    return res.status(200).json({
        application,
        success:true
    });

});


//This function will be for admin to see ,how many job seeker has applied for job
const getApplicants = asyncHandler( async(req,res)=>{
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
        path:"applications",
        options:{sort:{createdAt:-1}},
        populate:{
            path:"applicant"
        }
    });

    if(!job){
        return res.status(404).json({
            message:"Job not found",
            success:false
        });
    }

    return res.status(200).json({
        job,
        success:true
    });
    
});


//This function is to update application status
const updateStatus = asyncHandler(async(req,res)=>{
    const {status} = req.body;
    const applicationId = req.params.id;
    
    if(!status){
        return res.status(400).json({
            message:"Status is required",
            success:false
        });
    }
    
    //find the application by applicantion id
    const application = await Application.findOne({_id:applicationId});

    if(!application){
        return res.status(404).json({
            message:"Application not found",
            success:false
        });
    }

    //update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
        message:"Status updated successfully",
        success:true
    });



});





export {applyJob,getAppliedJob,getApplicants,updateStatus}
