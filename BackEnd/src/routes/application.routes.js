import express from "express"
import {verifyAuthentication} from "../middlewares/auth.middlewares.js" 
import { applyJob, getApplicants, getAppliedJob, updateStatus } from "../controllers/application.controllers.js"


const applicationRoute = express.Router();

applicationRoute.route("/apply/:id").get(verifyAuthentication, applyJob);
applicationRoute.route("/get").get(verifyAuthentication, getAppliedJob);
applicationRoute.route("/:id/applicants").get(verifyAuthentication, getApplicants);
applicationRoute.route("/status/:id/update").post(verifyAuthentication, updateStatus);






export {applicationRoute}