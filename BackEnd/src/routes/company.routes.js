import express from "express"
import {registerCompany,getCompany,getCompanyById,updateCompanyDetails} from "../controllers/company.controllers.js"
import {verifyAuthentication} from "../middlewares/auth.middlewares.js"

const companyRoute = express.Router();

companyRoute.route("/register-company").post(verifyAuthentication,registerCompany);
companyRoute.route("/get-company").post(verifyAuthentication,getCompany);
companyRoute.route("/get-company/:id").post(verifyAuthentication,getCompanyById);
companyRoute.route("/update-company/:id").post(verifyAuthentication,updateCompanyDetails);


export {companyRoute}

