import { Router } from "express";
import userRoute from "./user.routes.js";


const mainRoutes = Router();

mainRoutes.use("/user",userRoute);

export default mainRoutes