import { Router } from "express"
import { logIn, register, updateProfile,logOut } from "../controllers/user.controllers.js"
import {verifyAuthentication} from "../middlewares/auth.middlewares.js"

const userRoute  = Router()


//user routes
userRoute.route("/register").post(register);
userRoute.route("/login").post(logIn);
userRoute.route("/profile/update-profile").post(verifyAuthentication,updateProfile);
userRoute.route("/logout").get(logOut);












export {userRoute}
