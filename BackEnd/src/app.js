import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));


//import routes
import {userRoute} from "./routes/user.routes.js"
import {companyRoute} from "./routes/company.routes.js"
import {jobRoute} from "./routes/job.routes.js"
import {applicationRoute} from "./routes/application.routes.js"


// set up routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);




export {app}
