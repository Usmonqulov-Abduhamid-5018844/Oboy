import {Router} from "express";
import { login } from "../controller/controllers.js";

const userRoute = Router()

userRoute.post("/user", login);


export default userRoute