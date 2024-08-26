import express from "express"
import {postJob,getAdminJobs,getAllJobs,getJobById} from "../controllers/job.controllers.js"
import {verifyAuthentication} from "../middlewares/auth.middlewares.js"

const jobRoute = express.Router();


jobRoute.route("/post").post(verifyAuthentication,postJob);
jobRoute.route("/getjobs").get(verifyAuthentication,getAllJobs);
jobRoute.route("getadminjobs").get(verifyAuthentication,getAdminJobs);
jobRoute.route("/getjobs/:id").get(verifyAuthentication,getJobById);


export {jobRoute}