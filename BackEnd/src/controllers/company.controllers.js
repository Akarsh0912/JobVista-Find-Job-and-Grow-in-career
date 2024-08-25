import {CompanyDetails} from "../models/companyDetails.models.js"
import {asyncHandler} from "../utils/asyncHandler.js"

//This function is to register company
const registerCompany = asyncHandler( async (req,res)=>{

    //take data from user body
    const {companyName} = req.body

    //checking company name is coming from frontend or not
    if(!companyName){
        return res.status(400).json({
            message:"Company name is required",
            success:false
        });
    }

    
    // 1:- check company is already registered or not
    // 2:- if company is not registered , register it 
    

    // this will return company is already on the dataBase or not 
    const company = await CompanyDetails.findOne({name:companyName});
    
    if(company){
        return res.status(400).json({
            message:"Company is already registerd, so you can not register same company twice",
            success:false
        });
    }

    // this will create company details in database 
    company = await CompanyDetails.create({
        name:companyName,
        userId:req.id
    });

    return res.status(201).json({
        message:"Company registered successfully",
        company,
        success:true
    });


});


//This function will only give those company details, which is associated to logged in user
const getCompany = asyncHandler( async (req,res)=>{
    const userId = req.id // logged in user id

    // check company exist or not ?
    const companies = await CompanyDetails.find({userId});

    if(!companies){
        return res.status(404).json({
            message:"Companies not found",
            success:false
        });
    }

    return res.status(200).json({
        companies,
        message:"Compines found",
        success:true
    });
});


// This function will give company name by company ID
const getCompanyById = asyncHandler( async (req,res)=>{
    const {companyId}  = req.params.id;

    // check company exist on dataBase or not
        // 1:- if exist , return company details
        // 2:- if not, return "Company not exist"
    
    const company = CompanyDetails.findById({companyId});
    
    if(!company){
        return res.status(404).json({
            message:"Company not found(Exist)",
            success:false
        });
    }

    return res.status(201).json({
        company,
        message:"Company Found",
        success:true
    });


}); 


//This function will update company details
const updateCompanyDetails = asyncHandler( async (req,res)=>{
    const {name,description,website,location} = req.body;
    const file = req.file;

    //cloudinary section will come here

    const updateData = {name,description,website,location};

    // Below one line will find the company by companyId and update the information which is provided by the frontEnc
    const company = await CompanyDetails.findByIdAndUpdate(req.params.id,updateData,{new:true});

    //If information is not updated , then this if condation will give error
    if(!company){
        return res.status(404).json({
            message:"Company not found",
            success:false
        });
    }

    return res.status(201).json({
        message:"Company Details updated",
        success:true,
        
    });
});


export {registerCompany,getCompany,getCompanyById,updateCompanyDetails}